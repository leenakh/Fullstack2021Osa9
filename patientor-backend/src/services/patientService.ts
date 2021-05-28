import patientData from '../data/patients';
import { Patient, NonSensitivePatient, NewPatient } from '../types';
import toNewPatient from '../utils';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = (patient: NewPatient): NonSensitivePatient => {
    const id = uuid();
    const newPatient = {
        id,
        ...patient
    };
    const validatedPatient = toNewPatient(newPatient) as Patient;
    const patientToReturn: NonSensitivePatient = {
        id: id,
        name: validatedPatient.name,
        dateOfBirth: validatedPatient.dateOfBirth,
        gender: validatedPatient.gender,
        occupation: validatedPatient.occupation
    };
    patientData.push(validatedPatient);
    return patientToReturn;
};

export default {
    getPatients,
    addPatient
};