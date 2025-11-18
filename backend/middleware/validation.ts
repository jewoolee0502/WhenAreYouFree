import { Request, Response, NextFunction } from 'express';
import { body, validationResult, ValidationChain } from 'express-validator';

// Helper to handle validation errors
const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validate session creation
export const validateCreateSession: (ValidationChain | typeof handleValidationErrors)[] = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 50 }).withMessage('Title must be 50 characters or less'),

  body('possibleDates')
    .isArray({ min: 1, max: 14 }).withMessage('Must provide 1-14 possible dates')
    .custom((dates) => {
      return dates.every((date: any) => !isNaN(Date.parse(date)));
    }).withMessage('All dates must be valid date strings'),

  body('hourRange.start')
    .isInt({ min: 0, max: 23 }).withMessage('Start hour must be between 0-23'),

  body('hourRange.end')
    .isInt({ min: 0, max: 23 }).withMessage('End hour must be between 0-23')
    .custom((value, { req }) => value > req.body.hourRange.start)
    .withMessage('End hour must be greater than start hour'),

  body('timeBlockUnit')
    .optional()
    .isIn(['hour', 'half-hour']).withMessage('Time block unit must be "hour" or "half-hour"'),

  body('expirationDate')
    .optional()
    .isISO8601().withMessage('Expiration date must be a valid date'),

  handleValidationErrors
];

// Validate availability update
export const validateUpdateAvailability: (ValidationChain | typeof handleValidationErrors)[] = [
  body('participantName')
    .trim()
    .notEmpty().withMessage('Participant name is required')
    .isLength({ max: 50 }).withMessage('Participant name must be 50 characters or less'),

  body('timeBlocks')
    .isArray().withMessage('Time blocks must be an array'),

  body('timeBlocks.*.date')
    .custom((date) => !isNaN(Date.parse(date)))
    .withMessage('Each time block must have a valid date'),

  body('timeBlocks.*.hour')
    .isInt({ min: 0, max: 23 }).withMessage('Hour must be between 0-23'),

  body('timeBlocks.*.halfHour')
    .optional()
    .isBoolean().withMessage('halfHour must be a boolean'),

  handleValidationErrors
];
