import React from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';

const Navbar = function() {
	// This should remove all auth information from local storage, change state to not authorized, and redirect to the homepage. Do I need a fetch request?
	const handleLogoutClick = function() {
		console.log('logout was triggered');
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

				<Link to="/login" className="navbar__right--link">
					Login
				</Link>

				<button className="navbar__right--button" onClick={handleLogoutClick}>
					Logout
				</button>

				<Link to="/register" className="navbar__right--link">
					Register
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
