create database esp8266_mysql;
use esp8266_mysql;

create table pinos
(
    id int,
    pino varchar(2) not null,
    horario timestamp not null,
    estado varchar(255) null
);

create unique index pinos_id_uindex
    on pinos (id);

alter table pinos
    add constraint pinos_pk
        primary key (id);

alter table pinos modify id int auto_increment;

