import React from 'react';
import './Grades.scss';
import { useParams } from 'react-router-dom';

const Grades = function() {
	const { course, section } = useParams();

	return (
		<div className="grades">
			<h2>grades page</h2>
			<h3>
				Course: {course} Section: {section}
			</h3>
		</div>
	);
};

export default Grades;
