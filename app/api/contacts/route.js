import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConn";
import Contact from "@/models/Contact";
import { auth } from "next-auth"; // Ensure to import auth

// Function to check if a user has the necessary authorization
const isAuthorized = (user, roles) => {
  return roles.includes(user.role);
};
// POST /api/contacts
export const POST = async (request) => {
  await dbConnect();

  try {
    const {
      userId,
      name,
      phone,
      group,
      email,
      location,
      country,
      state,
      notes,
    } = await request.json();

    // Validate required fields
    if (!userId || !name || !phone) {
      return NextResponse.json(
        { message: "User ID, name, and phone are required" },
        { status: 400 }
      );
    }

    const newContact = new Contact({
      userId,
      name,
      phone,
      group,
      email,
      location,
      country,
      state,
      notes,
    });
    const savedContact = await newContact.save();

    return NextResponse.json(
      { message: "Contact created successfully", contact: savedContact },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating contact:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/contacts
export const GET = async (request) => {
  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const contacts = await Contact.find().populate("userId group");
    return NextResponse.json(contacts, { status: 200 });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// GET /api/contacts/:id
export const GET_BY_ID = async (request, { params }) => {
  const { id } = params;

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const contact = await Contact.findById(id).populate("userId group");
    if (!contact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(contact, { status: 200 });
  } catch (error) {
    console.error("Error fetching contact:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// PUT /api/contacts/:id
export const PUT = async (request, { params }) => {
  const { id } = params;

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { name, phone, group, email, location, country, state, notes } =
      await request.json();

    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, phone, group, email, location, country, state, notes },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact updated successfully", contact: updatedContact },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating contact:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};

// DELETE /api/contacts/:id
export const DELETE = async (request, { params }) => {
  const { id } = params;

  await dbConnect();

  const session = await auth(request);
  if (
    !session ||
    (session.id !== id && !isAuthorized(session.user, ["admin", "superAdmin"]))
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (!deletedContact) {
      return NextResponse.json(
        { message: "Contact not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Contact deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting contact:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
};
