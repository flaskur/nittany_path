import React from 'react';
import './Courses.scss';
import CourseCard from '../coursecard/CourseCard';

const Courses = function({ email }) {
	const [ courses, setCourses ] = React.useState([]);
	const [ isStudent, setIsStudent ] = React.useState(false);

	React.useEffect(
		() => {
			fetch('http://localhost:3001/courses', {
				headers: {
					authorization: localStorage.getItem('token') // this has the email
				}
			})
				.then((response) => response.json())
				.then((data) => {
					setCourses(data);
					if (data.length !== 0) {
						setIsStudent(true);
					}
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
			<div className="courses__wrapper">
				{isStudent && <p className="courses__title">Your Current Enrolled Courses!</p>}
				{isStudent ? (
					courses.map((course) => {
						return <CourseCard key={course.course_id} course={course} />;
					})
				) : (
					<p className="courses__error">You Do Not Have Enrolled Courses</p>
				)}
			</div>
		</div>
	);
};

export default Courses;
