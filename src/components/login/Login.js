import React from 'react';
import './Login.scss';
import { useHistory } from 'react-router-dom';

const Login = function({ setEmail, setIsAuth }) {
	const [ emailInput, setEmailInput ] = React.useState('');
	const [ passwordInput, setPasswordInput ] = React.useState('');
	const [ errorMessage, setErrorMessage ] = React.useState('');

	const history = useHistory();

	const handleFormSubmit = async function(event) {
		event.preventDefault();
		console.log('form submits');

		try {
			// login doesn't need token auth.
			const response = await fetch('http://localhost:3001/login', {
				method: 'POST',
				headers: {
					'content-type': 'application/json'
				},
				body: JSON.stringify({
					email: emailInput,
					password: passwordInput
				})
			});

			// we get back the email and token to set as localstorage.
			const data = await response.json();

			if (data.message) {
				console.log(data.message);
				setErrorMessage(data.message);
				return;
			}

			localStorage.setItem('email', data.email);
			localStorage.setItem('token', data.token);

			// fix the state in the parent app component
			setEmail(localStorage.getItem('email'));
			setIsAuth(true);
		} catch (error) {
			console.log(error);
		}

		setEmailInput('');
		setPasswordInput('');

		history.push('/');
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

			<h2>{errorMessage}</h2>

			<p className="login__title">Nittany Path</p>

			<div className="login__wrapper">
				<p className="login__wrapper--title">Sign Into Your Existing Account!</p>

				<form className="login__form" onSubmit={handleFormSubmit}>
					<div className="login__email">
						<label className="login__email--label">Enter Email: </label>
						<input
							className="login__input"
							type="email"
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
