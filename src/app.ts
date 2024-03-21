import bodyParser from 'body-parser';
import cors from 'cors';
import dotEnv from 'dotenv';
import express from 'express';
import routes from '@routes/api';
import { isPrismaConnected } from '@utils/prisma';

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

isPrismaConnected();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});