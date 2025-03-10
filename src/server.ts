import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

main().catch((err) => console.log(err));

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);
    app.listen(config.port, () => {
      console.log(`Car Store app listening on port ${config.port}!`);
    });
  } catch (error) {
    console.log(error);
  }
}
