import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import Group from "@/models/Group";
import { auth } from "next-auth"; // Ensure to import auth

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};

// POST /api/groups
export const POST = async (request) => {
  await dbConnect();

  const session = await auth(request);
  if (!isAuthorized(session.user, ["admin", "superAdmin"])) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { userId, groupName, description, contactIds } = await request.json();

    // Validate required fields
    if (!userId || !groupName) {
      return NextResponse.json(
        { message: "User ID and group name are required" },
        { status: 400 }
      );
    }

    const newGroup = new Group({ userId, groupName, description, contactIds });
    const savedGroup = await newGroup.save();

    return NextResponse.json(
      { message: "Group created successfully", group: savedGroup },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/groups
export const GET = async (request) => {
  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const groups = await Group.find().populate("userId contactIds");
    return NextResponse.json(groups, { status: 200 });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/groups/:id
export const GET_BY_ID = async (request, { params }) => {
  const { id } = params; // Get the id from the params

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const group = await Group.findById(id).populate("userId contactIds");
    if (!group) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }
    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT /api/groups/:id
export const PUT = async (request, { params }) => {
  const { id } = params; // Get the id from the params

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { groupName, description, contactIds } = await request.json();

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { groupName, description, contactIds },
      { new: true, runValidators: true }
    );

    if (!updatedGroup) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Group updated successfully", group: updatedGroup },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating group:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE /api/groups/:id
export const DELETE = async (request, { params }) => {
  const { id } = params; // Get the id from the params

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const deletedGroup = await Group.findByIdAndDelete(id);
    if (!deletedGroup) {
      return NextResponse.json({ message: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Group deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting group:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
