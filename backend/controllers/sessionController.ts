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

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
    }

    const session = await Session.findById(sessionId);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

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

    // Only allow specific fields to be updated
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.expirationDate !== undefined) {
      updates.expirationDate = new Date(req.body.expirationDate);
    }

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(404).json({ error: 'Session not found' });
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
  } catch (error) {
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
