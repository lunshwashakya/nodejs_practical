import { parse } from 'node-html-parser';
import fs from 'fs';

const baseUrl = "https://www.seek.com.au/barber-jobs/in-Darwin-NT-0800?page=";

async function writeToFile(data) {
    console.log('Writing data to file...');
    fs.writeFileSync('tmp.html', data);
    console.log('Done');
}

function writeDataToCSV(data) {
    let csvData = 'Job Title, Company, Job Details\n';
    data.forEach(item => {
        csvData += `${item.jobTitle},${item.company},${item.details}\n`;
    });
    console.log('Writing data to CSV...');
    fs.writeFileSync('jobs.csv', csvData);
    console.log('Done');
}

async function getAllPages() {
    let allJobListings = [];
    let page = 1;

    while (true) {
        const url = `${baseUrl}${page}`;
        console.log(`Fetching data from: ${url}`);
        
        const response = await fetch(url);
        const htmlBody = await response.text();
        const document = parse(htmlBody);

        const list = document.querySelectorAll(".gepq850.eihuid5b.eihuidhf.eihuid6v");
        console.log(`Items found on page ${page}:`, list.length);


        if (list.length === 0) {
            console.log('No more job listings found. Stopping.');
            break;
        }

        let jobListingArray = list.map(item => {
            let jobTitle = item.querySelector("[data-testid='job-card-title']");
            let company = item.querySelector("a[data-type='company']");
            let details = item.querySelector("[data-testid='job-card-teaser']");

            return {
                jobTitle: jobTitle?.text.trim(),
                company: company?.text.trim(),
                details: details?.text.trim()
            };
        });

        let filteredJobListing = jobListingArray.filter(job => job.jobTitle && job.company && job.details);
        allJobListings = allJobListings.concat(filteredJobListing);

        page++;
    }

    writeDataToCSV(allJobListings);
}

getAllPages();
