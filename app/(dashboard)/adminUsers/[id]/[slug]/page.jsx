"use client";
import { PageHeader } from "@/components/ui/page-header";
import UserForm from "@/components/user/UserForm";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "@/actions/user";
import toast from "react-hot-toast";
import PasswordUpdateForm from "@/components/user/PasswordUpdateForm";
import ImageUpload from "@/components/ImageUpload";

export default function AddUser() {
  const { data: session } = useSession();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        try {
          const res = await fetchUserById(id);
          console.log("User :", res);
          if (res.successful) {
            setUser(res.user);
          }
        } catch (error) {
          console.error("Error fetching User:", error);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      if (user?._id) {
        // Include the uploaded image in the data
        const updatedData = {
          ...data,
          profileImage: uploadedImage || user.profileImage,
        };
        const res = await updateUser(user._id, updatedData);
        console.log("Updated user:", res);
        if (res.successful) {
          toast.success(res.message);
        }
      } else {
        const res = await createUser(data);
        if (res.successful) {
          toast.success(res.message);
        }
      }

      router.push("/adminUsers/users");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSubmit = (data) => {
    setUploadedImage(data.profileImage);
  };

  return (
    <div className="relative">
      <PageHeader heading="User Profile" className="" />
      <section className="space-y-6">
        <ImageUpload
          user={user}
          isSubmitting={isSubmitting}
          onSubmit={handleImageSubmit}
          uploadedImage={uploadedImage}
          setUploadedImage={setUploadedImage}
        />
        <UserForm
          user={user}
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          handleSubmit={handleSubmit}
        />
        <PasswordUpdateForm
          isSubmitting={isSubmitting}
          setIsSubmitting={setIsSubmitting}
          // handleSubmit={handleSubmitPassword}
        />
      </section>
    </div>
  );
}
