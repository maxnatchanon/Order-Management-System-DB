create database company_project;
use company_project;
create table customer_company(
    cus_id int not null,
    cus_password varchar(20) not null,
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
    primary key (admin_username)
);
create table orders(			#cannot use the name order, not valid
    order_id int not null,
    order_date date not null check(order_date>'2005-01-01'),
    cus_id int not null,
    order_status varchar(20) not null,
    primary key (order_id),
    foreign key (cus_id) references customer_company(cus_id) on delete cascade
);
create table work_on(
    order_id int not null,
    emp_id int not null,
    primary key (order_id,emp_id),
    foreign key (emp_id) references employee(emp_id) on delete cascade,
    foreign key (order_id) references orders(order_id) on delete cascade
);
create table outsource_company(
    out_id int not null,
    out_name varchar(20) not null,
    out_addr varchar(200) not null,
    out_tel varchar(10) not null,
    out_email varchar(30) not null,
    primary key (out_id)
);
create table hire(
    order_id int not null,
    out_id int not null,
    primary key (order_id,out_id),
    foreign key (order_id) references orders(order_id) on delete cascade,
    foreign key (out_id) references outsource_company(out_id) on delete cascade
);
create table model(
    model_id int not null,
    model_price int not null check(model_price>0),
    model_name varchar(30) not null,
    blueprint varchar(200) not null,
    cus_id int not null,
    primary key (model_id),
    foreign key (cus_id) references customer_company(cus_id)
);
create table contain(
    order_id int not null,
    model_id int not null,
    quantity int unsigned not null,
    primary key (order_id,model_id),
    foreign key (order_id) references orders(order_id) on delete cascade,
    foreign key (model_id) references model(model_id) on delete cascade
);
create table accept(
    admin_username varchar(20) not null,
    order_id int not null,
    foreign key (admin_username) references web_admin(admin_username),
    foreign key (order_id) references orders(order_id),
    primary key (admin_username,order_id)
);
create table send(
    cus_id int not null,
    order_id int not null,
    foreign key (cus_id) references customer_company(cus_id),
    foreign key (order_id) references orders(order_id),
    primary key (cus_id,order_id)
);
create table quotation(
    order_id int not null,
    quo_date date not null check(quo_date>'2005-01-01'), 
    quo_price int not null check(quo_price>0),
    primary key (order_id),
    foreign key (order_id) references orders(order_id) on delete cascade
	);
create table bill(
	order_id int not null,
    bill_date date not null,
    bill_price int not null check(bill_price>0),
    payment_date date not null check (payment_date>'2005-01-01'),
    primary key (order_id) ,
    foreign key (order_id) references orders(order_id) on delete cascade
	);
create table sell_order(
	order_id int not null,
    sell_date date not null check (sell_date>'2005-01-01'), 
    sell_price date not null check(sell_price>0), 
    primary key (order_id),
    foreign key (order_id) references orders(order_id) on delete cascade
	);
