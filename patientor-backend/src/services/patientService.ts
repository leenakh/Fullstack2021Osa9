import patientData from '../data/patients';
import { NonSensitivePatient } from '../types';

const getPatients = (): NonSensitivePatient[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id, name, dateOfBirth, gender, occupation
    }));
};

const addPatient = () => {
    return null;
};

export default {
    getPatients,
    addPatient
};