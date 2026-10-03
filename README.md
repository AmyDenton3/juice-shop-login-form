# Juice Shop Login Form

A basic login page inspired by OWASP Juice Shop, built for a web security class assignment.
It has an email and password form with both client-side and server-side validation, and it
stores the demo password using bcrypt hashing instead of plain text.

## What it does

- Email and password input fields
- Client-side validation that blocks empty submissions, checks that the email contains `@`,
  and requires the password to be at least 8 characters
- Server-side validation that runs the same checks again, since anything in the browser can be bypassed
- Password handling with bcrypt (the demo password is hashed when the server starts and compared with `bcrypt.compare`)
- Login messages are rendered with `textContent`, so script-looking input shows as text and does not run

## How to run

You need Node.js installed (version 16 or newer).

1. Clone the repo and go into the folder:
   ```
   git clone https://github.com/YOUR-USERNAME/juice-shop-login-form.git
   cd juice-shop-login-form
   ```
2. Install the dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```
4. Open your browser to:
   ```
   http://localhost:3000
   ```

## Demo login

- Email: `test@juice.com`
- Password: `password123`

Anything else returns "Invalid email or password."
