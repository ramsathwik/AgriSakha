import logger from './logger.js';
import config from '../config/env.js';

/**
 * Creates a structured audit log entry.
 *
 * @param {object} options - The audit log details.
 * @param {string} options.action - The action being performed (e.g., 'USER_LOGIN', 'TIP_APPROVED').
 * @param {object} options.actor - Information about the user performing the action.
 * @param {string} options.actor.id - The ID of the user.
 * @param {string} options.actor.role - The role of the user.
 * @param {object} [options.target] - The resource being acted upon.
 * @param {string} [options.target.id] - The ID of the resource.
 * @param {string} [options.target.type] - The type of resource (e.g., 'Tip', 'User').
 * @param {string} [options.status='SUCCESS'] - The status of the action ('SUCCESS', 'FAILURE').
 * @param {object} [options.details] - Any additional relevant details.
 */
export const auditLog = ({ action, actor, target, status = 'SUCCESS', details = {} }) => {
    // Only log audits if DEBUG_LOGS is enabled to avoid excessive logging in production
    // unless explicitly turned on.
    if (!config.debugLogs) {
        return;
    }

    const logEntry = {
        action,
        actor,
        target,
        status,
        details,
    };

    logger.info('AUDIT', logEntry);
};