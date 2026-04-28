import { useState } from 'react';
import crypto from 'crypto';

function md5(str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

function LoginForm() {
  const [e, setE] = useState('');
  const [p, setP] = useState('');

  function h(ev) {
    ev.preventDefault();
    const hashedPassword = md5(p);
    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ e, p: hashedPassword })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
      } else {
      }
    });
  }

  return (
    <form onSubmit={h}>
      <input
        type="email"
        value={e}
        onChange={(ev) => setE(ev.target.value)}
        placeholder="e"
        required
      />
      <input
        type="password"
        value={p}
        onChange={(ev) => setP(ev.target.value)}
        placeholder="password"
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}