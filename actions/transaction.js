import dbConnect from "@/lib/dbConn";
import Transaction from "@/models/Transaction";

export const createTransaction = async (transactionData) => {
  // Validate input data
  if (
    !transactionData.userId ||
    !transactionData.clientId ||
    !transactionData.type ||
    !transactionData.amount
  ) {
    throw new Error("Invalid input data");
  }
  try {
    await dbConnect();

    // Check if a transaction with the same transactionId already exists
    const existingTransaction = await Transaction.findOne({
      transactionId: transactionData.transactionId,
    });
    if (existingTransaction) {
      throw new Error(
        `A transaction with the ID ${transactionData.transactionId} already exists.`
      );
    }

    // Create and save the new transaction
    const transaction = new Transaction(transactionData);
    const savedTransaction = await transaction.save();

    const data = {
      message: "Transaction created successfully",
      transaction: savedTransaction.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error("Could not create transaction");
  }
};

export const updateTransaction = async (transactionId, transactionData) => {
  try {
    await dbConnect();

    // Check if the transaction exists
    const existingTransaction = await Transaction.findById(transactionId);
    if (!existingTransaction) {
      throw new Error(`Transaction with ID ${transactionId} not found`);
    }

    // Update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      transactionData,
      {
        new: true,
        runValidators: true,
      }
    );

    const data = {
      message: "Transaction updated successfully",
      transaction: updatedTransaction.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw new Error("Could not update transaction");
  }
};

export const getTransaction = async (transactionId) => {
  try {
    await dbConnect();

    // Check if the transaction exists
    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      throw new Error(`Transaction with ID ${transactionId} not found`);
    }

    const data = {
      message: "Transaction fetched successfully",
      transaction: transaction.toJSON(),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw new Error("Could not fetch transaction");
  }
};

export const getTransactions = async () => {
  try {
    await dbConnect();

    const transactions = await Transaction.find();

    const data = {
      message: "Transactions fetched successfully",
      transactions: transactions.map((transaction) => transaction.toJSON()),
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw new Error("Could not fetch transactions");
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
    await dbConnect();

    // Check if the transaction exists
    const transaction = await Transaction.findByIdAndDelete(transactionId);
    if (!transaction) {
      throw new Error(`Transaction with ID ${transactionId} not found`);
    }

    const data = {
      message: "Transaction deleted successfully",
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw new Error("Could not delete transaction");
  }
};
