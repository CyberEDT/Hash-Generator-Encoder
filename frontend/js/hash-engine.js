import CryptoJS from 'crypto-js';

/**
 * HashEngine Module
 * Handles all cryptographic operations using crypto-js
 */

export const HashEngine = {

    /**
     * Generate hash or encode/decode from text input
     * @param {string} text - The input text
     * @param {string} algorithm - The selected algorithm (SHA-256, MD5, Base64, etc.)
     * @param {string} action - 'encode' (default) or 'decode'
     * @returns {string} - The generated hash or encoded/decoded text
     */
    generateFromString: (text, algorithm, action = 'encode') => {
        if (!text) return '';

        try {
            if (action === 'decode') {
                switch (algorithm) {
                    case 'Base64':
                        return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Base64.parse(text));
                    case 'Hex':
                        return CryptoJS.enc.Utf8.stringify(CryptoJS.enc.Hex.parse(text));
                    case 'URL':
                        return decodeURIComponent(text);
                    default:
                        return 'Error: Algorithm does not support decoding';
                }
            }

            switch (algorithm) {
                case 'MD5':
                    return CryptoJS.MD5(text).toString();
                case 'SHA-1':
                    return CryptoJS.SHA1(text).toString();
                case 'SHA-256':
                    return CryptoJS.SHA256(text).toString();
                case 'SHA-512':
                    return CryptoJS.SHA512(text).toString();
                case 'SHA-3-256':
                    return CryptoJS.SHA3(text, { outputLength: 256 }).toString();
                case 'SHA-3-512': // Mapping UI value 'SHA-3-512' to CryptoJS.SHA3
                    return CryptoJS.SHA3(text, { outputLength: 512 }).toString();
                case 'Base64':
                    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
                case 'Hex':
                    return CryptoJS.enc.Hex.stringify(CryptoJS.enc.Utf8.parse(text));
                case 'URL':
                    return encodeURIComponent(text);
                default:
                    return 'Error: Unknown Algorithm';
            }
        } catch (e) {
            console.error(e);
            return 'Error processing data';
        }
    },

    /**
     * Process a file and return its hash or encoding
     * @param {File} file 
     * @param {string} algorithm 
     * @param {string} action - 'encode' (default) or 'decode'
     * @returns {Promise<string>}
     */
    generateFromFile: (file, algorithm, action = 'encode') => {
        return new Promise((resolve, reject) => {
            if (action === 'decode') {
                return reject('Decoding not supported in File Mode');
            }

            if (algorithm === 'Base64' || algorithm === 'Hex') {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const arrayBuffer = e.target.result;
                        const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
                        if (algorithm === 'Base64') {
                            resolve(CryptoJS.enc.Base64.stringify(wordArray));
                        } else {
                            resolve(CryptoJS.enc.Hex.stringify(wordArray));
                        }
                    } catch (error) {
                        reject('Error encoding file');
                    }
                };
                reader.onerror = () => reject('Error reading file');
                reader.readAsArrayBuffer(file);
                return;
            }

            if (algorithm === 'URL') {
                return reject('URL Encoding not supported for files');
            }

            let algo;
            try {
                switch (algorithm) {
                    case 'MD5': algo = CryptoJS.algo.MD5.create(); break;
                    case 'SHA-1': algo = CryptoJS.algo.SHA1.create(); break;
                    case 'SHA-256': algo = CryptoJS.algo.SHA256.create(); break;
                    case 'SHA-512': algo = CryptoJS.algo.SHA512.create(); break;
                    case 'SHA-3-256': algo = CryptoJS.algo.SHA3.create({ outputLength: 256 }); break;
                    case 'SHA-3-512': algo = CryptoJS.algo.SHA3.create({ outputLength: 512 }); break;
                    default: return reject('Error: Unknown Algorithm');
                }
            } catch (e) {
                return reject('Error initializing algorithm');
            }

            // 5MB chunk size for progressive hashing
            const chunkSize = 1024 * 1024 * 5; 
            let offset = 0;
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const arrayBuffer = e.target.result;
                    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
                    algo.update(wordArray);

                    offset += arrayBuffer.byteLength;
                    if (offset < file.size) {
                        // Allow UI to breathe between heavy chunk computations
                        await new Promise(r => setTimeout(r, 0));
                        readNextChunk();
                    } else {
                        const hash = algo.finalize().toString();
                        resolve(hash);
                    }
                } catch (error) {
                    reject('Error hashing file chunk');
                }
            };

            reader.onerror = () => reject('Error reading file');

            function readNextChunk() {
                const slice = file.slice(offset, offset + chunkSize);
                reader.readAsArrayBuffer(slice);
            }

            readNextChunk();
        });
    }
};
