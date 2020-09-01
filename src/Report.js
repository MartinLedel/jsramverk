import React from 'react';

const Report = () => {
    const text = [
        "Clone the repo with `git clone https://github.com/MartinLedel/jsramverk`",
        "Run `npm install` to install all dependencies",
        "Run `yarn run start`",
        "Enjoy the me-page on `http://localhost:3000/`"
    ]
    const QuestionsList = () =>
        text.map((row, index) => (
          <div key={index}>
            <li>
              {row}
            </li>
          </div>
        ));
  return (
    <main>
      <h2>kmom01</h2>
      <a href="https://github.com/MartinLedel/jsramverk">Github repo</a>
      <p><b>Setup</b></p>
      <QuestionsList />
    </main>
  );
};

export default Report;
