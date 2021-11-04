ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';

CREATE database users_express;

USE users_express;

CREATE TABLE users(
ID INT Primary key,
firstName VARCHAR(255) NOT NULL,
lastName VARCHAR(255) NOT NULL
)AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

insert into users values ('1','Courtney','Hodkiewicz'),
                             ('2','Marielle','Kuhlman'),
                             ('3','Emmanuel','Gleichner'),
                             ('4','Hertha','Goodwin'),
                             ('5','Ewald','Sauer');
