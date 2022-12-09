## Todo App

### Database
```sql
-- Database Todo
create database todo_app;

-- Tabel User
create table mst_user (
	id varchar(60) primary key,
	email varchar(50) not null,
	password varchar(100) not null,
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP
);

-- Tabel Todo
create table trx_todo (
	id varchar(60) primary key,
	name varchar(30) not null,
	is_completed boolean default false,
	user_id varchar(60),
	created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP,
	CONSTRAINT fk_todo_user
      FOREIGN KEY(user_id) 
	  REFERENCES mst_user(id)
);
```