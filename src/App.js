import React from 'react';
import './App.scss';
import { Switch, Route, Redirect } from 'react-router-dom';

import Assignments from './components/assignments/Assignments';
import Course from './components/course/Course';
import Courses from './components/courses/Courses';
import Faculty from './components/faculty/Faculty';
import FacultyAssignments from './components/facultyassignments/FacultyAssignments';
import FacultyCourse from './components/facultycourse/FacultyCourse';
import FacultyGrades from './components/facultygrades/FacultyGrades';
import FacultyForum from './components/facultyforum/FacultyForum';
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
			<Navbar setEmail={setEmail} isAuth={isAuth} setIsAuth={setIsAuth} />

			<Switch>
				<Route path="/" exact render={() => <Home isAuth={isAuth} />} />

				<Route path="/login" exact render={() => <Login setEmail={setEmail} setIsAuth={setIsAuth} />} />

				<Route
					path="/profile"
					exact
					render={() => (isAuth ? <Profile email={email} /> : <Redirect to="/" />)}
				/>

				<Route
					path="/courses"
					exact
					render={() => (isAuth ? <Courses email={email} /> : <Redirect to="/" />)}
				/>
				<Route
					path="/courses/:course/:section"
					exact
					render={() => (isAuth ? <Course /> : <Redirect to="/" />)}
				/>
				<Route
					path="/courses/:course/:section/assignments"
					exact
					render={() => (isAuth ? <Assignments /> : <Redirect to="/" />)}
				/>
				<Route
					path="/courses/:course/:section/grades"
					exact
					render={() => (isAuth ? <Grades /> : <Redirect to="/" />)}
				/>
				<Route
					path="/courses/:course/:section/forum"
					exact
					render={() => (isAuth ? <Forum /> : <Redirect to="/" />)}
				/>

				<Route
					path="/faculty"
					exact
					render={() => (isAuth ? <Faculty email={email} /> : <Redirect to="/" />)}
				/>
				<Route
					path="/faculty/:course/:section"
					exact
					render={() => (isAuth ? <FacultyCourse /> : <Redirect to="/" />)}
				/>
				<Route
					path="/faculty/:course/:section/assignments"
					exact
					render={() => (isAuth ? <FacultyAssignments /> : <Redirect to="/" />)}
				/>
				<Route
					path="/faculty/:course/:section/grades/:type/:number"
					exact
					render={() => (isAuth ? <FacultyGrades /> : <Redirect to="/" />)}
				/>
				<Route
					path="/faculty/:course/:section/forum"
					exact
					render={() => (isAuth ? <FacultyForum /> : <Redirect to="/" />)}
				/>

				{/* remember to do auth checking for these routes. */}
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
