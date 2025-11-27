# Loan Management Mini App (Frontend)

## What you got
A Vite + React frontend project implementing:
- Login (email + password -> OTP)
- Signup (stores users to localStorage)
- Dashboard with filters, table display
- Toast notifications via `react-toastify`
- No backend (data persisted in localStorage)
- Protected dashboard route

## How to run
1. Install dependencies:

2. Start dev server:

3. Open http://localhost:5173

## Sample credentials
- john@example.com / john123 (OTP: 123456)
- ayush@example.com / ayush123 (OTP: 654321)

## Notes
- On first run the app writes sample users and loans to `localStorage` keys `lm_users` and `lm_loans`.
- New signups are stored to `lm_users`.
