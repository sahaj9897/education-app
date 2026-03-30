import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { promises as fs } from "fs";

dotenv.config({});

cloudinary.config({
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

export const uploadMedia = async (file) => {
  try {
    if (!file) {
      throw new Error("File path is missing");
    }

    const uploadResponse = await cloudinary.uploader.upload(file, {
      resource_type: "auto",
    });

    try {
      await fs.unlink(file);
    } catch (err) {
      console.log("Local file delete failed:", err.message);
    }

    return uploadResponse;
  } catch (error) {
    try {
      if (file) {
        await fs.unlink(file);
      }
    } catch (err) {}

    console.log("Cloudinary upload error:", error.message);
    return null;
  }
};

export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });
  } catch (error) {
    console.log("Cloudinary image delete error:", error.message);
  }
};

export const deleteVideoFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });
  } catch (error) {
    console.log("Cloudinary video delete error:", error.message);
  }
};