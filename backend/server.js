const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;
// const webpush = require('web-push');

const app = express();
const PORT = 3000;

// Enable CORS for all origins (or configure if needed)
app.use(cors());

// Configure Cloudinary
cloudinary.config({
    cloud_name: "djsofkqxq",
    api_key: "228657222395921",
    api_secret: "EYje1Lw_BKlq-eHy45cS1RNgkwk"
});

// Endpoint to retrieve Excel files from the 'ExcelFiles' folder
app.get('/excel-files', async (req, res) => {
    try {
        const result = await cloudinary.search
            .expression('resource_type:raw AND folder:EvangApp')
            .max_results(100)
            .execute();

        const excelFiles = result.resources
            .filter(file => file.format === 'xlsx' || file.format === 'xls')
            .map(file => ({
                fileName: file.filename,
                url: file.secure_url
            }));

        res.status(200).json(excelFiles);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch Excel files from Cloudinary' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Set VAPID keys (you generate these once)
const vapidKeys = {
  publicKey: 'BNY1bMZmhx_qZQr5yAayy0gqIMGq1kS6DZBHcFg8PuJYWywt4LxD1ZiHsGak1nBwkyyY-NnLAQFB8IQNOJ00J1E',
  privateKey: 'gf00n0nSUacDf23nfoK6_FUAfSx_JlpI1XxPoJWFCIM'
};

webpush.setVapidDetails(
  'mailto: crownstephen384@gmail.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

