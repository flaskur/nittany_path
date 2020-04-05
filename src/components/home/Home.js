import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = function() {
	return (
		<div className="home">
			<div className="home__header">
				<p className="home__header--title">A Innovative Way to Handle Your Courses!</p>
				<p className="home__header--text">
					Nittany Path is the leading software for managing educational courses. We handle thousands of user
					requests daily! Please start by logging in.
				</p>

				{/* Button should be conditionally rendered, based on login state. */}
				<Link to="/courses" className="home__header--link">
					View Courses
				</Link>
			</div>

			<div className="home__main">
				<p>main</p>
			</div>

			<div className="home__footer">
				<div className="home__footer--left">
					<a href="https://github.com/flaskur/nittany_path" target="_blank" rel="noopener noreferrer">
						UI Source Code Link
					</a>
					<a href="https://github.com/flaskur/nittany_path_api" target="_blank" rel="noopener noreferrer">
						API Source Code Link
					</a>
				</div>

				<div className="home__footer--right">
					<p className="home__footer--name">Teng Lin</p>
				</div>
			</div>
		</div>
	);
};

export default Home;
