import express from 'express';
import calculateBmi from './src/bmiCalculator';

const app = express();

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

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});