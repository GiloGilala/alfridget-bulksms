import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import ProviderConfig from "@/models/ProviderConfig";
import { auth } from "next-auth"; // Ensure to import auth

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};
// POST /api/provider-configs
export const POST = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const {
      userId,
      providerName,
      hostName,
      port,
      credits,
      providerType,
      providerConfig,
      providerUsername,
      providerPassword,
      apiKey,
      description,
    } = await request.json();

    // Validate required fields
    if (
      !providerName ||
      !hostName ||
      !port ||
      !credits ||
      !providerType ||
      !providerConfig ||
      !providerUsername ||
      !providerPassword ||
      !apiKey
    ) {
      return NextResponse.json(
        { message: "All required fields must be filled" },
        { status: 400 }
      );
    }

    // Create a new provider config
    const newProviderConfig = new ProviderConfig({
      userId,
      providerName,
      hostName,
      port,
      credits,
      providerType,
      providerConfig,
      providerUsername,
      providerPassword,
      apiKey,
      description,
    });

    const savedProviderConfig = await newProviderConfig.save();

    return NextResponse.json(
      {
        message: "Provider config created successfully",
        providerConfig: savedProviderConfig,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating provider config:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/provider-configs
export const GET = async (request) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  await dbConnect();

  try {
    const providerConfigs = await ProviderConfig.find();
    return NextResponse.json(providerConfigs, { status: 200 });
  } catch (error) {
    console.error("Error fetching provider configs:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/provider-configs/:id
export const GET_BY_ID = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const providerConfig = await ProviderConfig.findById(id);
    if (!providerConfig) {
      return NextResponse.json(
        { message: "Provider config not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(providerConfig, { status: 200 });
  } catch (error) {
    console.error("Error fetching provider config:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT /api/provider-configs/:id
export const PUT = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const {
      providerName,
      hostName,
      port,
      credits,
      providerType,
      providerConfig,
      providerUsername,
      providerPassword,
      apiKey,
      description,
    } = await request.json();

    const updatedProviderConfig = await ProviderConfig.findByIdAndUpdate(
      id,
      {
        providerName,
        hostName,
        port,
        credits,
        providerType,
        providerConfig,
        providerUsername,
        providerPassword,
        apiKey,
        description,
      },
      { new: true, runValidators: true }
    );

    if (!updatedProviderConfig) {
      return NextResponse.json(
        { message: "Provider config not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Provider config updated successfully",
        providerConfig: updatedProviderConfig,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating provider config:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE /api/provider-configs/:id
export const DELETE = async (request, { params }) => {
  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  const { id } = params;

  await dbConnect();

  try {
    const deletedProviderConfig = await ProviderConfig.findByIdAndDelete(id);
    if (!deletedProviderConfig) {
      return NextResponse.json(
        { message: "Provider config not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Provider config deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting provider config:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
