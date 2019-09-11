import React from 'react';

const Header = props => {
  return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
  );
};

const Content = ({ course }) => {
  const parts = () =>
    course.parts.map(part => <Part key={part.id} part={part} />);

  const exercises = course.parts.map(part => part.exercises);
  // console.log(exercises);

  const reducer = (acc, cur) => {
    // console.log(acc, cur);
    return acc + cur;
  };

  return (
    <div>
      {parts()}
      <strong>Total of {exercises.reduce(reducer)} exercises</strong>
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

const Course = props => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
    </div>
  );
};

export default Course;
