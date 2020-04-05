import React from 'react';
import './Course.scss';
import { useParams, Link } from 'react-router-dom';

const Course = function() {
	const { course } = useParams();

	return (
		<div className="course">
			<p className="course__title">{course}</p>

			<div className="course__wrapper">
				<Link className="course__link" to={`/courses/${course}/assignments`}>
					<p>Assignments</p>
				</Link>
				<Link className="course__link" to={`/courses/${course}/grades`}>
					<p>Grades</p>
				</Link>
				<Link className="course__link" to={`/courses/${course}/forum`}>
					<p>Forum</p>
				</Link>
			</div>
		</div>
	);
};

export default Course;
