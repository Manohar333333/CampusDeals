-- Insert dummy Buyers & Sellers
INSERT INTO Users 
(user_name, user_email, user_password, role, user_phone, user_studyyear, user_branch, user_section, user_residency, payment_received, amount_given)
VALUES
-- Buyers
('Ravi Kumar', 'ravi@example.com', 'password123', 'buyer', '9876543210', '2nd Year', 'CSE', 'A', 'Hostel', 0.00, 0.00),
('Anjali Sharma', 'anjali@example.com', 'password123', 'buyer', '9876501234', '3rd Year', 'ECE', 'B', 'Day Scholar', 0.00, 0.00),
('Mohit Verma', 'mohit@example.com', 'password123', 'buyer', '9123456789', '1st Year', 'ME', 'C', 'Hostel', 0.00, 0.00),
('Sneha Patel', 'sneha@example.com', 'password123', 'buyer', '9988776655', '2nd Year', 'EEE', 'A', 'Day Scholar', 0.00, 0.00),
('Arjun Reddy', 'arjun@example.com', 'password123', 'buyer', '9876123456', '4th Year', 'CIVIL', 'B', 'Hostel', 0.00, 0.00),

-- Sellers
('Priya Singh', 'priya@example.com', 'password123', 'seller', '9123987654', '3rd Year', 'CSE', 'C', 'Day Scholar', 500.00, 300.00),
('Karan Malhotra', 'karan@example.com', 'password123', 'seller', '9876012345', '2nd Year', 'ECE', 'A', 'Hostel', 1000.00, 700.00),
('Neha Gupta', 'neha@example.com', 'password123', 'seller', '9123009876', '4th Year', 'ME', 'B', 'Day Scholar', 300.00, 200.00),
('Rahul Das', 'rahul@example.com', 'password123', 'seller', '9234567890', '3rd Year', 'CIVIL', 'C', 'Hostel', 800.00, 500.00),
('Simran Kaur', 'simran@example.com', 'password123', 'seller', '9345678901', '1st Year', 'CSE', 'A', 'Day Scholar', 200.00, 100.00);