import React from 'react';
import './FacultyGrades.scss';
import { useParams } from 'react-router-dom';
import FormGrade from '../formgrade/FormGrade';

const FacultyGrades = function() {
	const [ grades, setGrades ] = React.useState([]);

	const { course, section, type, number } = useParams();

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

	const changeGrade = function(newGrade) {
		fetch(`http://localhost:3001/faculty/${course}/${section}/grades/${type}/${number}`, {
			headers: {
				authorization: localStorage.getItem('token'),
				'content-type': 'application/json'
			},
			method: 'PATCH',
			body: JSON.stringify({ newGrade: newGrade })
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
					.then((data) => setGrades(data))
					.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));
	};

	return (
		<div className="facultygrades">
			<p className="facultygrades__title">
				Grade {type} No. {number} {course} Section {section}
			</p>

			<div className="facultygrades__wrapper">
				<p>Here we render a list of homework or exam grades</p>

				{type === 'homework' ? (
					grades.map((grade) => {
						return (
							<div key={grade.student_email}>
								<p>THESE ARE HOMEWORK INFO</p>
								<p>{grade.student_email}</p>
								<p>{grade.course_id}</p>
								<p>{grade.sec_no}</p>
								<p>{grade.hw_no}</p>
								<p>{grade.grade}</p>
								<FormGrade grade={grade} changeGrade={changeGrade} />
							</div>
						);
					})
				) : (
					grades.map((grade) => {
						return (
							<div key={grade.student_email}>
								<p>THESE ARE EXAM INFO</p>
								<p>{grade.student_email}</p>
								<p>{grade.course_id}</p>
								<p>{grade.sec_no}</p>
								<p>{grade.exam_no}</p>
								<p>{grade.grade}</p>
								<FormGrade grade={grade} changeGrade={changeGrade} />
							</div>
						);
					})
				)}
			</div>
		</div>
	);
};

export default FacultyGrades;
