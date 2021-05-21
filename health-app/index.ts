import express from 'express';
import calculateBmi from './src/bmiCalculator'

const app = express();

app.get('/', async (_req, res) => {
    res.send('')
})

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', async (req, res) => {
    try {
    const weight = Number(req.query.weight)
    const height = Number(req.query.height)
    const bmi = calculateBmi(weight, height)
        res.json({
            weight,
            height,
            bmi
        })
    } catch (error) {
        res.status(400).json(error.message)
    }
    
})

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});