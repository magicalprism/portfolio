const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const PAGES_DIR = path.join(__dirname, 'views', 'pages', 'partials');
const OUTPUT_DIR = path.join(__dirname, 'public');

// Ensure the output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Clean up only .html files in the public directory
fs.readdirSync(OUTPUT_DIR).forEach(file => {
    if (file.endsWith('.html')) {
        fs.unlinkSync(path.join(OUTPUT_DIR, file));
    }
});

// Compile each .ejs file in views/pages/
fs.readdirSync(PAGES_DIR).forEach(file => {
    if (file.endsWith('.ejs')) {
        const inputFile = path.join(PAGES_DIR, file);
        const outputFile = path.join(OUTPUT_DIR, file.replace('.ejs', '.html'));

        try {
            console.log(`Compiling ${inputFile} -> ${outputFile}`);
            
            // Capture output of npx ejs and write to the file
            const compiledHTML = execSync(
                `npx ejs "${inputFile}" --rmWhitespace`,
                { encoding: 'utf-8' } // Ensure output is captured as a string
            );
            fs.writeFileSync(outputFile, compiledHTML);
            console.log(`Successfully wrote to ${outputFile}`);
        } catch (err) {
            console.error(`Error compiling ${file}:`, err.message);
        }
    }
});

console.log('Build complete!');
