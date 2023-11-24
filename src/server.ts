import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.MONGO_DB_URI as string);
    console.log('Mongodb database connected');

    app.listen(config.PORT, () => {
      console.log(`Server listening on port ${config.PORT}`);
    });
  } catch (error: any) {
    console.log(error.message);
   
  }
}

main()

