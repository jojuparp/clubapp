# --- !Ups

create table "clubs" (
  "id" int generated by default as identity(start with 1) not null primary key,
  "name" varchar not null,
);

create table "members" (
  "id" int generated by default as identity(start with 1) not null primary key,
  "name" varchar not null,
  "clubId" int not null
);

# --- !Downs

drop table "clubs" if exists;
drop table "members" if exists;