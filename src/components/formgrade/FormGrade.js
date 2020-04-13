import React from 'react';
import './FormGrade.scss';

const FormGrade = function({ changeGrade, email }) {
	const [ inputGrade, setInputGrade ] = React.useState('');

	const handleFormSubmit = function(event) {
		event.preventDefault();
		changeGrade(inputGrade, email);
		setInputGrade('');
	};

	return (
		<div className="formgrade">
			<form className="formgrade__form" onSubmit={handleFormSubmit}>
				<input
					className="formgrade__input"
					type="number"
					min="0.0"
					max="100.0"
					name="grade"
					value={inputGrade}
					onChange={(event) => setInputGrade(event.target.value)}
					required
				/>
				<button className="formgrade__button" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
};

export default FormGrade;
