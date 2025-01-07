"use server";
import dbConnect from "@/lib/dbConn"; // Database connection
import Contact from "@/app/modals/Contact"; // Contact model

// Create a new contact
export const createContact = async (contactData) => {
  try {
    // Validate input data
    if (!contactData.userId || !contactData.name || !contactData.phone) {
      throw new Error("Invalid input data");
    }

    await dbConnect();

    // Check if a contact with the same phone number already exists
    const existingContact = await Contact.findOne({ phone: contactData.phone });
    if (existingContact) {
      throw new Error(
        `A contact with the phone number ${contactData.phone} already exists.`
      );
    }

    const newContact = new Contact(contactData);
    console.log("New Contact:", newContact);
    const savedContact = await newContact.save();

    // Convert the saved contact to a plain JavaScript object
    return savedContact.toJSON();
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error(error.message || "Could not create contact");
  }
};

// Fetch all contacts for a specific user
export const fetchContactsByUser = async (userId) => {
  try {
    await dbConnect();
    const contacts = await Contact.find({ userId }).populate("groupId").lean();

    if (!contacts.length) {
      throw new Error(`No contacts found for user ID ${userId}`);
    }

    return contacts; // No need to call .toJSON() on lean() results
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error(error.message || "Could not fetch contacts");
  }
};

// Fetch a single contact by ID
export const fetchContactById = async (contactId) => {
  try {
    await dbConnect();
    const contact = await Contact.findById(contactId)
      .populate("groupId userId")
      .lean();
    if (!contact) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }
    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw new Error(error.message || "Could not fetch contact");
  }
};

// Update a contact
export const updateContact = async (contactId, contactData) => {
  try {
    await dbConnect();
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      contactData,
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }
    return updatedContact.toJSON();
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error(error.message || "Could not update contact");
  }
};

// Delete a contact
export const deleteContact = async (contactId) => {
  try {
    await dbConnect();
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      throw new Error(`Contact with ID ${contactId} not found`);
    }

    return { message: "Contact deleted successfully", contact: deletedContact };
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error(error.message || "Could not delete contact");
  }
};

// Fetch contacts by group
export const fetchContactsByGroup = async (groupId) => {
  try {
    await dbConnect();
    const contacts = await Contact.find({ groupId }).populate("userId");
    if (!contacts.length) {
      throw new Error(`No contacts found for group ID ${groupId}`);
    }
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts by group:", error);
    throw new Error(error.message || "Could not fetch contacts");
  }
};
