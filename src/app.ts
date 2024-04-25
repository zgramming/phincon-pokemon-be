import cors from 'cors';
import dotEnv from 'dotenv';
import express from 'express';
import routes from '@routes/api';
import { handlingErrorMiddleware } from '@middlewares/handling-error.middleware';
import allowCrossDomain from '@middlewares/cross-domain.middleware';

// Load environment variables
dotEnv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static('public'));
app.use(cors());
app.use(allowCrossDomain);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use(handlingErrorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
