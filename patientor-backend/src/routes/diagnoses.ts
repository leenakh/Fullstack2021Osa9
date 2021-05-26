import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching diagnoses.');
    res.send(diagnosesService.getDiagnoses());
});

router.post('/', (_req, res) => {
    res.send('Saving diagnoses');
});

export default router;