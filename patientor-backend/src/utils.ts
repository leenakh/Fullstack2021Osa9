import { NewPatient, Gender, BaseEntry, Entry, Type, Discharge, HealthCheckRating, SickLeave } from './types';

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
        const day = Number(String(ssn).substring(0, 2));
        const month = Number(String(ssn).substring(2, 4));
        const year = Number(String(ssn).substring(4, 6));
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry: any): entry is Entry => {
    if (Object.values(Type).includes(entry.type)
        && entry.description
        && entry.date
        && entry.specialist) {
        return true;
    }
    return false;
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
const parseEntries = (entries: []): Array<Entry> => {
    entries.forEach(element => {
        if (!isEntry(element))
            throw new Error('Incorrect or missing entry');
    });
    return entries;
};

const parseId = (id: unknown): string => {
    if (!id || !isString(id)) {
        throw new Error('invalid id');
    }
    return id;
};

const parseDescription = (description: unknown): string => {
    if (!description || !isString(description)) {
        throw new Error('invalid description');
    }
    return description;
};

const parseDate = (date: unknown): string => {
    if (!date || !isDate(date)) {
        throw new Error('invalid date');
    }
    return String(date);
};

const parseSpecialist = (specialist: unknown): string => {
    if (!specialist || !isString(specialist)) {
        throw new Error('invalid specialist');
    }
    return specialist;
};

const parseDiagnosisCodes = (codes: string[]): string[] => {
    codes.forEach(element => {
        if (!isString(element))
            throw new Error('invalid codes');
    });
    return codes;
};

const parseDischarge = (discharge: Discharge): Discharge => {
    if (!discharge || !discharge.date || !discharge.criteria) {
        throw new Error('invalid discharge');
    }
    return discharge;
};

const parseHealthCheckRating = (rating: HealthCheckRating): HealthCheckRating => {
    if (!rating) {
        throw new Error('invalid rating');
    }
    return rating;
};

const parseEmployerName = (name: string): string => {
    if (!name || !isString(name)) {
        throw new Error('invalid employername');
    }
    return name;
};

const parseSickLeave = (sickLeave: SickLeave): SickLeave => {
    if (!sickLeave || !sickLeave.endDate || !sickLeave.startDate) {
        throw new Error('invalid sickleave');
    }
    return sickLeave;
};

const assertNever = (value: unknown): never => {
    throw new Error(`Unhandled discrimination union member: ${JSON.stringify(value)}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): Entry => {
    if (!object.type || !isEntry(object)) {
        throw new Error('invalid entry (type)');
    }
    const entry: BaseEntry = {
        id: parseId(object.id),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist)
    };
    if (object.diagnosisCodes) {
        entry.diagnosisCodes = parseDiagnosisCodes(object.diagnosisCodes);
    }
    switch (object.type) {
        case 'Hospital':
            return {
                ...entry,
                type: 'Hospital',
                discharge: parseDischarge(object.discharge)
            };
        case 'HealthCheck':
            return {
                ...entry,
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
            };
        case 'OccupationalHealthcare':
            const entryToReturn: Entry = {
                ...entry,
                type: 'OccupationalHealthcare',
                employerName: parseEmployerName(object.employerName)
            };
            if (object.sickLeave) {
                entryToReturn.sickLeave = parseSickLeave(object.sickLeave);
            }
            return entryToReturn;
        default:
            return assertNever(object);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
    const newPatient: NewPatient = {
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
    return newPatient;
};