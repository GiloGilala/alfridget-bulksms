"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { Separator } from "@/components/ui/separator";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ImageUpload({
  user,
  isSubmitting,
  onSubmit,
  uploadedImage,
  setUploadedImage,
}) {
  const { handleSubmit, reset, register } = useForm();
  const placeholderImage = "/user1.png"; // Add your placeholder image path here
  const [imagePreview, setImagePreview] = useState(
    uploadedImage || user?.profileImage || placeholderImage
  );

  const handleImageSubmit = async (data) => {
    const file = data.file[0]; // Access the file from the form data
    if (!file) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_upload_preset"); // Replace with your Cloudinary or API-specific preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Image upload failed. Please try again.");
      }

      const result = await response.json();
      const imageUrl = result.secure_url;

      setUploadedImage(imageUrl);
      onSubmit({ profileImage: imageUrl });

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(
        error.message || "An error occurred while uploading the image."
      );
    } finally {
      reset();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Set preview URL for the image
      setUploadedImage(file); // Update the uploadedImage state for upload submission
    }
  };

  const handleReset = () => {
    reset();
    setImagePreview(placeholderImage); // Reset to placeholder image
    // Clear the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Image Upload</CardTitle>
        <CardDescription className="text-muted-foreground">
          Upload an image in formats like JPG or PNG.
        </CardDescription>
        <Separator className="my-4" />
      </CardHeader>
      <form onSubmit={handleSubmit(handleImageSubmit)} className="space-y-4">
        <CardContent className="grid grid-cols-4 gap-6">
          <div>
            <Image
              src={imagePreview || placeholderImage}
              alt="Profile Preview"
              width={100}
              height={100}
              className="mb-4 rounded-md"
            />
            <Input
              type="file"
              accept="image/*"
              className="mt-2"
              {...register("file")} // Register the file input
              onChange={handleFileChange}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button className="w-32" type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : user?._id ? (
              "Update Upload"
            ) : (
              "Upload"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
