INSERT INTO web_admin 
VALUES ('JuilnwZa', 'root', 'Jui'), ('SunSingaSong', 'root', 'Sun');

INSERT INTO customer_company
VALUES 	(1, 'cuspassword', 'Siam Usha', 'siamusha@email.com', '029999999', 'fakeaddr'),
				(2, 'cuspassword', 'Apple inc.', 'apple@email.com', '029999999', 'fakeaddr'),
				(3, 'cuspassword', 'Toyota Thailand', 'toyota@email.com', '029999999', 'fakeaddr');

INSERT INTO orders 
VALUES 	(1, CURDATE(), 1, 'New order'),
				(2, CURDATE(), 2, 'Quotation sent'),
				(3, CURDATE(), 2, 'Quotation sent'),
                (4, CURDATE(), 3, 'Working'),
                (5, CURDATE(), 1, 'Delivered');
                
INSERT INTO model
VALUES	(1, 0, 'Model-01', '', 1),
				(2, 0, 'Model-02', '', 1),
                (3, 0, 'Model-03', '', 1),
                (4, 1000, 'Model-04', '', 2),
                (5, 200, 'Model-05', '', 2),
                (6, 400, 'Model-06', '', 3),
                (7, 20000, 'Model-07', '', 1),
                (8, 120, 'Model-08', '', 1),
                (9, 500, 'Model-09', '', 3),
                (10, 680, 'Model-10', '', 2);

INSERT INTO accept
VALUES	('JuilnwZa', 2),
				('SunSingaSong', 3),
                ('SunSingaSong', 4),
                ('JuilnwZa', 5);
                
INSERT INTO contain
VALUES	(1, 1, 10),
				(1, 2, 5),
                (1, 3, 20),
                (2, 10, 5),
                (2, 4, 2),
                (3, 5, 20),
                (4, 6, 10),
                (4, 9, 3),
                (5, 7, 1),
                (5, 8, 10);

INSERT INTO quotation
VALUES	(2, CURDATE(), 5400),
				(3, CURDATE(), 4000),
                (4, CURDATE(), 5500),
                (5, CURDATE(), 21200);