"use server";
import PaymentGateway from "@/app/modals/paymentGateway";
import Transaction from "@/app/modals/Transaction";
import dbConnect from "@/lib/dbConn";

export const createTransaction = async (transactionData) => {
  // Validate input data
  if (
    !transactionData.userId ||
    !transactionData.amount ||
    !transactionData.currency ||
    !transactionData.reference ||
    !transactionData.gateway ||
    !transactionData.type
  ) {
    throw new Error("Missing required fields");
  }

  try {
    await dbConnect();

    // Create initial transaction record
    const transaction = await Transaction.create({
      userId: transactionData.userId,
      type: transactionData.type,
      amount: transactionData.amount,
      currency: transactionData.currency,
      reference: transactionData.reference,
      gateway: transactionData.gateway,
      status: "pending",
    });

    // Create payment gateway record
    await PaymentGateway.create({
      userId: transactionData.userId,
      name: transactionData.gateway,
      transactionId: transaction._id,
      gatewayTransactionId: transactionData.reference,
      amount: transactionData.amount,
      currency: transactionData.currency,
      status: "pending",
    });
    const plainTransaction = JSON.parse(JSON.stringify(transaction));

    const data = {
      message: "Transaction created successfully",
      transaction: plainTransaction,
      successful: true,
    };

    return data;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw new Error(error.message || "Could not create transaction");
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

export const cancelledTransaction = async (userId, reference) => {
  try {
    await dbConnect();

    // Check if transaction exists using userId and reference
    const existingTransaction = await Transaction.findOne({
      userId,
      reference,
    });

    if (!existingTransaction) {
      return {
        successful: false,
        message: `Transaction not found for user: ${userId} and reference: ${reference}`,
      };
    }

    // Update transaction status
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { userId, reference },
      { status: "cancelled" },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) {
      return { successful: false, message: "Transaction update failed" };
    }

    return {
      successful: true,
      message: "Transaction cancelled successfully",
    };
  } catch (error) {
    console.error("Error updating transaction:", error);
    return {
      successful: false,
      message: `Could not update transaction: ${error.message}`,
    };
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
