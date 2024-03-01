import sanitizeHtml from 'sanitize-html';

/**
 * @param {string} message
 */
export function sanitizeMail(message) {
    
    let cleanedMessage = sanitizeHtml(message, {
        allowedTags: [],
        allowedAttributes: {},
        allowedClasses: {},
        allowedStyles: {}
    });

    return cleanedMessage;
}