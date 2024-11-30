"use client";

import { useState } from "react";
import { PageHeader } from "@/components/ui/page-header";
import GroupForm from "@/components/groups/GroupForm";
import axios from "axios";
import { toast } from "react-hot-toast";
import { contactsData } from "@/components/tables/data";

export default function AddGroup() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    setLoading(true); // Start loading
    try {
      // const response = await axios.post("/api/groups", data);
      toast.success("Group created successfully!");
      console.log("Response:", data);
      // Optionally: refresh data or update local state
    } catch (error) {
      console.error(error);
      toast.error("Failed to create the group. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative">
      <PageHeader
        heading="Groups"
        description="Create and manage groups here."
      />
      <section className="space-y-6">
        <GroupForm
          handleSubmit={handleSubmit}
          isLoading={loading}
          contacts={contactsData}
        />
      </section>
    </div>
  );
}
