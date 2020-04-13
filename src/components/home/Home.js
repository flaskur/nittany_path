import React from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
import HomeCard from '../homecard/HomeCard';
import { FaSchool, FaPencilAlt } from 'react-icons/fa';
import { MdSchool, MdNotifications } from 'react-icons/md';

const Home = function({ isAuth }) {
	return (
		<div className="home">
			<div className="home__header">
				<p className="home__header--title">A Innovative Way to Handle Your Courses!</p>
				<p className="home__header--text">
					Nittany Path is the leading software for managing educational courses. We handle thousands of user
					requests daily! Please start by logging in.
				</p>

				{!isAuth && (
					<Link to="/login" className="home__header--link">
						Login!
					</Link>
				)}
			</div>

			<div className="home__main">
				<HomeCard
					icon={<FaSchool />}
					description={'Readily access your course information with a click of a button!'}
				/>
				<HomeCard
					icon={<MdSchool />}
					description={'Gain insights by communicating directly with your class!'}
				/>
				<HomeCard
					icon={<FaPencilAlt />}
					description={'Access and manage all your course homework and exam grades!'}
				/>
				<HomeCard
					icon={<MdNotifications />}
					description={'Easily connect and contribute to an educational environment!'}
				/>
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
