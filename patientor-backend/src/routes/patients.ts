/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
    console.log('Fetching patient records.');
    res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
        console.log('fetching one patient');
        const patient = patientService.getPatientById(req.params.id);
        if (patient) {
        res.send(patient);
        } else {
        res.status(404).json(({error: 'patient not found'}));
    }
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, ssn, occupation, entries } = req.body;
    try {
        const newPatient = patientService.addPatient({
            name,
            dateOfBirth,
            ssn,
            gender,
            occupation,
            entries
        });
        res.json(newPatient);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
});

export default router;