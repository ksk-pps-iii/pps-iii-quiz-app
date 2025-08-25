/**
 * Generates a random 6-digit number string.
 * @returns {string} A 6-digit string.
 */
export function generateShortId() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}