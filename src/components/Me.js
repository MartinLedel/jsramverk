import React, { useEffect, useState } from 'react';

const Me = () => {
  const [message, setMessage] = useState('');
  useEffect(() => {
  fetch(`http://localhost:1337/`)
      .then(res => res.json())
      .then(res => setMessage(res.data.text));
  });

  return (
    <main>
      <h1>Me</h1>
      <p>{message}</p>
    </main>
  );
};

export default Me;
