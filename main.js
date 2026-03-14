import './style.css'
import { HashEngine as CodeEngine } from './hash-engine.js'; // Renaming locally to avoid confusion, but same HashEngine object

// DOM Elements
const tabText = document.getElementById('tab-text');
const tabFile = document.getElementById('tab-file');
const panelText = document.querySelector('#panel-text');
const panelFile = document.querySelector('#panel-file');

const btnGenerate = document.getElementById('btn-generate');
const outputHash = document.getElementById('output-hash');
const algoDisplay = document.getElementById('algo-display');
const algoSelect = document.getElementById('algo-select');
const btnCopy = document.getElementById('btn-copy');
const btnDownload = document.getElementById('btn-download');

// New Elements
const inputText = document.getElementById('input-text');
const inputFile = document.getElementById('input-file');
const toggleRealtime = document.getElementById('toggle-realtime');
const fileDropZone = inputFile.parentElement;

// Hash Info Elements
const hashInfo = document.getElementById('hash-info');
const infoLength = document.getElementById('info-length');
const infoFormat = document.getElementById('info-format');
const infoAlgorithm = document.getElementById('info-algorithm');

// Input Stats Elements
const btnClear = document.getElementById('btn-clear');
const inputCharCount = document.getElementById('input-char-count');
const inputByteCount = document.getElementById('input-byte-count');
const inputStatus = document.getElementById('input-status');

// State
let currentTab = 'text'; // 'text' or 'file'
let selectedFile = null;

// --- Tab Switching Logic ---
function switchTab(tab) {
    currentTab = tab;
    // Reset UI states
    tabText.classList.remove('active', 'border-cyber-blue', 'text-cyber-blue', 'bg-white/5');
    tabFile.classList.remove('active', 'border-cyber-blue', 'text-cyber-blue', 'bg-white/5');

    panelText.classList.add('hidden');
    panelFile.classList.add('hidden');

    // Activate selected
    if (tab === 'text') {
        tabText.classList.add('active', 'border-cyber-blue', 'text-cyber-blue', 'bg-white/5');
        panelText.classList.remove('hidden');
        // If real-time is on, trigger generation
        if (toggleRealtime.checked) generateHash();
    } else {
        tabFile.classList.add('active', 'border-cyber-blue', 'text-cyber-blue', 'bg-white/5');
        panelFile.classList.remove('hidden');
        // If we have a file and real-time is on, trigger generation
        if (toggleRealtime.checked && selectedFile) generateHash();
    }
}

tabText.addEventListener('click', () => switchTab('text'));
tabFile.addEventListener('click', () => switchTab('file'));

// --- Input Analytics Logic ---
function updateInputStats() {
    const text = inputText.value;
    inputCharCount.textContent = text.length;
    // Byte count using TextEncoder
    const bytes = new TextEncoder().encode(text).length;
    inputByteCount.textContent = bytes;
}

btnClear.addEventListener('click', () => {
    inputText.value = '';
    updateInputStats();
    if (toggleRealtime.checked) generateHash();
    
    // UX feedback
    inputStatus.textContent = 'Cleared';
    inputStatus.classList.remove('opacity-0');
    setTimeout(() => inputStatus.classList.add('opacity-0'), 1500);
    
    inputText.focus();
});


// --- Algorithm Display Update ---
algoSelect.addEventListener('change', (e) => {
    algoDisplay.textContent = e.target.value;
    algoDisplay.classList.add('animate-pulse');
    setTimeout(() => algoDisplay.classList.remove('animate-pulse'), 500);

    if (toggleRealtime.checked) generateHash();
});

// --- Hash Generation Logic ---
async function generateHash() {
    const algo = algoSelect.value;
    let result = '';

    // Show loading state
    updateOutputUI('Generating...', true);

    try {
        if (currentTab === 'text') {
            const text = inputText.value;
            if (!text) {
                updateOutputUI('Waiting for input...', false);
                return;
            }

            // Small delay to allow UI to breathe/update if needed
            await new Promise(r => setTimeout(r, 10));

            result = CodeEngine.generateFromString(text, algo);

            updateOutputUI(result, false);

        } else {
            // File Mode
            if (!selectedFile) {
                updateOutputUI('Please select a file first.', false);
                return;
            }

            // UX: Show loading for file
            btnGenerate.disabled = true;
            btnGenerate.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Hashing File...';

            // Small delay for UI update
            await new Promise(r => setTimeout(r, 50));

            // Use FileReader/CryptoJS
            if (algo === 'Base64') {
                // File to Base64 via helper for standard behavior
                result = await fileToBase64(selectedFile);
            } else {
                result = await CodeEngine.generateFromFile(selectedFile, algo);
            }

            btnGenerate.innerHTML = '<span>Generate Hash</span><i class="fas fa-bolt group-hover:animate-pulse"></i>';
            btnGenerate.disabled = false;

            updateOutputUI(result, false);
        }

    } catch (error) {
        console.error(error);
        updateOutputUI('Error: ' + error.message, false);
        btnGenerate.disabled = false;
        btnGenerate.innerHTML = '<span>Generate Hash</span><i class="fas fa-bolt group-hover:animate-pulse"></i>';
    }
}


// --- Comparison Tool Logic ---
const compareInput = document.getElementById('compare-input');
const compareBadge = document.getElementById('compare-badge');

function checkMatch() {
    const currentHash = outputHash.textContent.trim();
    const inputHash = compareInput.value.trim();

    // Hide if empty
    if (!inputHash) {
        compareBadge.classList.add('hidden');
        compareInput.classList.remove('border-green-500', 'border-red-500', 'focus:ring-green-500', 'focus:ring-red-500');
        return;
    }

    // Clean checks
    if (currentHash === 'Waiting for input...' || currentHash === 'Generating...') {
        return;
    }

    const isMatch = (currentHash.toLowerCase() === inputHash.toLowerCase());

    compareBadge.classList.remove('hidden', 'bg-green-500/20', 'text-green-500', 'bg-red-500/20', 'text-red-500');
    compareInput.classList.remove('border-green-500', 'border-red-500', 'focus:ring-green-500', 'focus:ring-red-500');

    if (isMatch) {
        compareBadge.textContent = 'MATCHED';
        compareBadge.classList.add('bg-green-500/20', 'text-green-500');
        compareInput.classList.add('border-green-500', 'focus:ring-green-500');
    } else {
        compareBadge.textContent = 'MISMATCH';
        compareBadge.classList.add('bg-red-500/20', 'text-red-500');
        compareInput.classList.add('border-red-500', 'focus:ring-red-500');
    }
}

compareInput.addEventListener('input', checkMatch);


// --- Theme Toggle Logic ---
const themeToggleBtn = document.getElementById('theme-toggle');

function toggleTheme() {
    // Toggle class
    document.documentElement.classList.toggle('dark');

    // Save preference
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', toggleTheme);


// --- Update Output Helper (Refined) ---
function updateOutputUI(text, isLoading) {
    outputHash.textContent = text;
    if (!isLoading && text !== 'Waiting for input...' && text !== 'Generating...' && !text.startsWith('Error:')) {
        // Update hash info
        const algo = algoSelect.value;
        infoLength.textContent = `${text.length} characters`;
        infoFormat.textContent = algo === 'Base64' ? 'Base64 Encoding' : 'Hexadecimal';
        
        // Pretty algorithm name
        let algoPretty = algo;
        if (algo === 'SHA-3-512') algoPretty = 'SHA-3';
        infoAlgorithm.textContent = algoPretty;

        hashInfo.classList.remove('opacity-0');

        // Flash success
        outputHash.parentElement.classList.add('ring-2', 'ring-cyber-blue', 'ring-opacity-50');
        setTimeout(() => outputHash.parentElement.classList.remove('ring-2', 'ring-cyber-blue', 'ring-opacity-50'), 1000);

        // Re-run comparison if input exists
        if (compareInput.value) checkMatch();
    } else {
        hashInfo.classList.add('opacity-0');
    }
}


// Helper: FileReader plain Base64 (if needed, but using engine is preferred)
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // Remove data:application/whatever;base64, prefix
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };
        reader.onerror = error => reject(error);
    });
}


// --- Event Listeners for Generation ---
btnGenerate.addEventListener('click', generateHash);

inputText.addEventListener('input', () => {
    updateInputStats();
    if (toggleRealtime.checked) {
        generateHash();
    }
});


// --- Copy Button Interaction ---
btnCopy.addEventListener('click', () => {
    const text = outputHash.textContent;
    if (text && text !== 'Waiting for input...' && text !== 'Generating...') {
        navigator.clipboard.writeText(text).then(() => {
            const originalIcon = btnCopy.innerHTML;
            btnCopy.innerHTML = '<i class="fas fa-check text-green-400"></i>';
            setTimeout(() => {
                btnCopy.innerHTML = originalIcon;
            }, 2000);
        });
    }
});

// --- Download Button Interaction ---
btnDownload.addEventListener('click', () => {
    const text = outputHash.textContent;
    if (text && text !== 'Waiting for input...' && text !== 'Generating...') {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hash_${algoSelect.value}_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
});


// --- File Input Visuals & Logic ---
inputFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        const fileName = selectedFile.name;

        fileDropZone.querySelector('p.font-medium').textContent = `Selected: ${fileName}`;
        // Show size
        const fileSize = (selectedFile.size / 1024 / 1024).toFixed(2);
        fileDropZone.querySelector('p.text-sm').textContent = `Size: ${fileSize} MB`;

        fileDropZone.classList.add('border-cyber-blue', 'bg-cyber-blue/5');

        if (toggleRealtime.checked) generateHash();
    } else {
        selectedFile = null;
        fileDropZone.querySelector('p.font-medium').textContent = 'Click to upload or drag & drop';
        fileDropZone.classList.remove('border-cyber-blue', 'bg-cyber-blue/5');
    }
});

// Drag and drop visual effects
['dragenter', 'dragover'].forEach(eventName => {
    fileDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileDropZone.classList.add('border-cyber-blue', 'bg-cyber-blue/10');
    }, false)
});

['dragleave', 'drop'].forEach(eventName => {
    fileDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        fileDropZone.classList.remove('border-cyber-blue', 'bg-cyber-blue/10');
    }, false)
});

fileDropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
        inputFile.files = files; // Update input
        // Trigger change event manually
        const event = new Event('change');
        inputFile.dispatchEvent(event);
    }
});

// Initial state check
updateInputStats();
