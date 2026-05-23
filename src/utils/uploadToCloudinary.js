const cloudinary = require("../config/cloudinary.config");

const uploadToCloudinary = (file, folder, resourceType = "auto") => {
    if (!file) {
        return null;
    }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve(result);
            }
        );

        uploadStream.end(file.buffer);
    });
};

module.exports = uploadToCloudinary;