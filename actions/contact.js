import dbConnect from "@/lib/dbConn"; // Database connection
import Contact from "@/app/modals/Contact"; // Contact model

// Create a new contact
export const createContact = async (contactData) => {
  try {
    await dbConnect();
    const newContact = new Contact(contactData);
    const savedContact = await newContact.save();
    return savedContact;
  } catch (error) {
    console.error("Error creating contact:", error);
    throw new Error("Could not create contact");
  }
};

// Fetch all contacts for a specific user
export const fetchContactsByUser = async (userId) => {
  try {
    await dbConnect();
    const contacts = await Contact.find({ userId }).populate("groupId");
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts:", error);
    throw new Error("Could not fetch contacts");
  }
};

// Fetch a single contact by ID
export const fetchContactById = async (contactId) => {
  try {
    await dbConnect();
    const contact = await Contact.findById(contactId).populate(
      "groupId userId"
    );
    if (!contact) {
      throw new Error("Contact not found");
    }
    return contact;
  } catch (error) {
    console.error("Error fetching contact by ID:", error);
    throw new Error("Could not fetch contact");
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
      throw new Error("Contact not found");
    }
    return updatedContact;
  } catch (error) {
    console.error("Error updating contact:", error);
    throw new Error("Could not update contact");
  }
};

// Delete a contact
export const deleteContact = async (contactId) => {
  try {
    await dbConnect();
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      throw new Error("Contact not found");
    }
    return deletedContact;
  } catch (error) {
    console.error("Error deleting contact:", error);
    throw new Error("Could not delete contact");
  }
};

// Fetch contacts by group
export const fetchContactsByGroup = async (groupId) => {
  try {
    await dbConnect();
    const contacts = await Contact.find({ groupId }).populate("userId");
    return contacts;
  } catch (error) {
    console.error("Error fetching contacts by group:", error);
    throw new Error("Could not fetch contacts");
  }
};
