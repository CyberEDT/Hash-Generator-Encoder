import CryptoJS from 'crypto-js';

/**
 * HashEngine Module
 * Handles all cryptographic operations using crypto-js
 */

export const HashEngine = {

    /**
     * Generate hash from text input
     * @param {string} text - The input text
     * @param {string} algorithm - The selected algorithm (SHA-256, MD5, etc.)
     * @returns {string} - The generated hash
     */
    generateFromString: (text, algorithm) => {
        if (!text) return '';

        try {
            switch (algorithm) {
                case 'MD5':
                    return CryptoJS.MD5(text).toString();
                case 'SHA-1':
                    return CryptoJS.SHA1(text).toString();
                case 'SHA-256':
                    return CryptoJS.SHA256(text).toString();
                case 'SHA-512':
                    return CryptoJS.SHA512(text).toString();
                case 'SHA-3-512': // Mapping UI value 'SHA-3-512' to CryptoJS.SHA3
                    return CryptoJS.SHA3(text, { outputLength: 512 }).toString();
                case 'Base64':
                    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
                default:
                    return 'Error: Unknown Algorithm';
            }
        } catch (e) {
            console.error(e);
            return 'Error generating hash';
        }
    },

    /**
     * Process a file and return its hash
     * Note: For very large files, chunking is recommended. 
     * This implementation reads as ArrayBuffer for better performance with CryptoJS.
     * @param {File} file 
     * @param {string} algorithm 
     * @returns {Promise<string>}
     */
    generateFromFile: (file, algorithm) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                const arrayBuffer = event.target.result;
                const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);

                try {
                    let result = '';
                    switch (algorithm) {
                        case 'MD5':
                            result = CryptoJS.MD5(wordArray).toString();
                            break;
                        case 'SHA-1':
                            result = CryptoJS.SHA1(wordArray).toString();
                            break;
                        case 'SHA-256':
                            result = CryptoJS.SHA256(wordArray).toString();
                            break;
                        case 'SHA-512':
                            result = CryptoJS.SHA512(wordArray).toString();
                            break;
                        case 'SHA-3-512':
                            result = CryptoJS.SHA3(wordArray, { outputLength: 512 }).toString();
                            break;
                        case 'Base64':
                            // For files, Base64 is just encoding the binary data
                            // We can use the FileReader's readAsDataURL but that includes the prefix
                            // Or convert wordArray to Base64
                            result = CryptoJS.enc.Base64.stringify(wordArray);
                            break;
                        default:
                            result = 'Error: Unknown Algorithm';
                    }
                    resolve(result);
                } catch (e) {
                    reject('Error hashing file');
                }
            };

            reader.onerror = () => reject('Error reading file');

            // Check file size primarily for UX warning, but functionality remains
            // standard FileReader
            reader.readAsArrayBuffer(file);
        });
    }
};
