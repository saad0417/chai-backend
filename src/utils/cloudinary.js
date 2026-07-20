import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs' // file system for file handling.

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try 
    {
        if(!localFilePath) return null

        // upload file on cloudinay...
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" // png, jpg, mp3, mp4 etc...
        })

        // File uploaded successfully...
        console.log("File successfully uploaded on cloudinary", response.url);
        return response    
    } 
    catch (error) 
    {
        // removes the locally saved temporary file as the file operation failed
        fs.unlinkSync(localFilePath)
        return null
    }
}


export {uploadOnCloudinary}