import React from 'react';
import './CourseCard.scss';

const CourseCard = function({ course }) {
	// destructure all the course information b/c it's an object
	const {
		student_email: studentEmail,
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
			<p>{studentEmail}</p>
			<p>{courseId}</p>
			<p>{courseName}</p>
			<p>{courseDescription}</p>
			<p>{lateDropDeadline}</p>
			<p>{professorEmail}</p>
			<p>{professorName}</p>
			<p>{officeAddress}</p>
		</div>
	);
};

export default CourseCard;
