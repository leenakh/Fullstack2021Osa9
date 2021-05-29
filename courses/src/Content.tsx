import React from 'react';

interface CoursePart {
    name: string;
    exerciseCount: number;
}

const Content = ({ parts }: { parts: Array<CoursePart> }) => {
    return (
        <div>
            {parts.map(p => <p key={p.name}>{p.name} {p.exerciseCount}</p>)}
        </div>
    )
};

export default Content;