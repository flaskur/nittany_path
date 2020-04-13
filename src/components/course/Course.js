import React from 'react';
import './Course.scss';
import { useHistory, useParams, Link } from 'react-router-dom';

const Course = function() {
	const { course, section } = useParams();

	const history = useHistory();

	const handleButtonClick = function() {
		fetch(`http://localhost:3001/courses/${course}/${section}/late_drop_deadline`, {
			headers: {
				authorization: localStorage.getItem('token')
			}
		})
			.then((response) => response.json())
			.then((data) => {
				let deadline = data.late_drop_deadline.split(' ');
				deadline[1] = deadline[1][0];
				deadline = deadline.join(' ');
				console.log(deadline);

				let value = prompt('Are you sure you want to drop this course? (yes/any)');

				console.log(Date.now(), Date.parse(deadline), Date.now() < Date.parse(deadline));

				// this if check should check date.now < new date(latedropdeadline), but you need to fetch that first.
				if (value.toLowerCase() === 'yes' && Date.now() < Date.parse(deadline)) {
					fetch(`http://localhost:3001/courses/${course}/${section}`, {
						headers: {
							authorization: localStorage.getItem('token'),
							'content-type': 'application/json'
						},
						method: 'DELETE'
					})
						.then((response) => response.json())
						.then((data) => {
							console.log(data.message);
							history.push('/courses');
						})
						.catch((error) => console.log(error));
				} else {
					console.log('An Error Has Occured!');
				}
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="course">
			<p className="course__title">{course}</p>

			<div className="course__wrapper">
				<Link className="course__link" to={`/courses/${course}/${section}/assignments`}>
					<p>Assignments</p>
				</Link>
				<Link className="course__link" to={`/courses/${course}/${section}/grades`}>
					<p>Grades</p>
				</Link>
				<Link className="course__link" to={`/courses/${course}/${section}/forum`}>
					<p>Forum</p>
				</Link>
			</div>

			<button className="course__button" onClick={handleButtonClick}>
				DROP COURSE
			</button>
		</div>
	);
};

export default Course;
