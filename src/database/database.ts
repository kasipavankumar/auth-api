import mongoose, { ConnectionOptions } from 'mongoose';
import chalkAnimation from 'chalk-animation';

class Database {
  private CONNECTION_STRING: string;

  constructor() {
    this.CONNECTION_STRING = process.env.DB_URI || ``;
  }

  public connect() {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    };

    const callback = (): void => {
      chalkAnimation.rainbow(`→ Connected to database. 👍`);
    };

    mongoose.connect(this.CONNECTION_STRING, options, callback);
  }
}

export default Database;
