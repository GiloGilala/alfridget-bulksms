import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import Client from "@/models/Client";
import { auth } from "next-auth"; // Ensure to import auth

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};
// POST /api/clients
export const POST = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const {
      userId,
      ProviderId,
      companyName,
      companyCategory,
      companySubcategory,
      email,
      emailAlt,
      phone,
      phoneAlt,
      website,
      county,
      state,
      StreetName,
      Credits,
      companyBranch,
      Status,
      services,
      comments,
      createdBy,
    } = await request.json();

    // Validate required fields
    if (
      !companyName ||
      !companyCategory ||
      !county ||
      !state ||
      !Credits ||
      !createdBy
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Create a new client
    const newClient = new Client({
      userId,
      ProviderId,
      companyName,
      companyCategory,
      companySubcategory,
      email,
      emailAlt,
      phone,
      phoneAlt,
      website,
      county,
      state,
      StreetName,
      Credits,
      companyBranch,
      Status,
      services,
      comments,
      createdBy,
    });

    const savedClient = await newClient.save();

    return NextResponse.json(
      { message: "Client created successfully", client: savedClient },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/clients
export const GET = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const clients = await Client.find();
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    console.error("Error fetching clients:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/clients/:id
export const GET_BY_ID = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const client = await Client.findById(id);
    if (!client) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(client, { status: 200 });
  } catch (error) {
    console.error("Error fetching client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT /api/clients/:id
export const PUT = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const {
      companyName,
      companyCategory,
      companySubcategory,
      email,
      emailAlt,
      phone,
      phoneAlt,
      website,
      county,
      state,
      StreetName,
      Credits,
      companyBranch,
      Status,
      services,
      comments,
      createdBy,
    } = await request.json();

    const updatedClient = await Client.findByIdAndUpdate(
      id,
      {
        companyName,
        companyCategory,
        companySubcategory,
        email,
        emailAlt,
        phone,
        phoneAlt,
        website,
        county,
        state,
        StreetName,
        Credits,
        companyBranch,
        Status,
        services,
        comments,
        createdBy,
      },
      { new: true, runValidators: true }
    );

    if (!updatedClient) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Client updated successfully", client: updatedClient },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE /api/clients/:id
export const DELETE = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return NextResponse.json(
        { message: "Client not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Client deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting client:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
