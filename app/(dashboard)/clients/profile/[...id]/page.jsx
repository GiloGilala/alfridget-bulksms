// AddUser.js
"use client";
import { PageHeader } from "@/components/ui/page-header";
import UserForm from "@/components/user/UserForm";
import PasswordUpdateForm from "@/components/user/PasswordUpdateForm";
import ImageUpload from "@/components/ImageUpload";
import useImageUpload from "@/hooks/useImageUpload";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserById, updateUser, createUser } from "@/actions/user";
import toast from "react-hot-toast";
import { Loading1 } from "@/components/loaders";

export default function AddUser() {
  const { data: session } = useSession();
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const paramsId = id[0];

  // Determine if we're editing the current user
  const isEditingSelf = paramsId === "edit";
  const userId = isEditingSelf ? session?.user?.id : paramsId;
  const [loading, setLoading] = useState(false); // Add loading state


  useEffect(() => {
    if (userId) {
      const fetchUser = async () => {
        setLoading(true);
        try {
          const res = await fetchUserById(userId);
          if (res.successful) {
            setUser(res.user);
          }
          setLoading(false);
        } catch (error) {
          console.error("Error fetching User:", error);
          // Consider displaying an error message to the user
        }
        setLoading(false);
      };
      fetchUser();
    }
  }, [userId]);

  // Handle form submission
  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (user?._id) {
        const res = await updateUser(user._id, data);
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

  return (
    <div className="relative">
      {/* <PageHeader heading="User Profile" className="" /> */}
      <section className="space-y-6">
      {loading ? (
        <Loading1 />
      ) : (

        <><ImageUpload
              user={user}
              isSubmitting={isSubmitting} />
              
              <UserForm
                user={user}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                handleSubmit={handleSubmit} />
                
                <PasswordUpdateForm
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting} />
                </>
      )}
      </section>
    </div>
  );
}