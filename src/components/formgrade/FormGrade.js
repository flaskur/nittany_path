import React from 'react';
import './FormGrade.scss';

const FormGrade = function({ grade, changeGrade }) {
	const [ inputGrade, setInputGrade ] = React.useState('');

	const handleFormSubmit = function(event) {
		event.preventDefault();
		changeGrade(inputGrade);
	};

	return (
		<div className="formgrade">
			<form className="formgrade__form" onSubmit={handleFormSubmit}>
				<input
					className="formgrade__input"
					type="number"
					min="0"
					max="100"
					name="grade"
					value={inputGrade}
					onChange={(event) => setInputGrade(event.target.value)}
				/>
				<button className="formgrade__button" type="submit">
					Submit Grade
				</button>
			</form>
			<p>Real Grade is {grade.grade}</p>
		</div>
	);
};

export default FormGrade;
