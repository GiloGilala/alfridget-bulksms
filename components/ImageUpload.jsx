"use client";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { updateProfileImage } from "@/actions/user";
import { CldUploadWidget, CldDeleteByPublicId } from "next-cloudinary";

export default function ImageUpload({ user }) {
  const { reset } = useForm();
  const placeholderImage = "/user1.png"; // Ensure this path exists
  const [resource, setResource] = useState(null); // Initialize as null
  const [imagePreview, setImagePreview] = useState(
    placeholderImage
  );
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    if (!resource?.secure_url) {
      toast.error("Upload failed. Please try again.");
      return;
    }

    const imageUrl = resource.secure_url;
    const userId = user._id;

    setIsUploading(true);
    try {
      await updateProfileImage(userId, imageUrl);
      setImagePreview(imageUrl); // Update the image preview
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error updating profile image:", error.message);
      toast.error("An error occurred while saving the image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = async () => {
    // if (resource?.public_id) {
    //   // Delete the uploaded image from Cloudinary
    //   try {
    //     await CldDeleteByPublicId(resource.public_id);
    //     console.log("Image deleted from Cloudinary.");
    //   } catch (error) {
    //     console.error("Error deleting image from Cloudinary:", error.message);
    //     toast.error("Failed to delete the uploaded image.");
    //   }
    // }

    // Reset form state
    reset();
    setImagePreview(placeholderImage);
    setResource(null); // Clear the resource state
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Upload Your Profile Picture
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Choose a high-quality image in JPG or PNG format.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        {/* Image Preview */}
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src={user?.profileImage  || "/user1.png"}
            alt="Profile Preview"
            fill
            className="object-cover"
          />
        </div>

        {/* Cloudinary Upload Widget */}
        <CldUploadWidget
          uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
          cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
          onSuccess={(result, widget) => {
            if (result?.info?.secure_url && result.info.public_id) {
              setResource(result.info); // Set the resource object
              setImagePreview(result.info.secure_url); // Update preview immediately
            } else {
              toast.error("Upload failed. No secure URL found.");
            }
            widget.close(); // Close the widget after upload
          }}
        >
          {({ open }) => {
            const handleOnClick = () => {
              if (typeof open === "function") {
                open();
              } else {
                console.error("Open function is not available.");
                toast.error("Failed to open upload widget.");
              }
            };

            return (
              <Button
                type="button"
                variant="outline"
                onClick={handleOnClick}
                disabled={isUploading}
                aria-label="Upload Profile Image"
                className="w-full"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Image"
                )}
              </Button>
            );
          }}
        </CldUploadWidget>
      </CardContent>
      <CardFooter className="flex justify-between space-x-2">
        {/* Save Button */}
        <Button
          type="button"
          onClick={handleUpload}
          disabled={!resource?.secure_url  || isUploading}
          aria-label="Save Uploaded Image"
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>

        {/* Cancel Button */}
        <Button
          type="button"
          variant="outline"
          onClick={handleReset}
          disabled={ isUploading}
          aria-label="Cancel Upload"
          className="w-full"
        >
          Cancel
        </Button>
      </CardFooter>
    </Card>
  );
}