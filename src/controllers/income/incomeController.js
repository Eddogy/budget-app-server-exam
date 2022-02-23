const expressAsyncHandler = require("express-async-handler");
const Income = require("../../model/Income");

// Create
const createIncomeController = expressAsyncHandler(async (req, res) => {
  const { title, amount, description, user } = req.body;
  try {
    const income = await Income.create({
      title,
      amount,
      description,
      user,
    });
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// Fetch All Income
const fetchAllIncomeController = expressAsyncHandler(async (req, res) => {
  const { page } = req?.query;
  try {
    const income = await Income.paginate({}, { limit: 10, page: Number(page), populate: 'user' });
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// Fetch One Income
const fetchIncomeDetailsController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  try {
    const income = await Income.findById(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// Update
const updateIncomeController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  const { title, amount, description } = req.body;
  try {
    const income = await Income.findByIdAndUpdate(
      id,
      {
        title,
        description,
        amount,
      },
      { new: true }
    ); // Return Updated Income
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

// Delete
const deleteIncomeController = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;

  try {
    const income = await Income.findByIdAndDelete(id);
    res.json(income);
  } catch (error) {
    res.json(error);
  }
});

module.exports = {
  createIncomeController,
  fetchAllIncomeController,
  fetchIncomeDetailsController,
  updateIncomeController,
  deleteIncomeController,
};
