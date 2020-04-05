import React from 'react';
import './CourseCard.scss';
import { Link } from 'react-router-dom';

const CourseCard = function({ course }) {
	// destructure all the course information b/c it's an object
	const {
		course_id: courseId,
		course_name: courseName,
		course_description: courseDescription,
		late_drop_deadline: lateDropDeadline,
		email: professorEmail,
		name: professorName,
		office_address: officeAddress
	} = course;

	return (
		<div className="coursecard">
			<div className="coursecard__left">
				<p className="coursecard__title">{courseId}</p>
				<p>{courseName}</p>
				<p>{courseDescription}</p>
			</div>
			<div className="coursecard__middle">
				<p>{lateDropDeadline}</p>
				<p>{professorEmail}</p>
				<p>{professorName}</p>
				<p>{officeAddress}</p>
			</div>
			<div className="coursecard__right">
				<Link className="coursecard__link" to={`/courses/${courseId}`}>
					<p>Continue</p>
				</Link>
			</div>
		</div>
	);
};

export default CourseCard;
