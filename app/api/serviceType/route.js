import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import ServiceType from "@/models/ServiceType";
import { auth } from "next-auth"; // Ensure to import auth

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};

// POST /api/service-types
export const POST = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const { name, description, type, price } = await request.json();

    // Validate required fields
    if (!name || !type) {
      return NextResponse.json(
        { message: "Name and type are required" },
        { status: 400 }
      );
    }

    // Create a new service type
    const newServiceType = new ServiceType({
      name,
      description,
      type,
      price,
    });

    const savedServiceType = await newServiceType.save();

    return NextResponse.json(
      {
        message: "Service type created successfully",
        serviceType: savedServiceType,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service type:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/service-types
export const GET = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const serviceTypes = await ServiceType.find();
    return NextResponse.json(serviceTypes, { status: 200 });
  } catch (error) {
    console.error("Error fetching service types:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/service-types/:id
export const GET_BY_ID = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const serviceType = await ServiceType.findById(id);
    if (!serviceType) {
      return NextResponse.json(
        { message: "Service type not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(serviceType, { status: 200 });
  } catch (error) {
    console.error("Error fetching service type:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT /api/service-types/:id
export const PUT = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const { name, description, type, price } = await request.json();

    const updatedServiceType = await ServiceType.findByIdAndUpdate(
      id,
      {
        name,
        description,
        type,
        price,
      },
      { new: true, runValidators: true }
    );

    if (!updatedServiceType) {
      return NextResponse.json(
        { message: "Service type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Service type updated successfully",
        serviceType: updatedServiceType,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating service type:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE /api/service-types/:id
export const DELETE = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const deletedServiceType = await ServiceType.findByIdAndDelete(id);
    if (!deletedServiceType) {
      return NextResponse.json(
        { message: "Service type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Service type deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting service type:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
