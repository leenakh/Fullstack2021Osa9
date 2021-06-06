import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isDate = (date: unknown): boolean => {
    const pattern = /\d\d\d\d-\d\d-\d\d/;
    if (!date || !isString(date) || date.length !== 10) {
        return false;
    } else if (pattern.test(String(date))) {
        const parts: string[] = date.split('-');
        const year = Number(parts[0]);
        const month = Number(parts[1]);
        const day = Number(parts[2]);
        if (year < 2022 && year > 1899 && month < 13 && month > 0 && day < 32 && day > 0) {
            return true;
        }
    }
    return false;
};

const isSsn = (ssn: unknown): boolean => {
    const pattern = /\d\d\d\d\d\d(\+|-|A)\d\d\d\w/;
    const patternX = /_/;
    if (isString(ssn) && pattern.test(String(ssn)) && !patternX.test(String(ssn)) && String(ssn).length === 11) {
        const day = Number(String(ssn).substring(0,2));
        const month = Number(String(ssn).substring(2,4));
        const year = Number(String(ssn).substring(4,6));
        if (day > 0 && day < 32 && month > 0 && month < 13 && year >= 0 && year < 100) {
            return true;
        }
    }
    return false;
};

const isName = (name: unknown): boolean => {
    const pattern = /\s/;
    return pattern.test(String(name));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name) || !isName(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};

const parseDateOfBirth = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing dateOfBirth');
    }
    return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: []
    };
    return newPatient;
};

export default toNewPatient;