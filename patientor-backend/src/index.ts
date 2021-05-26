import express from 'express';
import cors from 'cors';
import patientRouter from './routes/patients';
import diagnosesRouter from './routes/diagnoses';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone said kukkuu');
    res.send('pong');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosesRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});