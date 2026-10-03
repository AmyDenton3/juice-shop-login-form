const express = require('express');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Demo user. The password is hashed with bcrypt when the server starts,
// so we never keep the plain text password anywhere.
let demoUser = { email: 'test@juice.com', passwordHash: '' };
bcrypt.hash('password123', 10).then(hash => {
  demoUser.passwordHash = hash;
});

function validEmail(email) {
  return typeof email === 'string' && email.includes('@') && email.length <= 254;
}

function validPassword(pw) {
  return typeof pw === 'string' && pw.length >= 8;
}

app.post('/login', async (req, res) => {
  const { email, password } = req.body || {};

  // Server-side validation. We never trust whatever the browser sent,
  // because the client-side checks can be bypassed.
  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Email and password are required.' });
  }
  if (!validEmail(email)) {
    return res.status(400).json({ ok: false, message: 'Email must contain @ and be a reasonable length.' });
  }
  if (!validPassword(password)) {
    return res.status(400).json({ ok: false, message: 'Password must be at least 8 characters.' });
  }

  // Look up the user and compare the password using bcrypt.
  // There is no raw SQL query here, so there is nothing for SQL injection to break.
  if (email !== demoUser.email) {
    return res.status(401).json({ ok: false, message: 'Invalid email or password.' });
  }

  const match = await bcrypt.compare(password, demoUser.passwordHash);
  if (!match) {
    return res.status(401).json({ ok: false, message: 'Invalid email or password.' });
  }

  return res.json({ ok: true, message: 'Login successful. Welcome back!' });
});

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
