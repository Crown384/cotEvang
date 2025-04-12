const express = require('express');
const cors = require('cors');
const cloudinary = require('cloudinary').v2;

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
