import React from "react";
import { Diagnosis, Entry, HospitalEntry, HealthCheckEntry, OccupationalHealthCareEntry, Gender, Patient, HealthCheckRating } from "../types";
import { AddEntryForm, EntryFormValues } from './AddEntryForm';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { apiBaseUrl } from "../constants";
import { setPatient, useStateValue } from "../state";
import { Container, Icon } from 'semantic-ui-react';
import axios from "axios";

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discrimination union member: ${JSON.stringify(value)}`);
};

const ShowGender = ({ gender }: { gender: Gender }) => {
    if (gender === 'male') {
        return (
            <Icon circular color='blue' name='mars' size='large' />
        );
    } else if (gender === 'female') {
        return (
            <Icon circular color='blue' name='venus' size='large' />
        );
    } else {
        return (
            <Icon circular color='blue' name='neuter' size='large' />
        );
    }
};

const ShowHospitalEntry = ({ entry }: { entry: HospitalEntry }) => {
    return (
        <Container>
            <div><b>{entry.date}</b>  <Icon name='medkit' size='large' /></div>
            <div><i>{entry.description}</i></div>
            {entry.discharge ? <div><b>Discharged {entry.discharge.date}: {entry.discharge.criteria}</b></div> : null}
        </Container>
    );
};

const ShowHealthRating: React.FC<{ rating: HealthCheckRating }> = ({ rating }) => {
    switch (rating) {
        case HealthCheckRating.Healthy:
            return <Icon name="heart" color="green" />;
        case HealthCheckRating.LowRisk:
            return <Icon name="heart" color="yellow" />;
        case HealthCheckRating.HighRisk:
            return <Icon name="heart" color="orange" />;
        case HealthCheckRating.CriticalRisk:
            return <Icon name="heart" color="red" />;
        default:
            return assertNever(rating);
    }
};
const ShowHealthCheckEntry = ({ entry }: { entry: HealthCheckEntry }) => {
    return (
        <div>
            <div><b>{entry.date}</b>  <Icon name='stethoscope' size='large' /></div>
            <div><i>{entry.description}</i></div>
            <div><ShowHealthRating rating={entry.healthCheckRating} /></div>
        </div>
    );
};

const ShowOccupationalEntry = ({ entry }: { entry: OccupationalHealthCareEntry }) => {
    return (
        <div>
            <div><b>{entry.date}</b>  <Icon name='user md' size='large' />    <span><b>{entry.employerName}</b></span></div>
            <div><i>{entry.description}</i></div>
            {entry.sickLeave ? <div><b>Sick leave: {entry.sickLeave.startDate} <Icon name="arrow right" /> {entry.sickLeave.endDate}</b></div> : null}
        </div>
    );
};

const ShowEntry: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "Hospital":
            return <ShowHospitalEntry entry={entry} />;
        case "HealthCheck":
            return <ShowHealthCheckEntry entry={entry} />;
        case "OccupationalHealthcare":
            return <ShowOccupationalEntry entry={entry} />;
        default:
            return assertNever(entry);
    }
};

const ShowDiagnosis = ({ code }: { code: string }) => {
    const [{ diagnoses },] = useStateValue();
    const diagnosis = Object.values(diagnoses).filter((diagnosis: Diagnosis) => diagnosis.code === code);
    return (<span>{diagnosis[0].name}</span>);
};

const ShowCodes = ({ entry }: { entry: Entry }) => {
    if (entry.diagnosisCodes) {
        return (
            <ul>
                {entry.diagnosisCodes.map(d => <li key={d}>{d}  <ShowDiagnosis code={d} /></li>)}
            </ul>
        );
    }
    return null;
};

const PatientInfo = () => {
    const [{ patient }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();
    React.useEffect(() => {
        const fetchPatient = async () => {
            const { data: returnedPatient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
            dispatch(setPatient(returnedPatient));
        };
        void fetchPatient();
    }, [dispatch]);

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            const { data: newPatient } = await axios.post<Patient>(
                `${apiBaseUrl}/patients/${id}/entries`, values
            );
            dispatch(setPatient(newPatient));
        } catch (e) {
            console.log(e.response.data);
        }
    };

    const doSomething = () => {
        console.log('do something');
    };

    if (patient) {
        return (<div>
            <div><h3>{patient.name}    <ShowGender gender={patient.gender} /></h3></div>
            <div>Born: {patient.dateOfBirth}</div>
            <div>Occupation: {patient.occupation}</div>
            <br />
            <div><h5>Entries: </h5>{patient.entries.map(e => <div key={e.id} style={{ borderStyle: 'solid', borderWidth: 2, borderRadius: 5, borderColor: 'gainsboro', padding: 5, margin: 5 }}><ShowEntry key={e.id} entry={e} /> <ShowCodes entry={e} /></div>)}</div>
            <h3>Create new entry:</h3>
            <div><AddEntryForm onSubmit={submitNewEntry} onCancel={doSomething} /></div>
        </div>);
    }
    return null;
};

export default withRouter(PatientInfo);