import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

interface ErrorWithStatus extends Error {
  status?: number;
}

export const errorHandler = (err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Mongoose validation error
  if (err.name === 'ValidationError' && err instanceof mongoose.Error.ValidationError) {
    const errors = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      error: 'Validation failed',
      details: errors
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError' && err instanceof mongoose.Error.CastError) {
    return res.status(404).json({
      error: 'Session not found'
    });
  }

  // Default error
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
};
