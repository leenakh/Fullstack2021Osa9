import React from "react";
import { Entry, Gender, Patient } from "../types";
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Icon } from 'semantic-ui-react';
import axios from "axios";

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

const ShowEntry = ({ entry }: { entry: Entry }) => {
    return (
        <div>
            <div>{entry.date} <i>{entry.description}</i></div>

        </div>
    );
};

const ShowCodes = ({entry}: {entry: Entry}) => {
    if (entry.diagnosisCodes) {
        return (
            <ul>
            {entry.diagnosisCodes.map(d => <li key={d}>{d}</li>)}
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
            dispatch({ type: "SET_PATIENT", payload: returnedPatient });
        };
        void fetchPatient();
    }, [dispatch]);

    if (patient) {
        return (<div>
            <div><h3>{patient.name}    <ShowGender gender={patient.gender} /></h3></div>
            <div>Born: {patient.dateOfBirth}</div>
            <div>Occupation: {patient.occupation}</div>
            <div>Entries: {patient.entries.map(e => <div key={e.id}><ShowEntry key={e.id} entry={e} /> <ShowCodes entry={e} /></div>)}</div>
        </div>);
    }
    return null;
};

export default withRouter(PatientInfo);