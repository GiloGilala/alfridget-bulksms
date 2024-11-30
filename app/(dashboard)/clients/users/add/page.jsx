"use client";
import { PageHeader } from "@/components/ui/page-header";
import ContactForm from "@/components/contact/ContactForm";
import UserForm from "@/components/user/UserForm";

export default function AddUser() {
  const handleSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className=" relative">
      <PageHeader
        heading="Add User"
        className=""
        // description={
        //   "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own"
        // }
      ></PageHeader>
      <section className="space-y-6">
        <div>
          <h1>Create/Update Group</h1>
          <UserForm />
        </div>
      </section>
    </div>
  );
}
