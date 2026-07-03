/**
 * Script to generate professional pattern images as SVG files
 * These can then be converted to WebP format
 */

const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '../public/images/patterns');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const patterns = {
  'pattern-1': {
    name: 'Repeating Shape Pattern',
    width: 800,
    height: 300,
    svg: `
      <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1D4ED8;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#EF4444;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#B91C1C;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#047857;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="300" fill="#F8FAFC"/>

        <!-- Circle (Blue) -->
        <circle cx="100" cy="150" r="40" fill="url(#grad1)" filter="url(#shadow)"/>

        <!-- Square (Red) -->
        <rect x="210" y="110" width="80" height="80" fill="url(#grad2)" filter="url(#shadow)"/>

        <!-- Triangle (Green) -->
        <polygon points="390,110 430,190 350,190" fill="url(#grad3)" filter="url(#shadow)"/>

        <!-- Circle (Blue) -->
        <circle cx="520" cy="150" r="40" fill="url(#grad1)" filter="url(#shadow)"/>

        <!-- Square (Red) -->
        <rect x="610" y="110" width="80" height="80" fill="url(#grad2)" filter="url(#shadow)"/>

        <!-- Question Mark -->
        <text x="750" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="60" font-weight="bold" fill="#6B7280">?</text>
      </svg>
    `
  },

  'pattern-2': {
    name: 'Increasing Sides Pattern',
    width: 800,
    height: 300,
    svg: `
      <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="purple-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#A855F7;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#7C3AED;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow2" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2" result="offsetblur"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="300" fill="#F8FAFC"/>

        <!-- Triangle (3 sides) -->
        <polygon points="80,110 120,190 40,190" fill="url(#purple-grad)" filter="url(#shadow2)"/>
        <text x="75" y="230" font-family="system-ui" font-size="14" font-weight="600" fill="#6B7280" text-anchor="middle">3</text>

        <!-- Square (4 sides) -->
        <rect x="180" y="110" width="80" height="80" fill="url(#purple-grad)" filter="url(#shadow2)"/>
        <text x="220" y="230" font-family="system-ui" font-size="14" font-weight="600" fill="#6B7280" text-anchor="middle">4</text>

        <!-- Pentagon (5 sides) -->
        <polygon points="360,110 395,140 380,185 320,185 305,140" fill="url(#purple-grad)" filter="url(#shadow2)"/>
        <text x="350" y="230" font-family="system-ui" font-size="14" font-weight="600" fill="#6B7280" text-anchor="middle">5</text>

        <!-- Hexagon (6 sides) -->
        <polygon points="480,110 530,130 530,170 480,190 430,170 430,130" fill="url(#purple-grad)" filter="url(#shadow2)"/>
        <text x="480" y="230" font-family="system-ui" font-size="14" font-weight="600" fill="#6B7280" text-anchor="middle">6</text>

        <!-- Question Mark -->
        <text x="650" y="170" font-family="system-ui, -apple-system, sans-serif" font-size="60" font-weight="bold" fill="#6B7280">?</text>
      </svg>
    `
  },

  'pattern-3': {
    name: 'Rotation Pattern',
    width: 800,
    height: 300,
    svg: `
      <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="orange-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#F97316;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#EA580C;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow3">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="300" fill="#F8FAFC"/>

        <!-- Up Arrow -->
        <g transform="translate(80, 150)" filter="url(#shadow3)">
          <polygon points="0,-40 20,-10 10,-10 10,40 -10,40 -10,-10 -20,-10" fill="url(#orange-grad)"/>
        </g>

        <!-- Right Arrow -->
        <g transform="translate(230, 150) rotate(90)" filter="url(#shadow3)">
          <polygon points="0,-40 20,-10 10,-10 10,40 -10,40 -10,-10 -20,-10" fill="url(#orange-grad)"/>
        </g>

        <!-- Down Arrow -->
        <g transform="translate(380, 150) rotate(180)" filter="url(#shadow3)">
          <polygon points="0,-40 20,-10 10,-10 10,40 -10,40 -10,-10 -20,-10" fill="url(#orange-grad)"/>
        </g>

        <!-- Left Arrow -->
        <g transform="translate(530, 150) rotate(270)" filter="url(#shadow3)">
          <polygon points="0,-40 20,-10 10,-10 10,40 -10,40 -10,-10 -20,-10" fill="url(#orange-grad)"/>
        </g>

        <!-- Question Mark -->
        <text x="680" y="170" font-family="system-ui" font-size="60" font-weight="bold" fill="#6B7280">?</text>
      </svg>
    `
  },

  'pattern-4': {
    name: 'Doubling Pattern',
    width: 800,
    height: 300,
    svg: `
      <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#06B6D4;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#0891B2;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow4">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feOffset dx="0" dy="1"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="300" fill="#F8FAFC"/>

        <!-- 1 dot -->
        <circle cx="80" cy="150" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>

        <!-- 2 dots -->
        <circle cx="205" cy="150" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="245" cy="150" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>

        <!-- 4 dots -->
        <circle cx="340" cy="135" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="380" cy="135" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="340" cy="165" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="380" cy="165" r="15" fill="url(#cyan-grad)" filter="url(#shadow4)"/>

        <!-- 8 dots -->
        <circle cx="475" cy="130" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="510" cy="130" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="545" cy="130" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="580" cy="130" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="475" cy="170" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="510" cy="170" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="545" cy="170" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>
        <circle cx="580" cy="170" r="12" fill="url(#cyan-grad)" filter="url(#shadow4)"/>

        <!-- Question Mark -->
        <text x="700" y="170" font-family="system-ui" font-size="60" font-weight="bold" fill="#6B7280">?</text>
      </svg>
    `
  },

  'pattern-5': {
    name: 'Fill & Size Pattern',
    width: 800,
    height: 300,
    svg: `
      <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="pink-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#EC4899;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#DB2777;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow5">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="300" fill="#F8FAFC"/>

        <!-- Small Filled -->
        <circle cx="80" cy="150" r="25" fill="url(#pink-grad)" filter="url(#shadow5)"/>

        <!-- Medium Outline -->
        <circle cx="230" cy="150" r="35" fill="none" stroke="url(#pink-grad)" stroke-width="4" filter="url(#shadow5)"/>

        <!-- Large Filled -->
        <circle cx="400" cy="150" r="45" fill="url(#pink-grad)" filter="url(#shadow5)"/>

        <!-- Question Mark -->
        <text x="600" y="170" font-family="system-ui" font-size="60" font-weight="bold" fill="#6B7280">?</text>
      </svg>
    `
  },

  'pattern-6': {
    name: 'Color Spectrum Pattern',
    width: 800,
    height: 300,
    svg: `
      <svg width="800" height="300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="shadow6">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
            <feOffset dx="0" dy="2"/>
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3"/>
            </feComponentTransfer>
            <feMerge>
              <feMergeNode/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <rect width="800" height="300" fill="#F8FAFC"/>

        <!-- Red -->
        <circle cx="80" cy="150" r="35" fill="#EF4444" filter="url(#shadow6)"/>

        <!-- Orange -->
        <circle cx="200" cy="150" r="35" fill="#F97316" filter="url(#shadow6)"/>

        <!-- Yellow -->
        <circle cx="320" cy="150" r="35" fill="#EAB308" filter="url(#shadow6)"/>

        <!-- Green -->
        <circle cx="440" cy="150" r="35" fill="#10B981" filter="url(#shadow6)"/>

        <!-- Blue -->
        <circle cx="560" cy="150" r="35" fill="#3B82F6" filter="url(#shadow6)"/>

        <!-- Question Mark -->
        <text x="700" y="170" font-family="system-ui" font-size="60" font-weight="bold" fill="#6B7280">?</text>
      </svg>
    `
  }
};

// Generate SVG files
Object.entries(patterns).forEach(([filename, pattern]) => {
  const svgPath = path.join(outputDir, `${filename}.svg`);
  fs.writeFileSync(svgPath, pattern.svg.trim());
  console.log(`✓ Generated ${filename}.svg`);
});

console.log('\n✅ All pattern images generated successfully!');
console.log('📁 Location:', outputDir);
console.log('\n💡 To convert to WebP format, you can use:');
console.log('   - Online tools: cloudconvert.com, convertio.co');
console.log('   - Command line: cwebp (from Google WebP tools)');
console.log('   - Or use Next.js Image optimization which handles it automatically');
