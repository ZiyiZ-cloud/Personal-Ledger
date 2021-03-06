CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE expenses(
    id SERIAL PRIMARY KEY,
    amount FLOAT(20) NOT NULL,
    category TEXT NOT NULL,
    detail TEXT NOT NULL,
    date DATE NOT NULL,
    username VARCHAR(25)
        REFERENCES users ON DELETE CASCADE
);

