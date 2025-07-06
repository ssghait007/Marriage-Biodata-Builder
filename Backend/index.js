const express = require('express')
const app = express()
const dotenv = require('dotenv');
// const supabase = require('./config/database');
const port = 4100;
const cors = require('cors');
const saveTemplateRouter = require('./routes/save-template-route');


// load environment variables from.env file
dotenv.config();


// Connect to Supabase
// (async () => {
//   try {
//     const { data, error } = await supabase.from('products').select('*');
//     if (error) throw error;
//     console.log('Successfully connected to Supabase');
//   } catch (error) {
//     console.error('Error connecting to Supabase:', error.message);
//   }
// })();


app.use(cors({
  origin: [
    'http://localhost:4100',  // Local development
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',  // Current frontend port
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
    preflightContinue: false
}));

app.options('*', cors());




// // Middleware
app.use(express.json());

// Routes
app.use('/api', saveTemplateRouter);

// API endpoint to save template files
// app.post('/api/save-template', async (req, res) => {
//   const fs = require('fs').promises;
//   const path = require('path');
  
//   try {
//     const { fileName, content } = req.body;
    
//     if (!fileName || !content) {
//       return res.status(400).json({
//         success: false,
//         message: 'fileName and content are required'
//       });
//     }
    
//     // Define the path to save the template
//     const templatesDir = path.join(__dirname, '../frontend/src/Templates');
//     const filePath = path.join(templatesDir, fileName);
    
//     // Ensure the Templates directory exists
//     try {
//       await fs.access(templatesDir);
//     } catch (error) {
//       await fs.mkdir(templatesDir, { recursive: true });
//     }
    
//     // Write the file
//     await fs.writeFile(filePath, content, 'utf8');
    
//     res.json({
//       success: true,
//       message: `Template ${fileName} saved successfully`,
//       fileName: fileName,
//       path: filePath
//     });
    
//   } catch (error) {
//     console.error('Error saving template:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to save template',
//       error: error.message
//     });
//   }
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
