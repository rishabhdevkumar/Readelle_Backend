const cloudinary = require("../config/cloudinary.config");

const deleteFromCloudinary = async (publicId, resourceType = "image") => {
    if (!publicId) {
        return null;
    }

    return await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
    });
};

module.exports = deleteFromCloudinary;