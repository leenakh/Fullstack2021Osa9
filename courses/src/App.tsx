import React from 'react';
import Header from './Header'
import Content from './Content'
import Total from './Total'

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];
  const numberOfExercises = courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total exercises={numberOfExercises} />
    </div>
  );
};

export default App;