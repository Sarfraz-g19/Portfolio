const fs = require('fs');
const pdf = require('pdf-parse');

async function parseResume() {
    try {
        const dataBuffer = fs.readFileSync('../public/Mohammad_Sarfraj_Shah_Resume.pdf');
        const data = await pdf(dataBuffer);
        fs.writeFileSync('../resume_extracted.txt', data.text);
        console.log('Successfully extracted text to resume_extracted.txt');
    } catch (error) {
        console.error('Error parsing PDF:', error);
    }
}

parseResume();
