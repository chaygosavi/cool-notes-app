import app from "./app";
import mongoose from "mongoose";
import env from "./util/validateEnv";
mongoose.set("strictQuery", true);

mongoose
  .connect(env.MONGO_URL)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`Server running on ${env.PORT}`);
    });
  })
  .catch(console.error);
