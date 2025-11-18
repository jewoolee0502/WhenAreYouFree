import { Request, Response, NextFunction } from 'express';
import Session from '../../database/models/Session.js';
import mongoose from 'mongoose';

// Create new session
export const createSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, possibleDates, hourRange, timeBlockUnit, expirationDate } = req.body;

    // Convert date strings to Date objects
    const dates = possibleDates.map((date: string) => new Date(date));

    // Set default expiration to 2 days from now if not provided
    const expiration = expirationDate
      ? new Date(expirationDate)
      : new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);

    const session = new Session({
      title,
      possibleDates: dates,
      hourRange,
      timeBlockUnit: timeBlockUnit || 'hour',
      expirationDate: expiration,
      availabilities: []
    });

    await session.save();

    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
    res.status(201).json({
      sessionId: session._id,
      link: `${frontendUrl}/session/${session._id}`,
      session: session
    });
  } catch (error) {
    next(error);
  }
};

// Get session by ID
export const getSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;

    console.log('[Sessions] Incoming getSession request', { sessionId });

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const availabilityCount = session.availabilities?.length ?? 0;
    const totalTimeBlocks = session.availabilities?.reduce((sum: number, availability: any) => {
      return sum + (availability.timeBlocks?.length ?? 0);
    }, 0) ?? 0;

    console.log('[Sessions] Returning session payload', {
      sessionId: session._id.toString(),
      possibleDates: session.possibleDates?.length ?? 0,
      availabilityCount,
      totalTimeBlocks
    });

    res.json({ session });
  } catch (error) {
    next(error);
  }
};

// Update session metadata
export const updateSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const updates: any = {};

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Fetch the current session for validation
    const currentSession = await Session.findById(sessionId);

    if (!currentSession) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Only allow specific fields to be updated
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.expirationDate !== undefined) {
      updates.expirationDate = new Date(req.body.expirationDate);
    }
    if (req.body.possibleDates !== undefined) {
      // Validate and convert dates
      const dates = req.body.possibleDates.map((date: string) => new Date(date));

      // Check for invalid dates
      const hasInvalidDate = dates.some((date: Date) => isNaN(date.getTime()));
      if (hasInvalidDate) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Invalid date format in possibleDates'
        });
      }

      // Check date count (1-14 dates allowed per schema)
      if (dates.length === 0 || dates.length > 14) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'Must have between 1 and 14 possible dates'
        });
      }

      updates.possibleDates = dates;
    }
    if (req.body.hourRange !== undefined) {
      // Validate hourRange before updating
      const newHourRange = req.body.hourRange;

      // Check if current session has hourRange (should always exist per schema, but be safe)
      if (!currentSession.hourRange) {
        return res.status(500).json({
          error: 'Internal error',
          message: 'Current session missing hourRange'
        });
      }

      // Merge with existing values to handle partial updates
      const finalStart = newHourRange.start !== undefined ? newHourRange.start : currentSession.hourRange.start;
      const finalEnd = newHourRange.end !== undefined ? newHourRange.end : currentSession.hourRange.end;

      // Validate the final values
      if (finalEnd <= finalStart) {
        return res.status(400).json({
          error: 'Validation failed',
          message: 'End hour must be greater than start hour'
        });
      }

      // Set the complete hourRange object
      updates.hourRange = {
        start: finalStart,
        end: finalEnd
      };
    }
    if (req.body.timeBlockUnit !== undefined) {
      updates.timeBlockUnit = req.body.timeBlockUnit;
    }

    const session = await Session.findByIdAndUpdate(
      sessionId,
      updates,
      { new: true, runValidators: true }
    );

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({
      message: 'Session updated successfully',
      session
    });
  } catch (error: any) {
    console.error('[updateSession] Error:', error);
    console.error('[updateSession] Stack:', error.stack);
    next(error);
  }
};

// Add or update participant availability
export const updateAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;
    const { participantName, timeBlocks } = req.body;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Convert date strings to Date objects in timeBlocks
    const formattedTimeBlocks = timeBlocks.map((block: any) => ({
      date: new Date(block.date),
      hour: block.hour,
      halfHour: block.halfHour || false
    }));

    // Upsert availability using model method
    session.upsertAvailability(participantName, formattedTimeBlocks);
    await session.save();

    // Find the updated availability to return
    const updatedAvailability = session.findParticipant(participantName);

    res.json({
      message: 'Availability updated successfully',
      availability: updatedAvailability
    });
  } catch (error) {
    next(error);
  }
};

// Delete participant availability
export const deleteAvailability = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId, participantName } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    // Remove the participant's availability
    session.availabilities = session.availabilities.filter(
      (avail) => avail.participantName !== participantName
    );

    await session.save();

    res.json({
      message: 'Availability deleted successfully',
      session
    });
  } catch (error) {
    next(error);
  }
};

// Delete session
export const deleteSession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = await Session.findByIdAndDelete(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (error) {
    next(error);
  }
};
