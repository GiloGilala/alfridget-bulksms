"use client";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/ContactForm";
import UserForm from "@/components/user/UserForm";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { fetchUserById, updateUser } from "@/actions/user";
import toast from "react-hot-toast";
import PasswordUpdateForm from "@/components/user/PasswordUpdateForm";

export default function AddUser() {
  const { data: session } = useSession();
  const { id, slug } = useParams();
  const [user, setUser] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    console.log("Updated handleSubmit:", data);
    try {
      if (user?._id) {
        const res = await updateUser(user._id, data);
        console.log("Updated user:", res);
        if (res.successful) {
          toast.success(res.message);
        }
        console.log("User updated:", res);
      } else {
        const res = await createUser(data);

        if (res.successful) {
          toast.success(res.message);
        }
        console.log("User created:", res);
      }

      router.push("/adminUsers/users");
    } catch (error) {
      // console.error("Error:", error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmitPassword = async (data) => {
    setIsSubmitting(true);

    try {
      const res = await updateUserPassword(user._id, data);
      console.log("Updated user:", res);
      if (res.successful) {
        toast.success(res.message);
      }
      console.log("User updated:", res);

      router.push("/login");
    } catch (error) {
      // console.error("Error:", error.message);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" relative">
      <PageHeader
        heading="User Profile"
        className=""
        // description={
        //   "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own"
        // }
      ></PageHeader>
      <section className="space-y-6">
        <div>
          {/* <h1>Create/Update Group</h1> */}
          <UserForm
            user={user}
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            handleSubmit={handleSubmit}
          />
          <PasswordUpdateForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            handleSubmit={handleSubmitPassword}
          />
        </div>
      </section>
    </div>
  );
}
