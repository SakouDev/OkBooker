import mongoose, { ConnectOptions } from 'mongoose';
import 'dotenv/config'

const options = { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions

mongoose.connect(process.env.MONGODB_URI!, options )
  .then(() => console.log('Connected to MongoDB.'))
  .catch(error => console.error(error));

export default mongoose