import React from 'react';
import { CoursePart } from './App'
import Part from './Part'


const Content = ({ parts }: { parts: Array<CoursePart> }) => {
    return (
        <div>
            {parts.map(p => <div key={p.name}><Part part={p} /></div>)}
        </div>
    )
};

export default Content;