const express = require('express');
require('express-async-errors');
require('dotenv').config();
const app = express();

//connect db
const connectDB = require('./db/connect');

//router
const signUpRouter = require('./routes/signUp');
const verifyEmailRouter = require('./routes/verifyEmail');

// error handler
const notFoundMiddleware = require('./middleware/not-found');

// extra packages
app.use(express.json());

// routes
app.use('/api/user/signup', signUpRouter);
app.use('/api/user/verify', verifyEmailRouter);

app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
