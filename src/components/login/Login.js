import React from 'react';
import './Login.scss';

const Login = function() {
	const [ emailInput, setEmailInput ] = React.useState('');
	const [ passwordInput, setPasswordInput ] = React.useState('');

	const handleFormSubmit = function(event) {
		event.preventDefault();
		console.log('form submits');
		setEmailInput('');
		setPasswordInput('');
	};

	const handleInputChange = function(event) {
		let name = event.target.name;

		if (name === 'email') setEmailInput(event.target.value);
		if (name === 'password') setPasswordInput(event.target.value);
	};

	return (
		<div className="login">
			<p>Dummy Login</p>
			<p>email: ae4536@nittany.edu</p>
			<p>password: mxdgxmjn</p>

			<p className="login__title">Nittany Path</p>

			<div className="login__wrapper">
				<p className="login__wrapper--title">Sign Into Your Existing Account!</p>

				<form className="login__form" onSubmit={handleFormSubmit}>
					<div className="login__email">
						<label className="login__email--label">Enter Email: </label>
						<input
							className="login__input"
							type="text"
							name="email"
							value={emailInput}
							placeholder="email"
							onChange={handleInputChange}
						/>
					</div>
					<div className="login__password">
						<label className="login__password--label">Enter Password: </label>
						<input
							className="login__input"
							type="password"
							name="password"
							value={passwordInput}
							placeholder="password"
							onChange={handleInputChange}
						/>
					</div>

					<button className="login__form--button" type="submit">
						Continue
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
