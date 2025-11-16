import express from 'express';
import * as sessionController from '../controllers/sessionController.js';
import { validateCreateSession, validateUpdateAvailability } from '../middleware/validation.js';

const router = express.Router();

// Create new session
router.post('/', validateCreateSession, sessionController.createSession);

// Get session by ID
router.get('/:sessionId', sessionController.getSession);

// Update session metadata (title, expiration, etc.)
router.put('/:sessionId', sessionController.updateSession);

// Add or update participant availability
router.post('/:sessionId/availability', validateUpdateAvailability, sessionController.updateAvailability);

// Delete session
router.delete('/:sessionId', sessionController.deleteSession);

export default router;
