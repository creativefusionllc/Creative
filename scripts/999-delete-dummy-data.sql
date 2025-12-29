-- Delete all dummy/sample data while keeping database structure
-- This script removes: sample companies, clients, social accounts, bookings, invoices, and transaction records

-- 1. Delete SMM Analytics for sample accounts
DELETE FROM smm_analytics 
WHERE social_account_id IN ('sa-cf-01', 'sa-cf-02', 'sa-cf-03', 'sa-cf-04', 'sa-cf-05', 'sa-cf-06',
                             'sa-ut-01', 'sa-ut-02', 'sa-ut-03', 'sa-ut-04', 'sa-ut-05', 'sa-ut-06',
                             'sa-gt-01', 'sa-gt-02', 'sa-gt-03', 'sa-gt-04');

-- 2. Delete Content Calendar items for sample accounts
DELETE FROM content_calendar 
WHERE id IN ('cc-001', 'cc-002', 'cc-003', 'cc-004', 'cc-005', 'cc-006');

-- 3. Delete Social Accounts for sample clients
DELETE FROM social_accounts 
WHERE id IN ('sa-cf-01', 'sa-cf-02', 'sa-cf-03', 'sa-cf-04', 'sa-cf-05', 'sa-cf-06',
             'sa-ut-01', 'sa-ut-02', 'sa-ut-03', 'sa-ut-04', 'sa-ut-05', 'sa-ut-06',
             'sa-gt-01', 'sa-gt-02', 'sa-gt-03', 'sa-gt-04');

-- 4. Delete Points Transactions
DELETE FROM points_transactions 
WHERE id IN ('pt-001', 'pt-002', 'pt-003', 'pt-004', 'pt-005', 'pt-006', 'pt-007');

-- 5. Delete Wallet Transactions
DELETE FROM wallet_transactions 
WHERE id IN ('wt-001', 'wt-002', 'wt-003', 'wt-004');

-- 6. Delete Invoices
DELETE FROM invoices 
WHERE id IN ('inv-001', 'inv-002', 'inv-003');

-- 7. Delete Bookings
DELETE FROM bookings 
WHERE id IN ('bk-001', 'bk-002', 'bk-003', 'bk-004');

-- 8. Delete SMM Subscriptions
DELETE FROM smm_subscriptions 
WHERE id IN ('sub-cf-001', 'sub-ut-001', 'sub-gt-001');

-- 9. Delete Sample Clients
DELETE FROM clients 
WHERE id IN ('aaaa1111-aaaa-1111-aaaa-111111111111', 
             'bbbb2222-bbbb-2222-bbbb-222222222222', 
             'cccc3333-cccc-3333-cccc-333333333333');

-- 10. Delete Sample Companies
DELETE FROM companies 
WHERE id IN ('11111111-1111-1111-1111-111111111111', 
             '22222222-2222-2222-2222-222222222222', 
             '33333333-3333-3333-3333-333333333333');

-- Confirm deletion
SELECT COUNT(*) as remaining_companies FROM companies;
SELECT COUNT(*) as remaining_clients FROM clients;
SELECT COUNT(*) as remaining_bookings FROM bookings;
