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
					requests daily!
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
				<p>footer</p>
			</div>
		</div>
	);
};

export default Home;
