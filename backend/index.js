const app = require("./app");
const { PORT } = process.env;
const connection = require("./config/db");
(async () => {
    await connection
      .sync()
      .then(() => {
        console.log("Database successfully connected");
      })
      .catch((err) => {
        console.log(err.message);
        return process.exit(1);
      });
  
    app.listen(PORT, () => {
        console.log(
          `<<<<<<<<<<<<<<<< Yeeeep,Server running on port ${PORT}..>>>>>>>>>>>`
        );
    });
  })();
 
