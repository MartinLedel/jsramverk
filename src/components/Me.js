import React, { useEffect, useState } from 'react';

const Me = () => {
    const [message, setMessage] = useState('');
    const apiUrl = "me-api.ml-jsramverk.me";

    useEffect(() => {
        fetch(`https://` + apiUrl + `/`)
            .then(res => res.json())
            .then(res => setMessage(res.data.text));
    }, []);
    console.log(message);

    return (
    <main>
      <h1>Me</h1>
      <p>{message}</p>
    </main>
    );
};

export default Me;
