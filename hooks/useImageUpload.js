// useImageUpload.js
import { useState } from "react";

const useImageUpload = (uploadPreset, cloudName) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        setUploadedImage(imageUrl);
        setIsUploading(false);
        return imageUrl;
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      throw error;
    }
  };

  return { uploadedImage, isUploading, handleUpload };
};

export default useImageUpload;