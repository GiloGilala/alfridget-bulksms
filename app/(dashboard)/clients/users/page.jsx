import DataTable from "@/components/Data-table";
import Container from "@/components/layout/Container";
import React from "react";
import { columns } from "./columns";

const Users = () => {
  const data = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      amount: 100,
      status: "pending",
    },
    {
      id: "2",
      name: "Jane Doe",
      email: "jane.doe@example.com",
      amount: 200,
      status: "success",
    },
    {
      id: "3",
      name: "Bob Smith",
      email: "bob.smith@example.com",
      amount: 50,
      status: "processing",
    },
    {
      id: "4",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      amount: 150,
      status: "failed",
    },
  ];
  return (
    <section className="py-24">
      <h1 className="mb-6 text-3xl font-bold "> All Users</h1>
      <DataTable columns={columns} data={data} />
    </section>
  );
};
export default Users;
