import React from 'react';
import './FacultyCard.scss';
import { Link } from 'react-router-dom';

const FacultyCard = function({ course, sectionNumber }) {
	const { teaching: courseId, course_name: courseName, course_description: courseDescription } = course;

	return (
		<div className="facultycard">
			<div className="facultycard__left">
				<p className="facultycard__title">{courseId}</p>
				<p>{courseName}</p>
				<p>{courseDescription}</p>
				<p>Section {sectionNumber}</p>
			</div>
			<div className="facultycard__right">
				<Link className="facultycard__link" to={`/faculty/${courseId}/${sectionNumber}`}>
					<p>Continue</p>
				</Link>
			</div>
		</div>
	);
};

export default FacultyCard;
