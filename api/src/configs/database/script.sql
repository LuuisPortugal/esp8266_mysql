create table if not exists esp8266_mysql.pinos (id int auto_increment, pino varchar(3) not null,	descricao text null,	tipo varchar(10) not null,	constraint pinos_id_uindex unique (id),	constraint pinos_pino_uindex unique (pino)); alter table esp8266_mysql.pinos add primary key (id); create table if not exists esp8266_mysql.pinos_valores(id int auto_increment,	pino varchar(3) not null,	horario timestamp not null,	valor varchar(255) null,	constraint pinos_valores_id_uindex unique (id)); alter table esp8266_mysql.pinos_valores add primary key (id);