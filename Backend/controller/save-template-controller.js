const saveTemplateModel = require('../model/save-template-model');

const saveTemplateController = async (req, res) => {
    try {
        const { fileName, content } = req.body;
        if(!fileName || !content) {
            return res.status(400).json({
                success: false,
                message: 'fileName and content are required'
            });
        }
        const result = await saveTemplateModel.saveTemplate(fileName, content);
        res.json(result);
    } catch (error) {
        console.error('Error saving template:', error);
        res.status(500).json({ error: 'Error saving template' });
    }
};

module.exports = {
    saveTemplateController
};