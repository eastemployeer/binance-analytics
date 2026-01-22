import dotenv from 'dotenv';

import app from './app';

dotenv.config();

const port = process.env.PORT || 3001;

const server = app.listen(port, () =>
  console.log(`App running on port ${port}`),
);

// mongoose
//   .connect(db, {
//     autoCreate: true,
//     autoIndex: true,
//   })
//   .then(() => {
//     // console.log(con.connections);
//     console.log('DB connection succesful');
//   })
//   .catch((err) => {
//     console.log('DB connection failed');
//     console.log(err);
//   });