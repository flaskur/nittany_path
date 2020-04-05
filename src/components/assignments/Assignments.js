import React from 'react';
import './Assignments.scss';
import { useParams } from 'react-router-dom';

const Assignments = function() {
	const { course, section } = useParams();

	return (
		<div className="assignments">
			<h2>assignments page</h2>
			<h3>
				Course: {course} Section: {section}
			</h3>
		</div>
	);
};

export default Assignments;
