import patientData from '../data/patients';
import { NonSensitivePatient, NewPatient, Patient } from '../types';
import toNewPatient from '../utils';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        id, name, dateOfBirth, gender, occupation, entries
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    const patient = patientData.find(p => p.id === id);
/*     const patientToReturn = {
        ...patient,
        entries: patient.entries.map({... Entry})
    }; */
    return patient;
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
    const id = uuid();
/*     const newPatient = {
        id,
        ...patient
    }; */
    const validatedPatient = toNewPatient(patient);
    const patientToAdd = {
        id,
        ...validatedPatient
    };
    const patientToReturn: NonSensitivePatient = {
        id: id,
        name: validatedPatient.name,
        dateOfBirth: validatedPatient.dateOfBirth,
        gender: validatedPatient.gender,
        occupation: validatedPatient.occupation
    };
    patientData.push(patientToAdd);
    return patientToReturn;
};

export default {
    getPatients,
    getPatientById,
    addPatient
};