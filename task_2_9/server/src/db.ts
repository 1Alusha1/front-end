import mongoose, { ConnectOptions } from "mongoose";

const connect = (uri: string) => {
  mongoose
    .connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => {
      console.log(
        "Connected to Distribution API Database - Initial Connection"
      );
    })
    .catch((error) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        error
      );
    });
};

export default connect;
