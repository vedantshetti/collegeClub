const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET, 
});

// Configure Multer Storage
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'collegeclub_DEV', // Folder in Cloudinary where files will be stored
        allowed_formats: ["png", "jpg", "jpeg", "pdf", "doc", "docx", "zip"], // Allowed formats
        resource_type: "auto", // Automatically detect and handle different file types
    },
});

module.exports = {
    cloudinary,
    storage
};
