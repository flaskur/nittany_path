import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import Assignments from './components/assignments/Assignments';
import Courses from './components/courses/Courses';
import Forum from './components/forum/Forum';
import Grades from './components/grades/Grades';
import Home from './components/home/Home';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';

const App = function() {
	return (
		<div className="app">
			<Navbar />

			<Switch>
				<Route path="/" exact component={Home} />

				<Route path="/profile" exact component={Profile} />

				<Route path="/courses" exact component={Courses} />

				<Route path="/courses/:course/forum" exact component={Forum} />

				<Route path="/courses/:course/assignments" exact component={Assignments} />

				<Route path="/courses/:course/grades" exact component={Grades} />
			</Switch>
		</div>
	);
};

export default App;
