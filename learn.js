import { HashEngine } from './hash-engine.js';
import './style.css';

// --- Static Content Objects ---
const contentMap = {
    'tool-docs': `
        <h1 class="text-4xl md:text-5xl font-black mb-4 leading-tight">Tool Documentation</h1>
        <p class="text-gray-500 dark:text-gray-400 text-lg mb-12 leading-relaxed max-w-2xl">
            A complete reference guide for the CyberEDT Hash Generator — covering every feature, input mode, and control.
        </p>

        <div class="space-y-10">

            <!-- Overview -->
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                <h2 class="text-xl font-black mb-6 text-gray-900 dark:text-white">Overview</h2>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm mb-4">
                    The CyberEDT Hash Generator computes cryptographic hashes entirely in your browser. No data is ever sent to a server — all operations are client-side using the <code class="bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded text-xs font-mono">crypto-js</code> library.
                </p>
                <div class="grid md:grid-cols-3 gap-6 mt-8 text-sm">
                    <div class="p-5 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div class="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Privacy</div>
                        <p class="text-gray-700 dark:text-gray-300 font-semibold">100% client-side. Zero uploads.</p>
                    </div>
                    <div class="p-5 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div class="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Algorithms</div>
                        <p class="text-gray-700 dark:text-gray-300 font-semibold">MD5, SHA-1, SHA-256, SHA-512, SHA-3, Base64</p>
                    </div>
                    <div class="p-5 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div class="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2">Input Types</div>
                        <p class="text-gray-700 dark:text-gray-300 font-semibold">Text string or any file type</p>
                    </div>
                </div>
            </div>

            <!-- Text Input -->
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                <h2 class="text-xl font-black mb-2 text-gray-900 dark:text-white">Text Input</h2>
                <p class="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">Tab → Text Input</p>
                <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
                    Type or paste any text into the input area. The tool tracks character count and byte size in real time. Use the <strong>Clear</strong> button (appears on hover) to reset the field instantly.
                </p>
                <div class="space-y-3 text-sm font-mono">
                    <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <span class="text-gray-900 dark:text-white font-black min-w-[110px]">Input Length</span>
                        <span class="text-gray-500">Live character count displayed below the textarea</span>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <span class="text-gray-900 dark:text-white font-black min-w-[110px]">Bytes</span>
                        <span class="text-gray-500">UTF-8 byte size of the input string</span>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <span class="text-gray-900 dark:text-white font-black min-w-[110px]">Real-time</span>
                        <span class="text-gray-500">Enable the checkbox to hash on every keystroke</span>
                    </div>
                </div>
            </div>

            <!-- File Input -->
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                <h2 class="text-xl font-black mb-2 text-gray-900 dark:text-white">File Input</h2>
                <p class="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">Tab → File Input</p>
                <p class="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    Upload any file type. The tool reads the file as binary and hashes its contents. Useful for verifying download integrity against published checksums. Max supported size: <strong>100MB</strong> for in-browser processing.
                </p>
            </div>

            <!-- Algorithm Selection -->
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                <h2 class="text-xl font-black mb-6 text-gray-900 dark:text-white">Algorithm Selection</h2>
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left border-collapse min-w-[480px]">
                        <thead>
                            <tr class="border-b border-gray-100 dark:border-gray-800 text-[10px] font-black uppercase tracking-widest text-gray-400">
                                <th class="py-3 pr-6">Algorithm</th>
                                <th class="py-3 pr-6">Output</th>
                                <th class="py-3 pr-6">Status</th>
                                <th class="py-3">Use When</th>
                            </tr>
                        </thead>
                        <tbody class="text-gray-600 dark:text-gray-300">
                            <tr class="border-b border-gray-50 dark:border-gray-900/50">
                                <td class="py-3 pr-6 font-black text-gray-900 dark:text-white font-mono">SHA-256</td>
                                <td class="py-3 pr-6 font-mono text-xs">256 bits</td>
                                <td class="py-3 pr-6 text-green-600 font-bold text-xs">Recommended</td>
                                <td class="py-3 text-xs">Default choice for most use cases</td>
                            </tr>
                            <tr class="border-b border-gray-50 dark:border-gray-900/50">
                                <td class="py-3 pr-6 font-black text-gray-900 dark:text-white font-mono">SHA-512</td>
                                <td class="py-3 pr-6 font-mono text-xs">512 bits</td>
                                <td class="py-3 pr-6 text-blue-600 font-bold text-xs">Strong</td>
                                <td class="py-3 text-xs">Maximum security, critical systems</td>
                            </tr>
                            <tr class="border-b border-gray-50 dark:border-gray-900/50">
                                <td class="py-3 pr-6 font-black text-gray-900 dark:text-white font-mono">SHA-3</td>
                                <td class="py-3 pr-6 font-mono text-xs">512 bits</td>
                                <td class="py-3 pr-6 text-blue-600 font-bold text-xs">Strong</td>
                                <td class="py-3 text-xs">Post-quantum resistance requirements</td>
                            </tr>
                            <tr class="border-b border-gray-50 dark:border-gray-900/50">
                                <td class="py-3 pr-6 font-black text-gray-900 dark:text-white font-mono">SHA-1</td>
                                <td class="py-3 pr-6 font-mono text-xs">160 bits</td>
                                <td class="py-3 pr-6 text-orange-500 font-bold text-xs">Weak</td>
                                <td class="py-3 text-xs">Legacy systems only</td>
                            </tr>
                            <tr class="border-b border-gray-50 dark:border-gray-900/50">
                                <td class="py-3 pr-6 font-black text-gray-900 dark:text-white font-mono">MD5</td>
                                <td class="py-3 pr-6 font-mono text-xs">128 bits</td>
                                <td class="py-3 pr-6 text-red-500 font-bold text-xs">Broken</td>
                                <td class="py-3 text-xs">Non-security checksums only</td>
                            </tr>
                            <tr>
                                <td class="py-3 pr-6 font-black text-gray-900 dark:text-white font-mono">Base64</td>
                                <td class="py-3 pr-6 font-mono text-xs">Variable</td>
                                <td class="py-3 pr-6 text-gray-400 font-bold text-xs">Encoding</td>
                                <td class="py-3 text-xs">Data encoding, not security hashing</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Output & Actions -->
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                <h2 class="text-xl font-black mb-6 text-gray-900 dark:text-white">Output & Actions</h2>
                <div class="grid md:grid-cols-2 gap-6 text-sm">
                    <div class="p-5 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div class="font-black text-gray-900 dark:text-white mb-2">Copy to Clipboard</div>
                        <p class="text-gray-500 leading-relaxed">Hover over the output panel and click the copy icon to copy the hash instantly.</p>
                    </div>
                    <div class="p-5 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <div class="font-black text-gray-900 dark:text-white mb-2">Download as .txt</div>
                        <p class="text-gray-500 leading-relaxed">Export the generated hash as a plain text file for record-keeping.</p>
                    </div>
                    <div class="p-5 bg-gray-50 dark:bg-black/30 rounded-2xl border border-gray-100 dark:border-gray-800 md:col-span-2">
                        <div class="font-black text-gray-900 dark:text-white mb-2">Hash Matcher</div>
                        <p class="text-gray-500 leading-relaxed">Paste a known hash into the <strong>Hash Matcher</strong> field below the output. The tool instantly compares it to your generated hash and displays a <span class="text-green-600 font-bold">MATCH</span> or <span class="text-red-500 font-bold">NO MATCH</span> badge.</p>
                    </div>
                </div>
            </div>

        </div>
    `,
    fundamentals: `
        <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight">Fundamentals</h1>
        <div class="space-y-12">
            <section class="max-w-3xl">
                <p class="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                    Cryptographic hashing is a mathematical algorithm that maps data of any size to a bit string of a fixed size. It is a fundamental building block of modern cybersecurity.
                </p>
                <div class="grid gap-8">
                    <div class="flex gap-5">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5 flex-shrink-0 "></div>
                        <div>
                            <strong class="text-gray-900 dark:text-white block font-bold text-lg">One-way Function</strong>
                            <p class="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">It is computationally impossible to reverse the process (find the original data from its hash).</p>
                        </div>
                    </div>
                    <div class="flex gap-5">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5 flex-shrink-0 "></div>
                        <div>
                            <strong class="text-gray-900 dark:text-white block font-bold text-lg">Deterministic Output</strong>
                            <p class="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">The same input will always produce the exact same output every single time.</p>
                        </div>
                    </div>
                    <div class="flex gap-5">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2.5 flex-shrink-0 "></div>
                        <div>
                            <strong class="text-gray-900 dark:text-white block font-bold text-lg">Fixed-length Output</strong>
                            <p class="text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">The output size is always fixed (e.g., 256 bits), regardless of input size.</p>
                        </div>
                    </div>
                </div>
            </section>
            
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-10 shadow-sm">
                <h3 class="text-[10px] font-black uppercase tracking-widest text-gray-900 dark:text-gray-100 mb-6 font-mono">Real-world Example</h3>
                <div class="space-y-5 font-mono text-sm leading-relaxed">
                    <div class="p-5 bg-gray-50 dark:bg-black/40 rounded-2xl border border-gray-100 dark:border-gray-800">
                        <span class="text-gray-400 italic block mb-1">Input String:</span> 
                        <span class="text-gray-900 dark:text-white">hello</span>
                    </div>
                    <div class="p-5 bg-gray-50 dark:bg-black/40 rounded-2xl border border-gray-100 dark:border-gray-800 break-all border-l-2 border-l-gray-900">
                        <span class="text-gray-900 dark:text-gray-100 uppercase text-[9px] font-black block mb-2 tracking-widest">SHA-256 HASH</span>
                        <span class="text-gray-700 dark:text-gray-300">2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824</span>
                    </div>
                </div>
            </div>
        </div>
    `,
    'why-hashing': `
        <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight">Why Hashing</h1>
        <div class="grid md:grid-cols-2 gap-6">
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm group hover:border-gray-900/30 transition-all">
                <i class="fas fa-key text-gray-900 dark:text-gray-100 mb-6 text-2xl group-hover:scale-110 transition-transform"></i>
                <h3 class="text-xl font-bold mb-3">Password Storage</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">Security systems store hashes rather than plain text passwords. Even if hackers breach a database, they only find randomized hash strings.</p>
            </div>
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm group hover:border-purple-500/30 transition-all">
                <i class="fas fa-check-double text-purple-500 mb-6 text-2xl group-hover:scale-110 transition-transform"></i>
                <h3 class="text-xl font-bold mb-3">File Integrity</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">Downloads often provide a "checksum". By hashing your downloaded file and comparing it, you ensure the file wasn't altered or corrupted.</p>
            </div>
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm group hover:border-orange-500/30 transition-all">
                <i class="fas fa-microscope text-orange-500 mb-6 text-2xl group-hover:scale-110 transition-transform"></i>
                <h3 class="text-xl font-bold mb-3">Malware ID</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">Security analysts identify viruses by their unique hashes. This allows for near-instant identification of known malicious software.</p>
            </div>
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm group hover:border-green-500/30 transition-all">
                <i class="fas fa-link text-green-500 mb-6 text-2xl group-hover:scale-110 transition-transform"></i>
                <h3 class="text-xl font-bold mb-3">Blockchain</h3>
                <p class="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">Blockchains use cryptographic hashes to link blocks together. Changing a single block would invalidate every subsequent block's hash.</p>
            </div>
        </div>
    `,
    algorithms: `
        <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight">Algorithms</h1>
        <div class="space-y-6">
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
                <div class="flex flex-col md:flex-row gap-8">
                    <div class="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-6 md:pb-0 md:pr-8">
                        <div class="inline-block px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-[9px] font-black uppercase tracking-widest mb-4">Recommended</div>
                        <h3 class="text-2xl font-black mb-1">SHA-256</h3>
                        <p class="text-xs text-gray-500 italic">Industry Standard</p>
                    </div>
                    <div class="md:w-2/3 grid grid-cols-2 gap-y-6 text-xs">
                        <div>
                            <h4 class="font-black uppercase text-gray-400 tracking-wider mb-2">Output Size</h4>
                            <p class="font-mono text-gray-800 dark:text-gray-200">256 bits</p>
                        </div>
                        <div>
                            <h4 class="font-black uppercase text-gray-400 tracking-wider mb-2">Status</h4>
                            <p class="text-green-500 font-bold uppercase">Secure</p>
                        </div>
                        <div class="col-span-2">
                            <h4 class="font-black uppercase text-gray-400 tracking-wider mb-2">Primary Uses</h4>
                            <p class="text-gray-500 leading-relaxed">Blockchain, SSL/TLS, standard password hashing, secure software updates.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 shadow-sm">
                 <div class="flex flex-col md:flex-row gap-8">
                    <div class="md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-6 md:pb-0 md:pr-8">
                        <div class="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest mb-4">Highly Secure</div>
                        <h3 class="text-2xl font-black mb-1">SHA-512</h3>
                        <p class="text-xs text-gray-500 italic">Maximum Entropy</p>
                    </div>
                    <div class="md:w-2/3 grid grid-cols-2 gap-y-6 text-xs text-gray-800 dark:text-gray-200 ">
                        <div>
                            <h4 class="font-black uppercase text-gray-400 tracking-wider mb-2">Output Size</h4>
                            <p class="font-mono">512 bits</p>
                        </div>
                        <div>
                            <h4 class="font-black uppercase text-gray-400 tracking-wider mb-2">Status</h4>
                            <p class="text-blue-500 font-bold uppercase">Strong</p>
                        </div>
                        <div class="col-span-2 text-gray-500">
                             <h4 class="font-black uppercase text-gray-400 tracking-wider mb-2">Primary Uses</h4>
                            <p class="leading-relaxed">Critical cryptography where collision probability must be absolute zero.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    encryption: `
        <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight">Hashing vs Encryption</h1>
        <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-3xl shadow-sm overflow-hidden mb-12">
            <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                        <tr class="bg-gray-50 dark:bg-black/20 border-b border-gray-100 dark:border-gray-800">
                            <th class="p-8 text-xs font-black uppercase tracking-widest text-gray-400">Feature</th>
                            <th class="p-8 text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white dark:text-white">Hashing</th>
                            <th class="p-8 text-xs font-black uppercase tracking-widest text-purple-600 dark:text-purple-400">Encryption</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm">
                        <tr class="border-b border-gray-50 dark:border-gray-900/50">
                            <td class="p-8 font-bold">Reversible</td>
                            <td class="p-8 text-red-500 font-semibold italic">No (One-way)</td>
                            <td class="p-8 text-green-500 font-semibold italic">Yes (Two-way)</td>
                        </tr>
                        <tr class="border-b border-gray-50 dark:border-gray-900/50">
                            <td class="p-8 font-bold">Key Dependency</td>
                            <td class="p-8 text-gray-400">None</td>
                            <td class="p-8 text-gray-400">Required</td>
                        </tr>
                        <tr class="border-b border-gray-50 dark:border-gray-900/50">
                            <td class="p-8 font-bold">Output Length</td>
                            <td class="p-8 text-gray-400">Fixed</td>
                            <td class="p-8 text-gray-400">Variable</td>
                        </tr>
                        <tr>
                            <td class="p-8 font-bold">Primary Use</td>
                            <td class="p-8 text-gray-600 dark:text-gray-300">Integrity</td>
                            <td class="p-8 text-gray-600 dark:text-gray-300">Confidentiality</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    practices: `
        <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight">Best Practices</h1>
        <div class="bg-gray-950 dark:bg-black border border-gray-800 rounded-[40px] p-12 md:p-16 shadow-2xl relative overflow-hidden mb-12">
            <div class="absolute -top-10 -right-10 p-20 opacity-10 blur-3xl pointer-events-none">
                <i class="fas fa-shield-halved text-[240px] text-gray-900 dark:text-gray-100"></i>
            </div>
            
            <h2 class="text-3xl font-black text-white mb-12 flex items-center gap-5 relative z-10">
                <i class="fas fa-user-shield text-gray-900 dark:text-gray-100"></i> Modern Security
            </h2>
            
            <div class="grid md:grid-cols-2 gap-12 relative z-10">
                <div class="space-y-10 text-sm">
                    <p class="text-gray-400 leading-relaxed"><strong class="text-white block mb-2 uppercase text-[10px] tracking-widest text-gray-900 dark:text-gray-100">Directive 01</strong> Use <strong>SHA-256</strong> or <strong>SHA-3</strong> for every new security implementation. Avoid MD5.</p>
                    <p class="text-gray-400 leading-relaxed"><strong class="text-white block mb-2 uppercase text-[10px] tracking-widest text-red-500">Directive 02</strong> Completely decommission <strong>SHA-1</strong> from production environments.</p>
                </div>
                <div class="space-y-10 text-sm">
                    <p class="text-gray-400 leading-relaxed"><strong class="text-white block mb-2 uppercase text-[10px] tracking-widest text-gray-900 dark:text-gray-100">Directive 03</strong> Always use <strong>salted hashing</strong> to defend against rainbow table attacks.</p>
                    <p class="text-gray-400 leading-relaxed"><strong class="text-white block mb-2 uppercase text-[10px] tracking-widest text-gray-900 dark:text-gray-100">Directive 04</strong> Prefer <strong>Argon2id</strong> for specialized user credential management.</p>
                </div>
            </div>
        </div>
    `,
    avalanche: `
        <h1 class="text-4xl md:text-5xl font-black mb-8 leading-tight">Avalanche Demo</h1>
        <div class="bg-white dark:bg-white/5 border border-gray-100 dark:border-gray-800 rounded-[40px] p-12 shadow-sm">
            <p class="text-gray-500 dark:text-gray-400 text-lg leading-relaxed mb-12 max-w-2xl">
                Observe the <strong>Avalanche Effect</strong>: even a tiny change in input results in a massive shift in the fingerprint.
            </p>

            <div class="grid md:grid-cols-2 gap-12">
                <div class="space-y-6">
                    <label class="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] block font-mono">Input A</label>
                    <input type="text" id="demo-input" value="hello"
                           class="w-full bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 font-mono text-sm focus:ring-2 focus:ring-gray-900 outline-none transition-all">
                    <div class="p-8 bg-gray-50 dark:bg-black/5 rounded-3xl border border-gray-200 dark:border-gray-700/30 flex flex-col justify-center min-h-[140px]">
                        <span class="text-[9px] font-black text-gray-900 dark:text-white/50 uppercase tracking-widest mb-3 font-mono">SHA-256 OUTPUT</span>
                        <p id="demo-hash-1" class="font-mono text-xs break-all leading-relaxed text-gray-900 dark:text-white italic">
                        </p>
                    </div>
                </div>

                <div class="space-y-6">
                    <label class="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] block font-mono">Input B</label>
                    <input type="text" id="demo-input-2" value="hella"
                           class="w-full bg-gray-50 dark:bg-black/40 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 font-mono text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all">
                    <div class="p-8 bg-orange-50 dark:bg-orange-900/5 rounded-3xl border border-orange-100 dark:border-orange-800/30 flex flex-col justify-center min-h-[140px]">
                        <span class="text-[9px] font-black text-orange-600/50 uppercase tracking-widest mb-3 font-mono">SHA-256 OUTPUT</span>
                        <p id="demo-hash-2" class="font-mono text-xs break-all leading-relaxed text-orange-700 dark:text-orange-400 italic">
                        </p>
                    </div>
                </div>
            </div>

            <div class="mt-14 p-10 bg-gray-50 dark:bg-black/40 rounded-[35px] border border-gray-100 dark:border-gray-800 text-center relative overflow-hidden group">
                <div class="relative z-10">
                    <div class="text-[11px] font-black uppercase text-gray-400 tracking-[0.4em] mb-4 font-mono">Entropy Offset</div>
                    <div class="text-5xl font-black text-gray-900 dark:text-white tabular-nums tracking-tighter">
                        <span id="demo-diff" class="text-gray-900 dark:text-gray-100">0</span>
                        <span class="text-xl text-gray-300 dark:text-gray-700 ml-1">CHARS</span>
                    </div>
                </div>
            </div>
        </div>
    `
};

// --- DOM References ---
const contentPanel = document.getElementById('content-panel');
const navItems = document.querySelectorAll('.nav-item');
const themeToggles = [document.getElementById('mobile-theme-toggle')];
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('sidebar-overlay');
const activeTopicLabel = document.getElementById('active-topic-name');

// --- Tab Switching Logic ---
function activateTab(tabId) {
    const isDark = document.documentElement.classList.contains('dark');
    
    navItems.forEach(item => {
        if (item.getAttribute('data-target') === tabId) {
            item.classList.add('bg-gray-200', 'text-gray-900', 'font-black');
            item.classList.remove('text-gray-500', 'hover:bg-gray-100', 'dark:hover:bg-white/5');
            
            if (isDark) {
                item.classList.add('dark:bg-white/10', 'dark:text-white');
                item.classList.remove('bg-gray-200', 'text-gray-900');
            }
            if (activeTopicLabel) activeTopicLabel.textContent = item.innerText.trim();
        } else {
            item.classList.remove('bg-gray-200', 'text-gray-900', 'dark:bg-white/10', 'dark:text-white', 'font-black');
            item.classList.add('text-gray-500', 'hover:bg-gray-100', 'dark:hover:bg-white/5');
        }
    });

    contentPanel.classList.add('opacity-0', 'translate-y-3');
    
    setTimeout(() => {
        contentPanel.innerHTML = contentMap[tabId] || 'Section not found.';
        contentPanel.classList.remove('opacity-0', 'translate-y-3');
        
        if (tabId === 'avalanche') initAvalancheDemo();

        closeMobileMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 150);

    localStorage.setItem('activeLearnTab', tabId);
}

// --- Avalanche Logic ---
function initAvalancheDemo() {
    const in1 = document.getElementById('demo-input');
    const in2 = document.getElementById('demo-input-2');
    const h1Disp = document.getElementById('demo-hash-1');
    const h2Disp = document.getElementById('demo-hash-2');
    const diffDisp = document.getElementById('demo-diff');

    if (!in1 || !in2) return;

    function run() {
        const h1 = HashEngine.generateFromString(in1.value, 'SHA-256');
        const h2 = HashEngine.generateFromString(in2.value, 'SHA-256');
        h1Disp.textContent = h1;
        h2Disp.textContent = h2;

        let d = 0;
        const m = Math.max(h1.length, h2.length);
        for(let i=0; i<m; i++) if(h1[i] !== h2[i]) d++;
        diffDisp.textContent = d;
    }

    in1.addEventListener('input', run);
    in2.addEventListener('input', run);
    run();
}

// --- Navigation Logic ---
function toggleMobileMenu() {
    sidebar.classList.toggle('show');
    overlay.classList.toggle('hidden');
}

function closeMobileMenu() {
    sidebar.classList.remove('show');
    overlay.classList.add('hidden');
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    activateTab(localStorage.getItem('activeLearnTab') || 'fundamentals');
}

// --- Listeners ---
navItems.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.getAttribute('data-target')));
});

themeToggles.forEach(btn => btn && btn.addEventListener('click', toggleTheme));
mobileMenuBtn && mobileMenuBtn.addEventListener('click', toggleMobileMenu);
overlay && overlay.addEventListener('click', closeMobileMenu);

// --- Boot ---
(function boot() {
    const theme = localStorage.getItem('theme') || 'dark';
    document.documentElement.classList.toggle('dark', theme === 'dark');
    activateTab(localStorage.getItem('activeLearnTab') || 'fundamentals');
})();

