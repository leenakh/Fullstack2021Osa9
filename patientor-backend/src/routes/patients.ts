/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patient records.');
    res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, ssn, occupation } = req.body;
    try {
        const newPatient = patientService.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation
        });
        res.json(newPatient);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default router;