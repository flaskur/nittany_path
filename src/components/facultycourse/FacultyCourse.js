import React from 'react';
import './FacultyCourse.scss';
import { useParams, Link } from 'react-router-dom';

const FacultyCourse = function() {
	const { course, section } = useParams();

	return (
		<div className="facultycourse">
			<p className="facultycourse__title">{course}</p>

			<div className="facultycourse__wrapper">
				<Link className="facultycourse__link" to={`/faculty/${course}/${section}/assignments`}>
					<p>Create Assignments</p>
				</Link>
				<Link className="facultycourse__link" to={`/faculty/${course}/${section}/grades`}>
					<p>Add Grades</p>
				</Link>
				<Link className="facultycourse__link" to={`/faculty/${course}/${section}/forum`}>
					<p>Forum</p>
				</Link>
			</div>
		</div>
	);
};

export default FacultyCourse;
