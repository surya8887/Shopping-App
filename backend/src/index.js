import dotenv from 'dotenv';
dotenv.config({
  path: './.env',
  // override: true, // 👈 this line forces dotenv to override existing env vars
});


import DBConnect from './db/db.js';
import app from './app.js';

const port = process.env.PORT || 3000;

DBConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
