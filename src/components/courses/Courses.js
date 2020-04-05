import React from 'react';
import './Courses.scss';
import CourseCard from '../coursecard/CourseCard';

const Courses = function({ email }) {
	const [ courses, setCourses ] = React.useState([]);
	const [ isStudent, setIsStudent ] = React.useState(false); // actually its either you have no courses or you're a professor.

	React.useEffect(
		() => {
			fetch('http://localhost:3001/courses', {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => {
					setCourses(data);
					setIsStudent(true);
				})
				.catch((error) => {
					console.log(error);
				});

			// ISSUE WITH ASYNC INSIDE OF EFFECT HOOK. CONVERTING TO PROMISES FIXES THIS. NOT JWT ISSUE.
		},
		[ email ]
	);

	return (
		<div className="courses">
			<h2>Your Current Enrolled Courses!</h2>

			{isStudent ? (
				courses.map((course) => {
					return <CourseCard key={course.course_id} course={course} />;
				})
			) : (
				<h2>you are not a student</h2>
			)}

			<h2>{email}</h2>
		</div>
	);
};

export default Courses;
