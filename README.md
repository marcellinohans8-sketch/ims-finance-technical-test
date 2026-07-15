# IMS Finance Technical Test

Technical test implementation for the **Junior IT Developer** position at **PT. Inovasi Mitra Sejati**.

## Tech Stack

### Backend

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

### Frontend

- React (Vite)
- Axios

---

# Project Structure

```
ims-finance-technical-test
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── migrations
│   ├── models
│   ├── routes
│   ├── seeders
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# Features

## 1. Installment Calculator

Calculate:

- Down Payment
- Loan Amount
- Monthly Installment
- Installment Schedule

Input:

- Contract Number
- Client Name
- OTR
- DP Percentage
- Tenor

Output:

- Down Payment
- Loan Amount
- Monthly Installment
- Installment Schedule

---

## 2. Total Overdue Query

Calculate the total overdue installment amount for each contract until **14 August 2024**.

---

## 3. Penalty Query

Calculate penalty for overdue installments.

Formula:

```
Penalty = Monthly Installment × Late Days × 0.1%
```

Reference Date:

```
14 August 2024
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/marcellinohans8-sketch/ims-finance-technical-test.git
```

---

# Backend Setup

Go to server folder

```bash
cd server
```

Install dependencies

```bash
npm install
```

Create PostgreSQL database

```bash
npx sequelize db:create
```

Run migration

```bash
npx sequelize db:migrate
```

Run seeder

```bash
npx sequelize db:seed:all
```

Run server

```bash
node server.js
```

Server will run on

```
http://localhost:3000
```

---

# Frontend Setup

Go to client folder

```bash
cd client
```

Install dependencies

```bash
npm install
```

Run application

```bash
npm run dev
```

Frontend will run on

```
http://localhost:5173
```

---

# API Endpoints

## Calculate Installment

### Request

```
POST /api/installments/calculate
```

Example Body

```json
{
  "contractNo": "AGR00001",
  "clientName": "SUGUS",
  "otr": 240000000,
  "dpPercent": 20,
  "tenor": 18
}
```

---

## Total Overdue

```
GET /api/installments/overdue
```

Example Response

```json
[
  {
    "contractNo": "AGR00001",
    "clientName": "SUGUS",
    "totalOverdue": "90349000.00"
  }
]
```

---

## Penalty

```
GET /api/installments/penalty
```

Example Response

```json
[
  {
    "contractNo": "AGR00001",
    "clientName": "SUGUS",
    "installmentNo": 6,
    "lateDays": 50,
    "penalty": "645350.00"
  },
  {
    "contractNo": "AGR00001",
    "clientName": "SUGUS",
    "installmentNo": 7,
    "lateDays": 20,
    "penalty": "258140.00"
  }
]
```

---

# Database

## Contracts

| Column     | Type    |
| ---------- | ------- |
| id         | Integer |
| contractNo | String  |
| clientName | String  |
| otr        | Decimal |

---

## InstallmentSchedules

| Column             | Type    |
| ------------------ | ------- |
| id                 | Integer |
| contractNo         | String  |
| installmentNo      | Integer |
| monthlyInstallment | Decimal |
| dueDate            | Date    |

---

# SQL Queries

## Query 1 - Total Overdue

```sql
SELECT
    c."contractNo",
    c."clientName",
    SUM(i."monthlyInstallment") AS "totalOverdue"
FROM "Contracts" c
JOIN "InstallmentSchedules" i
ON c."contractNo" = i."contractNo"
WHERE i."dueDate" <= '2024-08-14'
GROUP BY c."contractNo", c."clientName";
```

---

## Query 2 - Penalty

```sql
SELECT
    c."contractNo",
    c."clientName",
    i."installmentNo",
    ('2024-08-14'::date - i."dueDate") AS "lateDays",
    ROUND(
        i."monthlyInstallment" *
        ('2024-08-14'::date - i."dueDate") *
        0.001,
        2
    ) AS "penalty"
FROM "Contracts" c
JOIN "InstallmentSchedules" i
ON c."contractNo" = i."contractNo"
WHERE i."dueDate" < '2024-08-14'
ORDER BY i."installmentNo";
```

---

# Author

Hans Marcellino Bungaran Lumbantobing

GitHub

https://github.com/marcellinohans8-sketch
