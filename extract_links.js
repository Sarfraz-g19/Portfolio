const fs = require('fs');
// Try to read the file from public folder
const content = fs.readFileSync('public/Mohammad_Sarfraj_Shah_Resume.pdf');
let strings = '';
let current = '';
for (let i = 0; i < content.length; i++) {
    const charCode = content[i];
    if (charCode >= 32 && charCode <= 126) {
        current += String.fromCharCode(charCode);
    } else if (current.length >= 4) {
        // Simple filter to keep things that look like URLs or useful text
        if (current.includes('http') || current.includes('www') || current.includes('.com') || current.includes('.app') || current.includes('vercel') || current.includes('netlify')) {
            strings += current + '\n';
        }
        current = '';
    } else {
        current = '';
    }
}
fs.writeFileSync('resume_links.txt', strings);
console.log('Links extracted to resume_links.txt');
