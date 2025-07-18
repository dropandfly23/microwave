# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

### 'database script to init db'

create table users (
id uuid primary key default gen_random_uuid(),
name text not null,
email text unique not null,
avatar text,
role text default 'user'
);

create table microwaves (
id integer primary key generated always as identity,
name text not null,
location text not null,
power integer not null,
max_time integer not null,
status text check (status in ('available', 'occupied', 'maintenance')) not null default 'available',
current_user_name text,
image text
);

create table reservations (
id integer primary key generated always as identity,
microwave_id integer references microwaves(id) on delete cascade,
user_id uuid references users(id) on delete cascade,
user_name text not null,
start_time timestamp with time zone not null,
end_time timestamp with time zone not null,
duration integer not null,
purpose text,
status text check (status in ('active', 'cancelled', 'completed')) default 'active'
);

drop table reservations;
drop table users;
drop table microwaves;



-- Insert user (en supposant un UUID généré manuellement ici, car dans ton mock l'id est 1, mais ta table attend un uuid)
-- Je génère un uuid fixe pour l'exemple (à remplacer par un UUID réel)
INSERT INTO users (id, name, email, avatar, role) VALUES
('00000000-0000-0000-0000-000000000001', 'John Doe', 'john@company.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 'user');


-- Insert user
INSERT INTO users (name, email, avatar, role) VALUES
('John Doe', 'tatak@company.com', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', 'user');

-- Insert microwaves
INSERT INTO microwaves (name, location, power, max_time, status, current_User_Name, image) VALUES
('Kitchen Microwave A', 'Main Kitchen - Floor 1', 1000, 30, 'available', NULL, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'),
('Break Room Microwave', 'Break Room - Floor 2', 800, 25, 'occupied', 'Sarah Wilson', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'),
('Cafeteria Microwave 1', 'Cafeteria - Ground Floor', 1200, 35, 'available', NULL, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'),
('Cafeteria Microwave 2', 'Cafeteria - Ground Floor', 1200, 35, 'maintenance', NULL, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'),
('Executive Floor Microwave', 'Executive Lounge - Floor 5', 900, 20, 'available', NULL, 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop'),
('Lab Microwave', 'Research Lab - Floor 3', 700, 15, 'occupied', 'Mike Johnson', 'https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400&h=200&fit=crop');

-- Insert reservations
-- Note : user_id should be UUID from users table, here we need to retrieve user ids accordingly.
-- For example purposes, I use a SELECT to get user id by email.
INSERT INTO reservations (microwave_id, user_id, user_name, start_time, end_time, duration, purpose, status) VALUES
(
2,
(SELECT id FROM users WHERE email = 'sarah@company.com'),
'Sarah Wilson',
NOW(),
NOW() + INTERVAL '10 minutes',
10,
'Heating lunch',
'active'
),
(
6,
(SELECT id FROM users WHERE email = 'mike@company.com'),
'Mike Johnson',
NOW(),
NOW() + INTERVAL '5 minutes',
5,
'Warming coffee',
'active'
);
