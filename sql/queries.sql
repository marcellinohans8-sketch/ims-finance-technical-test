-- Nomor 2
SELECT
    c."contractNo",
    c."clientName",
    SUM(i."monthlyInstallment") AS "totalOverdue"
FROM "Contracts" c
JOIN "InstallmentSchedules" i
ON c."contractNo" = i."contractNo"
WHERE i."dueDate" <= '2024-08-14'
GROUP BY c."contractNo", c."clientName";

-- Nomor 3
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