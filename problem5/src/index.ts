import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import movieRoutes from './routes/movies';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/movies', movieRoutes);

app.get('/', (req, res) => {
  res.status(200).send({response: 'Hello World!'});
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});