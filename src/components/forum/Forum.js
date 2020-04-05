import React from 'react';
import './Forum.scss';
import { useParams } from 'react-router-dom';

const Forum = function() {
	const { course, section } = useParams();

	return (
		<div className="forum">
			<h2>forum page</h2>
			<h3>
				Course: {course} Section: {section}
			</h3>
		</div>
	);
};

export default Forum;
