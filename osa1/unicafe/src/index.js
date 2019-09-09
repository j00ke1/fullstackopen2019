import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = props => {
  return <h1>{props.title}</h1>;
};

const Button = props => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

/* const Statistics = props => {
  if (props.totalClicks === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      Good: {props.good}
      <br />
      Neutral: {props.neutral}
      <br />
      Bad: {props.bad}
      <br />
      Total: {props.totalClicks}
      <br />
      Average: {props.good - props.bad}
      <br />
      Positive: {(props.good / props.totalClicks) * 100} %
    </div>
  );
}; */

const TableRow = props => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Table = ({ good, neutral, bad, totalClicks, average, positive }) => {
  if (totalClicks === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <table>
      <tbody>
        <TableRow text='Good:' value={good} />
        <TableRow text='Neutral:' value={neutral} />
        <TableRow text='Bad:' value={bad} />
        <TableRow text='Total:' value={totalClicks} />
        <TableRow text='Average:' value={average} />
        <TableRow text='Positive (%):' value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const totalClicks = good + neutral + bad;
  const average = good - bad;
  const positive = (good / totalClicks) * 100;

  return (
    <div>
      <Header title='Give feedback' />
      <Button text='Good' handleClick={() => setGood(good + 1)} />
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)} />
      <Button text='Bad' handleClick={() => setBad(bad + 1)} />
      <Header title='Statistics' />
      <Table
        good={good}
        neutral={neutral}
        bad={bad}
        totalClicks={totalClicks}
        average={average}
        positive={positive}
      />
      {/* <Statistic text='Good:' value={good} />
      <Statistic text='Neutral:' value={neutral} />
      <Statistic text='Bad:' value={bad} />
      <Statistic text='Total:' value={totalClicks} />
      <Statistic text='Average:' value={good - bad} />
      <Statistic
        text='Percentage positive:'
        value={(good / totalClicks) * 100}
			/> */}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
