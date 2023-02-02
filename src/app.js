const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const express = require("express");

const mealsRouter = require('./meals/meals.router');

const app = express();

app.use(express.json());

app.use('/meals', mealsRouter);

// Not found handler
app.use((req, res, next) => {
   next({ status: 404, message: `Not found: ${req.originalUrl}` });
});

// Error handler
app.use((error, req, res, next) => {
   console.error(error);
   const { status = 500, message = 'Something went wrong!' } = error;
   res.status(status).json({ error: message });
});

module.exports = app;