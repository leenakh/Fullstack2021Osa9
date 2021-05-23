import express from 'express';
import calculateBmi from './src/bmiCalculator';
import calculateExercise, { RequestObject } from './src/exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('');
});

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);
        const bmi = calculateBmi(weight, height);
        res.json({
            weight,
            height,
            bmi
        });
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        res.status(400).json(error.message);
    }

});

app.post('/exercises', (req, res) => {
    const values = req.body as RequestObject;
    if (!values.target || !values.daily_exercises) {
        res.status(400).json({error: 'parameters missing'});
    }
    try {
        const result = calculateExercise(values);
        res.json(result);
    } catch (error) {
        res.status(400).json({error: 'malformatted parameters'});
    }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});