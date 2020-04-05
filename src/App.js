import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Assignments from './components/assignments/Assignments';
import Courses from './components/courses/Courses';
import Forum from './components/forum/Forum';
import Grades from './components/grades/Grades';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';

const App = function() {
	const [ email, setEmail ] = React.useState('');
	const [ isAuth, setIsAuth ] = React.useState(false); // should be used to protect the routes as front end auth. Technically not needed.

	React.useEffect(() => {
		const localToken = localStorage.getItem('token');
		if (!localToken) return;
		const localEmail = localStorage.getItem('email');

		// If we have a token, it implies that we are authenticated. You can technically gimmick this though.
		setEmail(localEmail);
		setIsAuth(true);
	}, []);

	return (
		<div className="app">
			<Navbar setEmail={setEmail} setIsAuth={setIsAuth} />

			<Switch>
				<Route path="/" exact component={Home} />

				<Route path="/login" exact render={() => <Login setEmail={setEmail} setIsAuth={setIsAuth} />} />

				<Route path="/profile" exact component={Profile} />

				<Route path="/courses" exact render={() => <Courses email={email} />} />

				<Route path="/courses/:course/forum" exact component={Forum} />

				<Route path="/courses/:course/assignments" exact component={Assignments} />

				<Route path="/courses/:course/grades" exact component={Grades} />
			</Switch>

			{/* inline elements have no padding, etc. */}
			<h3>{'email' + email}</h3>
			<h3>{'local email' + localStorage.getItem('email')}</h3>
			<h3>{'auth?' + isAuth.toString()}</h3>
			<h3>{'local token' + localStorage.getItem('token')}</h3>
		</div>
	);
};

export default App;
