import React from 'react';
import './HomeCard.scss';

const HomeCard = function({ icon, description }) {
	return (
		<div className="homecard">
			<div className="homecard__icon">{icon}</div>
			<p className="homecard__description">{description}</p>
		</div>
	);
};

export default HomeCard;
