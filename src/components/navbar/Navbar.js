import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = function({ setEmail, isAuth, setIsAuth }) {
	const handleLogoutClick = function() {
		console.log('logout was triggered');

		setEmail('');
		setIsAuth(false);

		localStorage.removeItem('email');
		localStorage.removeItem('token');
	};

	return (
		<div className="navbar">
			<div className="navbar__left">
				<Link to="/" className="navbar__left--link">
					Nittany Path
				</Link>
			</div>

			<div className="navbar__right">
				{/* These links need to be protected routes only if authenticated. Otherwise, only logout button. */}
				<Link to="/courses" className="navbar__right--link">
					Courses
				</Link>

				<Link to="/faculty" className="navbar__right--link">
					Faculty
				</Link>

				<Link to="/profile" className="navbar__right--link">
					Profile
				</Link>

				{isAuth ? (
					<button className="navbar__right--button" onClick={handleLogoutClick}>
						Logout
					</button>
				) : (
					<Link to="/login" className="navbar__right--link">
						Login
					</Link>
				)}
			</div>
		</div>
	);
};

export default Navbar;
