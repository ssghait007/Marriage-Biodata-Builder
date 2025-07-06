const express = require('express');
const router = express.Router();

const { saveTemplateController } = require('../controller/save-template-controller');

router.post('/save-template', saveTemplateController);

module.exports = router;