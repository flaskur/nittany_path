import React from 'react';
import './Profile.scss';

const Profile = function({ email }) {
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
		</div>
	);
};

export default Profile;
