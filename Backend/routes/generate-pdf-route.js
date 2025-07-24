const express = require('express');
const router = express.Router();
const { generatePdfController } = require('../controller/generate-pdf-controller');

router.post('/generate-high-quality-pdf', generatePdfController);

module.exports = router;
