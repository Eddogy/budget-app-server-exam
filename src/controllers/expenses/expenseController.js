const expressAsyncHandler = require("express-async-handler");
const Expense = require("../../model/Expense");

// Create
const createExpenseController = expressAsyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body;
  try {
    const expense = await Expense.create({
      title,
      amount,
      description,
      user,
    });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// Fetch All Expense
const fetchAllExpenseController = expressAsyncHandler(async (req, res) => {
  const {page} = req?.query;
  try {
    const expense = await Expense.paginate({}, {limit: 10, page: Number(page), populate: 'user' });
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// Fetch One Expense
const fetchExpenseDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const expense = await Expense.findById(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// Update
const updateExpenseController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      {
        title,
        description,
        amount,
      },
      { new: true }
    ); // Return Updated Expense
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

// Delete
const deleteExpenseController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    res.json(expense);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createExpenseController,
  fetchAllExpenseController,
  fetchExpenseDetailsController,
  updateExpenseController,
  deleteExpenseController,
};
