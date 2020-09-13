import React, { useEffect, useState } from 'react';

const Report = ({ match }) => {
    const kmom = match.params.kmom ;
    const [text, setText] = useState([]);

    useEffect(() => {
    fetch(`http://localhost:1337/reports/week/${kmom}`)
        .then(res => res.json())
        .then(res => setText(res.data));
    });

  return (
    <main>
      <h2>{ "kmom0" + kmom }</h2>
      <div className="display-linebreak">
        { text.texts }
     </div>
    </main>
  );
};

export default Report;
