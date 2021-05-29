import React from 'react';
import { CoursePart } from './App';

const assertNever = (value: never): never => {
    throw new Error(`Unhandled discrimination union member: ${JSON.stringify(value)}`);
}

const Requirements = ({ requirements }: { requirements: string[] }) => {
    const first = requirements.pop();
    return (
        <span>
            <span>{first}</span>
            {requirements.map(r => <span key={r}>, {r}</span>)}
        </span>
    )
}

const Part = ({ part }: { part: CoursePart }) => {
    switch (part.type) {
        case "normal":
            return <div>
                <p><b>{part.name} {part.exerciseCount}</b>
                    <br /><i>{part.description}</i></p>
            </div>
        case "groupProject":
            return <div>
                <p><b>{part.name} {part.exerciseCount}</b>
                    <br />project exercises {part.groupProjectCount}</p>
            </div>
        case "submission":
            return <div>
                <p><b>{part.name} {part.exerciseCount}</b>
                    <br /><i>{part.description}</i>
                    <br />submit to {part.exerciseSubmissionLink}</p>
            </div>
        case "special":
            return <div>
                <p><b>{part.name} {part.exerciseCount}</b>
                    <br /><i>{part.description}</i>
                    <br />required skills: <Requirements requirements={part.requirements} /></p>
            </div>
        default:
            return assertNever(part);
    }
};

export default Part;