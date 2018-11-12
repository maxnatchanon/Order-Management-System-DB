create database company_project;
use company_project;
create table customer_company(
	cus_id int not null,
    cus_name varchar(20) not null,
    cus_email varchar(30) not null,
    cus_tel varchar(15) not null,
    cus_addr varchar(100) not null,
    primary key (cus_id)
    );
create table client(
	cus_id int not null,
    client_name varchar(20) not null,
    client_email varchar(30) not null,
	cus_password varchar(20) not null,
    client_tel varchar(15) not null,
    primary key (cus_id,client_name),
    foreign key (cus_id) references customer_company(cus_id) on delete cascade
    );
create table employee(
	emp_id int not null,
    fname varchar(20) not null,
    lname varchar(20) not null,
    salary int not null,
    primary key (emp_id)
    );
create table web_admin(		#cannot use the name admin, not valid
	admin_username varchar(20) not null,
    admin_password varchar(20) not null,
    admin_name varchar(20) not null,
    primary key (admin_user)
	);
create table orders(			#cannot use the name order, not valid
	order_id int not null,
    order_date varchar(10) not null,
    admin_username varchar(20) not null,
    cus_id int not null,
    primary key (order_id),
    foreign key (cus_id) references customer_company(cus_id),
    foreign key (admin_username) references web_admin(admin_username)
	);
create table work_on(
	order_id int not null,
	cus_id int not null,
    primary key (order_id,cus_id),
    foreign key (cus_id) references customer_company(cus_id),
    foreign key (order_id) references orders(oder_id)
	);
