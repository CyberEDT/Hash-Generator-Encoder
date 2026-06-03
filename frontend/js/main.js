import { HashEngine as CodeEngine } from './hash-engine.js';
import { knowledgeBase } from './knowledge.js';

// DOM Elements
const algoTabs = document.querySelectorAll('.algo-btn');
const opHashBtn = document.getElementById('op-hash');
const opEncodeBtn = document.getElementById('op-encode');
const encodeActions = document.getElementById('encode-actions');
const actionEncodeBtn = document.getElementById('action-encode');
const actionDecodeBtn = document.getElementById('action-decode');
const algoTabsHash = document.getElementById('algo-tabs-hash');
const algoTabsEncode = document.getElementById('algo-tabs-encode');
const modeTextBtn = document.getElementById('mode-text');
const modeFileBtn = document.getElementById('mode-file');
const inputText = document.getElementById('input-text');
const inputFileContainer = document.getElementById('input-file-container');
const inputFile = document.getElementById('input-file');
const fileLabel = document.getElementById('file-label');
const realtimeToggle = document.getElementById('realtime-toggle');
const realtimeLabel = document.getElementById('realtime-label');
const btnGenerateManual = document.getElementById('btn-generate-manual');

const outputHash = document.getElementById('output-hash');
const outputAlgoLabel = document.getElementById('output-algo-label');
const btnCopy = document.getElementById('btn-copy');
const btnDownload = document.getElementById('btn-download');
const btnClear = document.getElementById('btn-clear');

const hashA = document.getElementById('hash-a');
const hashB = document.getElementById('hash-b');
const btnSwap = document.getElementById('btn-swap');
const matchBadge = document.getElementById('match-badge');

// State
let currentOperation = 'hash'; // 'hash' or 'encode'
let currentAction = 'encode'; // 'encode' or 'decode'
let currentAlgo = 'SHA-256';
let currentMode = 'text'; // 'text' or 'file'
let isRealtime = true;
let selectedFile = null;

// --- Algorithm Tabs Logic ---
algoTabs.forEach(btn => {
    btn.addEventListener('click', () => {
        // Reset all tabs
        algoTabs.forEach(b => {
            b.classList.remove('border-primary', 'bg-primary/15', 'text-primary', 'active-algo');
            b.classList.add('border-border', 'bg-muted/30', 'text-muted-foreground');
        });
        // Activate clicked tab
        btn.classList.remove('border-border', 'bg-muted/30', 'text-muted-foreground');
        btn.classList.add('border-primary', 'bg-primary/15', 'text-primary', 'active-algo');
        
        currentAlgo = btn.dataset.algo;
        outputAlgoLabel.textContent = currentAlgo;
        
        if (isRealtime) generateHash();
    });
});

// --- Operation Switch (Hash vs Encode) ---
opHashBtn.addEventListener('click', () => {
    if (currentOperation === 'hash') return;
    currentOperation = 'hash';
    currentAction = 'encode'; // Reset to encode when switching to hash mode to be safe
    
    opHashBtn.classList.replace('text-muted-foreground', 'bg-primary');
    opHashBtn.classList.replace('hover:text-foreground', 'text-primary-foreground');
    opEncodeBtn.classList.replace('bg-primary', 'text-muted-foreground');
    opEncodeBtn.classList.replace('text-primary-foreground', 'hover:text-foreground');
    
    encodeActions.classList.add('hidden');
    encodeActions.classList.remove('flex');
    algoTabsHash.classList.remove('hidden');
    algoTabsHash.classList.add('flex');
    algoTabsEncode.classList.add('hidden');
    algoTabsEncode.classList.remove('flex');
    
    document.querySelector('#algo-tabs-hash [data-algo="SHA-256"]').click();
});

opEncodeBtn.addEventListener('click', () => {
    if (currentOperation === 'encode') return;
    currentOperation = 'encode';
    
    opEncodeBtn.classList.replace('text-muted-foreground', 'bg-primary');
    opEncodeBtn.classList.replace('hover:text-foreground', 'text-primary-foreground');
    opHashBtn.classList.replace('bg-primary', 'text-muted-foreground');
    opHashBtn.classList.replace('text-primary-foreground', 'hover:text-foreground');
    
    encodeActions.classList.remove('hidden');
    encodeActions.classList.add('flex');
    algoTabsEncode.classList.remove('hidden');
    algoTabsEncode.classList.add('flex');
    algoTabsHash.classList.add('hidden');
    algoTabsHash.classList.remove('flex');
    
    document.querySelector('#algo-tabs-encode [data-algo="Base64"]').click();
});

// --- Action Switch (Encode vs Decode) ---
actionEncodeBtn.addEventListener('click', () => {
    if (currentAction === 'encode') return;
    currentAction = 'encode';
    actionEncodeBtn.classList.replace('text-muted-foreground', 'bg-primary');
    actionEncodeBtn.classList.replace('hover:text-foreground', 'text-primary-foreground');
    actionDecodeBtn.classList.replace('bg-primary', 'text-muted-foreground');
    actionDecodeBtn.classList.replace('text-primary-foreground', 'hover:text-foreground');
    if (isRealtime) generateHash();
});

actionDecodeBtn.addEventListener('click', () => {
    if (currentAction === 'decode') return;
    currentAction = 'decode';
    actionDecodeBtn.classList.replace('text-muted-foreground', 'bg-primary');
    actionDecodeBtn.classList.replace('hover:text-foreground', 'text-primary-foreground');
    actionEncodeBtn.classList.replace('bg-primary', 'text-muted-foreground');
    actionEncodeBtn.classList.replace('text-primary-foreground', 'hover:text-foreground');
    if (isRealtime) generateHash();
});

// --- Mode Switching Logic ---
function switchMode(mode) {
    if (currentMode === mode) return; // Ignore if already in this mode
    
    currentMode = mode;
    outputHash.innerHTML = '<span class="text-muted-foreground/60">// waiting for input...</span>';
    matchBadge.classList.add('border-border', 'text-muted-foreground');
    matchBadge.classList.remove('bg-success/10', 'text-success', 'border-success/30', 'bg-destructive/10', 'text-destructive', 'border-destructive/30');
    matchBadge.textContent = 'awaiting input...';

    if (mode === 'text') {
        modeTextBtn.classList.add('bg-primary', 'text-primary-foreground');
        modeTextBtn.classList.remove('text-muted-foreground', 'hover:text-foreground');
        
        modeFileBtn.classList.remove('bg-primary', 'text-primary-foreground');
        modeFileBtn.classList.add('text-muted-foreground', 'hover:text-foreground');
        
        inputText.classList.remove('hidden');
        inputFileContainer.classList.add('hidden');
        
        if (isRealtime) generateHash();
    } else {
        modeFileBtn.classList.add('bg-primary', 'text-primary-foreground');
        modeFileBtn.classList.remove('text-muted-foreground', 'hover:text-foreground');
        
        modeTextBtn.classList.remove('bg-primary', 'text-primary-foreground');
        modeTextBtn.classList.add('text-muted-foreground', 'hover:text-foreground');
        
        inputFileContainer.classList.remove('hidden');
        inputText.classList.add('hidden');
        
        if (isRealtime && selectedFile) generateHash();
    }
}

modeTextBtn.addEventListener('click', () => switchMode('text'));
modeFileBtn.addEventListener('click', () => switchMode('file'));

// --- Realtime Toggle Logic ---
realtimeToggle.addEventListener('click', () => {
    isRealtime = !isRealtime;
    if (isRealtime) {
        realtimeToggle.classList.remove('border-border', 'bg-muted/30', 'text-muted-foreground');
        realtimeToggle.classList.add('border-primary/40', 'bg-primary/10', 'text-primary');
        realtimeLabel.textContent = 'realtime: on';
        btnGenerateManual.classList.add('hidden');
        generateHash(); // trigger immediately
    } else {
        realtimeToggle.classList.add('border-border', 'bg-muted/30', 'text-muted-foreground');
        realtimeToggle.classList.remove('border-primary/40', 'bg-primary/10', 'text-primary');
        realtimeLabel.textContent = 'realtime: off';
        btnGenerateManual.classList.remove('hidden');
    }
});

// --- Hash Generation Logic ---
async function generateHash() {
    let result = '';

    try {
        if (currentMode === 'text') {
            const text = inputText.value;
            if (!text) {
                outputHash.innerHTML = '<span class="text-muted-foreground/60">// waiting for input...</span>';
                return;
            }

            // Calculate hash synchronously to prevent flickering when typing
            result = CodeEngine.generateFromString(text, currentAlgo, currentAction);
            outputHash.textContent = result;

        } else {
            // File Mode
            if (!selectedFile) {
                outputHash.innerHTML = '<span class="text-muted-foreground/60">// select a file to process...</span>';
                return;
            }

            outputHash.innerHTML = '<span class="text-muted-foreground/60">Processing...</span>';
            btnGenerateManual.disabled = true;
            btnGenerateManual.textContent = 'Processing File...';

            await new Promise(r => setTimeout(r, 50));

            result = await CodeEngine.generateFromFile(selectedFile, currentAlgo, currentAction);

            btnGenerateManual.textContent = 'Process Data';
            btnGenerateManual.disabled = false;

            outputHash.textContent = result;
        }

    } catch (error) {
        console.error(error);
        outputHash.textContent = 'Error: ' + error.message;
        if (currentMode === 'file') {
            btnGenerateManual.disabled = false;
            btnGenerateManual.textContent = 'Process Data';
        }
    }
}



// --- Event Listeners for Input ---
inputText.addEventListener('input', () => {
    if (isRealtime) generateHash();
});

btnGenerateManual.addEventListener('click', generateHash);

// File Input Logic
inputFile.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        fileLabel.textContent = `Selected: ${selectedFile.name} (${(selectedFile.size / 1024 / 1024).toFixed(2)} MB)`;
        inputFileContainer.classList.add('border-primary', 'bg-primary/5');
        if (isRealtime) generateHash();
    } else {
        selectedFile = null;
        fileLabel.textContent = 'Click to upload or drag & drop';
        inputFileContainer.classList.remove('border-primary', 'bg-primary/5');
        outputHash.innerHTML = '<span class="text-muted-foreground/60">// select a file to hash...</span>';
    }
});

['dragenter', 'dragover'].forEach(eventName => {
    inputFileContainer.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        inputFileContainer.classList.add('border-primary', 'bg-primary/10');
    }, false)
});

['dragleave', 'drop'].forEach(eventName => {
    inputFileContainer.addEventListener(eventName, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!selectedFile) {
            inputFileContainer.classList.remove('border-primary', 'bg-primary/10');
        } else {
            inputFileContainer.classList.remove('bg-primary/10');
        }
    }, false)
});

inputFileContainer.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    if (files.length > 0) {
        inputFile.files = files;
        const event = new Event('change');
        inputFile.dispatchEvent(event);
    }
});

// --- Action Buttons (Copy, Download, Clear) ---
btnCopy.addEventListener('click', () => {
    const text = outputHash.textContent;
    if (text && !text.includes('waiting for input') && !text.includes('Generating') && !text.includes('select a file')) {
        navigator.clipboard.writeText(text).then(() => {
            const icon = btnCopy.innerHTML;
            btnCopy.innerHTML = '<span class="text-success font-mono text-xs">Copied</span>';
            setTimeout(() => btnCopy.innerHTML = icon, 2000);
        });
    }
});

btnDownload.addEventListener('click', () => {
    const text = outputHash.textContent;
    if (text && !text.includes('waiting for input') && !text.includes('Generating') && !text.includes('select a file')) {
        const blob = new Blob([text], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hash_${currentAlgo}_${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
});

btnClear.addEventListener('click', () => {
    if (currentMode === 'text') {
        inputText.value = '';
    } else {
        selectedFile = null;
        inputFile.value = '';
        fileLabel.textContent = 'Click to upload or drag & drop';
        inputFileContainer.classList.remove('border-primary', 'bg-primary/5');
    }
    
    if (isRealtime) {
        generateHash();
    } else {
        outputHash.innerHTML = '<span class="text-muted-foreground/60">// waiting for input...</span>';
    }
});

// --- Hash Comparison Logic ---
function checkMatch() {
    const valA = hashA.value.trim();
    const valB = hashB.value.trim();

    matchBadge.classList.remove('bg-success/10', 'text-success', 'border-success/30');
    matchBadge.classList.remove('bg-destructive/10', 'text-destructive', 'border-destructive/30');
    matchBadge.classList.add('border-border', 'text-muted-foreground');

    if (!valA && !valB) {
        matchBadge.textContent = 'awaiting input...';
        return;
    }
    
    if (!valA || !valB) {
        matchBadge.textContent = 'waiting for second hash...';
        return;
    }

    if (valA.toLowerCase() === valB.toLowerCase()) {
        matchBadge.textContent = 'MATCHED';
        matchBadge.classList.remove('border-border', 'text-muted-foreground');
        matchBadge.classList.add('bg-success/10', 'text-success', 'border-success/30');
    } else {
        matchBadge.textContent = 'MISMATCH';
        matchBadge.classList.remove('border-border', 'text-muted-foreground');
        matchBadge.classList.add('bg-destructive/10', 'text-destructive', 'border-destructive/30');
    }
}

hashA.addEventListener('input', checkMatch);
hashB.addEventListener('input', checkMatch);

btnSwap.addEventListener('click', () => {
    const temp = hashA.value;
    hashA.value = hashB.value;
    hashB.value = temp;
    checkMatch();
});

// --- Knowledge Base Modal Logic ---
const kbModal = document.getElementById('kb-modal');
const kbClose = document.getElementById('kb-close');
const kbTitle = document.getElementById('kb-title');
const kbContent = document.getElementById('kb-content');
const algoInfoCards = document.querySelectorAll('.algo-info-card');

function openKbModal(algo) {
    const data = knowledgeBase[algo];
    if (!data) return;

    kbTitle.textContent = algo;
    
    let html = '';
    
    if (data.definition) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Definition</h3><p>${data.definition}</p></div>`;
    }
    
    if (data.keyFacts) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Key Facts</h3><ul class="list-disc pl-5 space-y-1">`;
        data.keyFacts.forEach(f => html += `<li>${f}</li>`);
        html += `</ul></div>`;
    }

    if (data.securityStatus) {
        const isBroken = data.securityStatus.toLowerCase().includes('broken') || data.securityStatus.toLowerCase().includes('not secure');
        const colorClass = isBroken ? 'text-destructive' : (data.securityStatus.toLowerCase().includes('secure') ? 'text-success' : 'text-primary');
        html += `<div><h3 class="text-foreground font-semibold mb-1">Security Status</h3><p class="${colorClass} font-semibold">${data.securityStatus}</p></div>`;
    }

    if (data.commonUses) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Common Uses</h3><ul class="list-disc pl-5 space-y-1">`;
        data.commonUses.forEach(u => html += `<li>${u}</li>`);
        html += `</ul></div>`;
    }
    
    if (data.advantages) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Advantages</h3><ul class="list-disc pl-5 space-y-1">`;
        data.advantages.forEach(a => html += `<li>${a}</li>`);
        html += `</ul></div>`;
    }

    if (data.weaknesses || data.disadvantages) {
        const list = data.weaknesses || data.disadvantages;
        const title = data.weaknesses ? 'Weaknesses' : 'Disadvantages';
        html += `<div><h3 class="text-foreground font-semibold mb-1">${title}</h3><ul class="list-disc pl-5 space-y-1 text-destructive">`;
        list.forEach(w => html += `<li>${w}</li>`);
        html += `</ul></div>`;
    }

    if (data.differences) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Differences</h3><ul class="list-disc pl-5 space-y-1">`;
        data.differences.forEach(d => html += `<li>${d}</li>`);
        html += `</ul></div>`;
    }
    
    if (data.recommendedAlternatives) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Recommended Alternatives</h3><ul class="list-disc pl-5 space-y-1 text-primary">`;
        data.recommendedAlternatives.forEach(r => html += `<li>${r}</li>`);
        html += `</ul></div>`;
    }
    
    if (data.recommendedFor) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Recommended For</h3><ul class="list-disc pl-5 space-y-1 text-primary">`;
        data.recommendedFor.forEach(r => html += `<li>${r}</li>`);
        html += `</ul></div>`;
    }

    if (data.example) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Example</h3><p class="whitespace-pre-line">${data.example}</p></div>`;
    }

    if (data.commonMisconception) {
        html += `<div><h3 class="text-foreground font-semibold mb-1">Common Misconception</h3><p>${data.commonMisconception}</p></div>`;
    }

    kbContent.innerHTML = html;
    
    kbModal.classList.remove('opacity-0', 'pointer-events-none');
}

function closeKbModal() {
    kbModal.classList.add('opacity-0', 'pointer-events-none');
}

algoInfoCards.forEach(card => {
    card.addEventListener('click', () => {
        const algo = card.dataset.algo;
        openKbModal(algo);
    });
});

kbClose.addEventListener('click', closeKbModal);
kbModal.addEventListener('click', (e) => {
    if (e.target === kbModal) closeKbModal();
});
