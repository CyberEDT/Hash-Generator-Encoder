export const knowledgeBase = {
  "MD5": {
    definition: "MD5 (Message Digest Algorithm 5) is a cryptographic hash function that produces a 128-bit hash value.",
    keyFacts: [
      "Output Size: 128-bit",
      "Hex Length: 32 Characters",
      "Created By: Ronald Rivest",
      "Released: 1991"
    ],
    securityStatus: "Broken / Not Secure",
    commonUses: [
      "File checksums",
      "Duplicate file detection",
      "Legacy systems"
    ],
    weaknesses: [
      "Collision attacks",
      "Chosen-prefix collisions",
      "Not suitable for passwords",
      "Not suitable for digital signatures"
    ],
    recommendedAlternatives: ["SHA-256", "SHA-512", "SHA3-256"]
  },
  "SHA-1": {
    definition: "SHA-1 is a cryptographic hash function developed by the NSA and standardized by NIST.",
    keyFacts: [
      "Output Size: 160-bit",
      "Hex Length: 40 Characters",
      "Released: 1995"
    ],
    securityStatus: "Deprecated / Cryptographically Broken",
    commonUses: [
      "Legacy Git repositories",
      "Legacy SSL certificates",
      "Software signing"
    ],
    weaknesses: [
      "Collision attacks",
      "SHAttered attack demonstrated practical collisions"
    ],
    recommendedAlternatives: ["SHA-256", "SHA-512", "SHA3-256"]
  },
  "SHA-256": {
    definition: "SHA-256 is a member of the SHA-2 family that generates a 256-bit hash value.",
    keyFacts: [
      "Output Size: 256-bit",
      "Hex Length: 64 Characters",
      "Family: SHA-2"
    ],
    securityStatus: "Secure / Industry Standard",
    commonUses: [
      "HTTPS/TLS",
      "Bitcoin",
      "Blockchain systems",
      "Malware analysis",
      "File integrity verification",
      "Digital certificates"
    ],
    advantages: [
      "No practical collision attacks",
      "Widely trusted",
      "Fast and efficient"
    ],
    recommendedFor: [
      "File hashing",
      "Security applications",
      "Integrity verification"
    ]
  },
  "SHA-512": {
    definition: "SHA-512 is a SHA-2 family cryptographic hash function producing a 512-bit output.",
    keyFacts: [
      "Output Size: 512-bit",
      "Hex Length: 128 Characters"
    ],
    securityStatus: "Secure",
    commonUses: [
      "Government systems",
      "Enterprise security",
      "Long-term archival verification",
      "High-security environments"
    ],
    advantages: [
      "Extremely strong security",
      "Resistant to known attacks",
      "Suitable for long-term integrity"
    ],
    disadvantages: [
      "Larger storage requirements",
      "Longer hash values"
    ]
  },
  "SHA3-256": {
    definition: "SHA3-256 is a cryptographic hash function based on the Keccak algorithm.",
    keyFacts: [
      "Output Size: 256-bit",
      "Family: SHA-3",
      "Based On: Keccak"
    ],
    securityStatus: "Secure",
    advantages: [
      "Modern design",
      "Different architecture from SHA-2",
      "Resistant to future attack techniques"
    ],
    commonUses: [
      "Government systems",
      "Blockchain applications",
      "Advanced security products",
      "Research environments"
    ],
    differences: [
      "SHA-256 uses Merkle-Damgård construction",
      "SHA3-256 uses Sponge construction"
    ]
  },
  "SHA3-512": {
    definition: "SHA3-512 is a cryptographic hash function based on the Keccak algorithm, producing a 512-bit output.",
    keyFacts: [
      "Output Size: 512-bit",
      "Family: SHA-3",
      "Based On: Keccak"
    ],
    securityStatus: "Secure",
    advantages: [
      "Extremely high security",
      "Resistant to future attack techniques, including quantum attacks",
      "Different architecture from SHA-2"
    ],
    commonUses: [
      "Military and Government systems",
      "Next-generation cryptographic systems",
      "Highest security environments"
    ]
  },
  "Base64": {
    definition: "Base64 is an encoding scheme that converts binary data into text.",
    keyFacts: [
      "Character Set: 64 characters",
      "Padding: Often uses '='",
      "Purpose: Data transmission"
    ],
    securityStatus: "Not Security (Encoding Only)",
    commonUses: [
      "Email attachments (MIME)",
      "Embedding images in HTML/CSS",
      "Basic HTTP Authentication"
    ],
    commonMisconception: "Base64 does not protect data and should never be used for security purposes."
  },
  "Hex": {
    definition: "Hexadecimal encoding represents binary data using 16 symbols (0-9, A-F).",
    keyFacts: [
      "Base: 16",
      "Size: 2 hex characters = 1 byte",
      "Purpose: Human-readable binary"
    ],
    securityStatus: "Not Security (Encoding Only)",
    commonUses: [
      "Displaying cryptographic hashes",
      "Memory dumps",
      "Color codes in CSS"
    ],
    commonMisconception: "Hex is a numeral system, not an encryption method."
  },
  "URL": {
    definition: "URL Encoding (Percent-encoding) safely encodes characters for use in web addresses.",
    keyFacts: [
      "Format: % followed by hex value",
      "Spaces: Encoded as %20 or +",
      "Purpose: Safe HTTP transmission"
    ],
    securityStatus: "Not Security (Encoding Only)",
    commonUses: [
      "Query strings in URLs",
      "Form data submission (application/x-www-form-urlencoded)",
      "API requests"
    ],
    commonMisconception: "URL encoding just escapes reserved characters, it provides no confidentiality."
  }
};
