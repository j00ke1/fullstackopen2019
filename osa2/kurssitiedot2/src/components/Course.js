import React from 'react';

const Header = props => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  );
};

const Content = ({ course }) => {
  const parts = () =>
    course.parts.map(part => <Part key={part.id} part={part} />);

  const exercises = course.parts.map(part => part.exercises);
  console.log(exercises);

  const reducer = (acc, cur) => {
    console.log(acc, cur);
    return acc + cur;
  };

  return (
    <div>
      {parts()}
      Total of {exercises.reduce(reducer)} exercises
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

/* const Total = props => {
    return (
      <div>
        <p>
          Number of exercises{' '}
          {props.course.parts[0].exercises +
            props.course.parts[1].exercises +
            props.course.parts[2].exercises}
        </p>
      </div>
    );
  }; */

const Course = props => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
    </div>
  );
};

export default Course;
