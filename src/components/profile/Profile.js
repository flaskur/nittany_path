import React from 'react';
import './Profile.scss';
import { useHistory } from 'react-router-dom';

const Profile = function({ email }) {
	const [ currentPassword, setCurrentPassword ] = React.useState('');
	const [ newPassword, setNewPassword ] = React.useState('');
	const [ confirmPassword, setConfirmPassword ] = React.useState('');
	const [ errorMessage, setErrorMessage ] = React.useState('');

	const currentRef = React.useRef(null);
	const newRef = React.useRef(null);
	const confirmRef = React.useRef(null);

	const history = useHistory();

	let isStudent = false;

	// All student emails are 18 chars, professors are 16.
	if (email.length === 18) isStudent = true;

	const [ profile, setProfile ] = React.useState({});

	React.useEffect(
		() => {
			if (isStudent) {
				fetch('http://localhost:3001/profile/student', {
					headers: {
						authorization: localStorage.getItem('token')
					}
				})
					.then((response) => response.json())
					.then((data) => setProfile(data))
					.catch((error) => console.log(error));
			} else {
				fetch('http://localhost:3001/profile/faculty', {
					headers: {
						authorization: localStorage.getItem('token')
					}
				})
					.then((response) => response.json())
					.then((data) => setProfile(data))
					.catch((error) => console.log(error));
			}
		},
		[ isStudent ]
	);

	const handleFormSubmit = function(event) {
		event.preventDefault();

		let currentValue = currentRef.current.value;
		let newValue = newRef.current.value;
		let confirmValue = confirmRef.current.value;

		// I would need to actually check the backend for current password compare. I can do the new and confirm password check in the front end though. This is a post request and you attach to the body. I need to differentiate between faculty and student, which isStudent does.

		if (newValue === confirmValue) {
			fetch(`http://localhost:3001/profile`, {
				headers: {
					authorization: localStorage.getItem('token'),
					'content-type': 'application/json'
				},
				method: 'PATCH',
				body: JSON.stringify({
					currentPassword: currentValue,
					newPassword: newValue,
					confirmPassword: confirmValue,
					isStudent
				})
			})
				.then((response) => response.json())
				.then((data) => {
					if (data.message === 'successful reset password') {
						history.push('/');
					} else {
						setErrorMessage(data.message);
					}
				})
				.catch((error) => console.log(error));
		} else {
			setErrorMessage("New/Confirm Don't Match");
			return;
		}

		setCurrentPassword('');
		setNewPassword('');
		setConfirmPassword('');
	};

	return (
		<div className="profile">
			{isStudent ? (
				<div className="profile__wrapper">
					<p className="profile__title">You Are A Student!</p>
					<p className="profile__text">Name: {profile.name}</p>
					<p className="profile__text">Email: {profile.email}</p>
					<p className="profile__text">
						Age: {profile.age} Gender: {profile.gender}
					</p>
					<p className="profile__text">Major: {profile.major}</p>
					<p className="profile__text">Street: {profile.street}</p>
					<p className="profile__text">Zipcode: {profile.zipcode}</p>
				</div>
			) : (
				<div className="profile__wrapper">
					<p className="profile__title">You Are A Professor!</p>
					<p className="profile__text">Name: {profile.name}</p>
					<p className="profile__text">Email: {profile.email}</p>
					<p className="profile__text">
						Age: {profile.age} Gender: {profile.gender}
					</p>
					<p className="profile__text">Office: {profile.office_address}</p>
					<p className="profile__text">Department: {profile.department}</p>
					<p className="profile__text">Title: {profile.title}</p>
					<p className="profile__text">Teaching Course: {profile.teaching}</p>
				</div>
			)}

			<p className="profile__error__message">{errorMessage}</p>

			<div className="profile__reset">
				<p className="profile__reset__title">Reset Password</p>
				<form className="profile__form" onSubmit={handleFormSubmit}>
					<div className="profile__input__wrapper">
						<label className="profile__input__label" htmlFor="current">
							Current Password
						</label>
						<input
							id="current"
							className="profile__input"
							type="text"
							value={currentPassword}
							onChange={(event) => setCurrentPassword(event.target.value)}
							ref={currentRef}
							required
						/>
					</div>

					<div className="profile__input__wrapper">
						<label className="profile__input__label" htmlFor="new">
							New Password
						</label>
						<input
							id="new"
							className="profile__input"
							type="password"
							value={newPassword}
							onChange={(event) => setNewPassword(event.target.value)}
							ref={newRef}
							required
						/>
					</div>

					<div className="profile__input__wrapper">
						<label className="profile__input__label" htmlFor="confirm">
							Confirm Password
						</label>
						<input
							id="confirm"
							className="profile__input"
							type="password"
							value={confirmPassword}
							onChange={(event) => setConfirmPassword(event.target.value)}
							ref={confirmRef}
							required
						/>
					</div>

					<button className="profile__button" type="submit">
						Reset
					</button>
				</form>
			</div>
		</div>
	);
};

export default Profile;
