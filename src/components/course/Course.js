import React from 'react';
import './Course.scss';
import { useParams, Link } from 'react-router-dom';

const Course = function() {
	const { course, section } = useParams();

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
		</div>
	);
};

export default Course;
