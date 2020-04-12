import React from 'react';
import './FacultyGrades.scss';
import { useParams } from 'react-router-dom';
import FormGrade from '../formgrade/FormGrade';

const FacultyGrades = function() {
	const [ grades, setGrades ] = React.useState([]);

	const { course, section, type, number } = useParams();

	// on initial render, fetches and set the grades for the course, section, type, number which all matter
	React.useEffect(
		() => {
			// handle the homework/exam difference on the backend with type param
			fetch(`http://localhost:3001/faculty/${course}/${section}/grades/${type}/${number}`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => setGrades(data))
				.catch((error) => console.log(error));
		},
		[ course, section, type, number ]
	);

	/**
	 * I pass this function to the FormGrade component so that it handles the form submission. It basically does a fetch patch request to update the grade entry. After that, I do another fetch call to refetch all the data, and rerender the component.
	 * 
	 * @param {string} newGrade 
	 */
	const changeGrade = function(newGrade, email) {
		fetch(`http://localhost:3001/faculty/${course}/${section}/grades/${type}/${number}`, {
			headers: {
				authorization: localStorage.getItem('token'),
				'content-type': 'application/json'
			},
			method: 'PATCH',
			body: JSON.stringify({ newGrade, email })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.message);

				fetch(`http://localhost:3001/faculty/${course}/${section}/grades/${type}/${number}`, {
					headers: {
						authorization: localStorage.getItem('token')
					}
				})
					.then((response) => response.json())
					.then((data) => {
						console.log('rerendering component...');
						setGrades(data);
					})
					.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="facultygrades">
			<p className="facultygrades__title">
				Edit Grades: {type[0].toUpperCase() + type.slice(1)} No. {number} {course} Section {section}
			</p>

			<div className="facultygrades__wrapper">
				<table className="facultygrades__table">
					<thead className="facultygrades__table__head">
						<tr className="facultygrades__table__head--row">
							<th className="facultygrades__table__head--header">Student Email</th>
							<th className="facultygrades__table__head--header">Change Grade</th>
							<th className="facultygrades__table__head--header">Current Grade</th>
						</tr>
					</thead>
				</table>

				<div className="facultygrades__table__body">
					{type === 'homework' ? (
						grades.map((grade) => {
							return (
								<div className="facultygrades__table__row" key={grade.student_email}>
									<p className="facultygrades__table__row--entry">{grade.student_email}</p>
									<FormGrade grade={grade} changeGrade={changeGrade} email={grade.student_email} />
									<p className="facultygrades__table__row--entry">{grade.grade}</p>
								</div>
							);
						})
					) : (
						grades.map((grade) => {
							return (
								<div className="facultygrades__table__row" key={grade.student_email}>
									<p className="facultygrades__table__row--entry">{grade.student_email}</p>
									<FormGrade changeGrade={changeGrade} email={grade.student_email} />
									<p className="facultygrades__table__row--entry">{grade.grade}</p>
								</div>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default FacultyGrades;
