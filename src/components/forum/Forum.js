import React from 'react';
import './Forum.scss';
import { useParams } from 'react-router-dom';

const Forum = function() {
	const { course } = useParams();

	return (
		<div className="forum">
			<h2>forum page</h2>
			<h3>{course}</h3>
		</div>
	);
};

export default Forum;
