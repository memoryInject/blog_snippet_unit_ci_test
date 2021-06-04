const bcrypt = require('bcryptjs');

const users = `
  DELETE FROM users;
  insert into users (username, email, password) values ('Dev Oake', 'doake0@liveinternet.ru', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Pris Kaes', 'pkaes1@virginia.edu', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Herve Phateplace', 'hphateplace2@edublogs.org', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Katharina Goning', 'kgoning3@netlog.com', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Gabbie Garret', 'ggarret4@google.co.jp', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Harley Frood', 'hfrood5@phoca.cz', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Muffin Ronaldson', 'mronaldson6@tamu.edu', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Elia Gover', 'egover7@booking.com', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Holly Treadgold', 'htreadgold8@ibm.com', '${bcrypt.hashSync(
    '123456',
    10
  )}');
  insert into users (username, email, password) values ('Clemence Carbery', 'ccarbery9@foxnews.com', '${bcrypt.hashSync(
    '123456',
    10
  )}');
`;

module.exports = users;
