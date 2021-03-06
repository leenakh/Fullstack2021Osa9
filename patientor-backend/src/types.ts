export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface Discharge {
    date: string;
    criteria: string
}

export enum Type {
    HealthCheck = "HealthCheck",
    Hospital = "Hospital",
    OccupationalHealthcare = "OccupationalHealthcare"
}

export interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: Discharge
}

export interface SickLeave {
    startDate: string;
    endDate: string
}

export interface OccupationalHealthCareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeave
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[]
}

export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}