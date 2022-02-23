const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");

const userRoute = require("./routes/users/usersRoute");
const incomeRoute = require ("./routes/income/incomeRoute");
const expenseRoute = require("./routes/expenses/expenseRoute");

const app = express();
// Env
dotenv.config();

// Database Connection
dbConnect();

// Middlewares
app.use(express.json());

app.get("/", (req, res) => {
    res.json({msg: "Welcome to Budget App API"});
});
// Users Route
app.use("/api/users", userRoute);

// Income Route
app.use("/api/income", incomeRoute);

// Expenses Route
app.use("/api/expenses", expenseRoute);

//Error
app.use(notFound);
app.use(errorHandler);
// Order is important, first notFound then errorHandler

//income
//expenses

module.exports = app;