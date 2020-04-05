import React from 'react';
import './Grades.scss';
import { useParams } from 'react-router-dom';

const Grades = function() {
	const { course } = useParams();

	return (
		<div className="grades">
			<h2>grades page</h2>
			<h3>{course}</h3>
		</div>
	);
};

export default Grades;
