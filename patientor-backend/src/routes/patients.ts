import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patient records.');
    res.send(patientService.getPatients());
});

router.post('/', (_req, res) => {
    res.send('Saving patient record.');
});

export default router;