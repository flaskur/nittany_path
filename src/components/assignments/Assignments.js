import React from 'react';
import './Assignments.scss';
import { useParams } from 'react-router-dom';

const Assignments = function() {
	const { course } = useParams();

	return (
		<div className="assignments">
			<h2>assignments page</h2>
			<h3>{course}</h3>
		</div>
	);
};

export default Assignments;
