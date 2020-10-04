import React, { useEffect, useState } from 'react';

const Report = ({ match }) => {
    const kmom = match.params.kmom ;
    const [text, setText] = useState("");
    const apiUrl = "me-api.ml-jsramverk.me";

    useEffect(() => {
        fetch(`https://` + apiUrl + `/reports/week/${kmom}`)
            .then(res => res.json())
            .then(res => setText(res.data.texts));
    }, [kmom]);
    return (
    <main>
      <h2>{ "kmom0" + kmom }</h2>
      <div className="display-linebreak">
        { text }
     </div>
    </main>
    );
};

export default Report;
