import React from 'react';
import './Courses.scss';

import CourseCard from '../coursecard/CourseCard';

// We should do a fetch request to the backend and receive the list of courses for the particular user. We expect a user to be passed, identified by email probably.
const Courses = function({ email }) {
	// const [ courses, setCourses ] = React.useState([]);

	// React.useEffect(async () => {
	// 	console.log('course effects hook runs');

	// 	const response = await fetch(`http://localhost:3001/courses/${userEmail}`);

	// 	if (response.status === 404) {
	// 		// throw error
	// 	}

	// 	const coursesData = await response.json();
	// console.log(courseData);

	// 	// Does courses data come in as an object? If so you need to build courses arr. Also we should get prof info too right?
	// 	setCourses([]);
	// }, []);

	return (
		<div className="courses">
			<h2>Your Current Enrolled Courses!</h2>

			{/* {courses.map(course => {
				return (
					<CourseCard somepropshere/>
				);
			})} */}

			{/* This only makes sense to have if already authenticated. */}
			<h2>{email}</h2>
		</div>
	);
};

export default Courses;
