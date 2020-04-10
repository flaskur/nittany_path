import React from 'react';
import './FacultyAssignments.scss';
import { useParams, Link } from 'react-router-dom';

const FacultyAssignments = function() {
	const [ homeworks, setHomeworks ] = React.useState([]);
	const [ exams, setExams ] = React.useState([]);
	const [ inputText, setInputText ] = React.useState('');

	const { course, section } = useParams();

	React.useEffect(
		() => {
			fetch(`http://localhost:3001/faculty/${course}/${section}/assignments/homeworks`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => setHomeworks(data))
				.catch((error) => console.log(error));
		},
		[ course, section ]
	);
	React.useEffect(
		() => {
			fetch(`http://localhost:3001/faculty/${course}/${section}/assignments/exams`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => setExams(data))
				.catch((error) => console.log(error));
		},
		[ course, section ]
	);

	const handleFormSubmit = function(event) {
		event.preventDefault();

		let typeAssignment = event.target.assignment_radio.value;
		let details = event.target.assignment_input.value;

		if (typeAssignment === 'homework') {
			fetch(`http://localhost:3001/faculty/${course}/${section}/assignments/homework_max`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => {
					fetch(`http://localhost:3001/faculty/${course}/${section}/assignments/homeworks`, {
						headers: {
							authorization: localStorage.getItem('token'),
							'content-type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify({
							homeworkNumber: data.homework_max + 1,
							homeworkDetails: details
						})
					})
						.then((response) => response.json)
						.then((data) => console.log('message', data.message))
						.catch((error) => console.log(error));
				})
				.catch((error) => console.log(error));
		} else if (typeAssignment === 'exam') {
			fetch(`http://localhost:3001/faculty/${course}/${section}/assignments/exam_max`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => {
					fetch(`http://localhost:3001/faculty/${course}/${section}/assignments/exams`, {
						headers: {
							authorization: localStorage.getItem('token'),
							'content-type': 'application/json'
						},
						method: 'POST',
						body: JSON.stringify({
							examNumber: data.exam_max + 1,
							examDetails: details
						})
					})
						.then((response) => response.json())
						.then((data) => console.log(data.message))
						.catch((error) => console.log(error));
				})
				.catch((error) => console.log(error));
		}

		setInputText('');
	};

	const handleInputChange = function(event) {
		setInputText(event.target.value);
	};

	return (
		<div className="facultyassignments">
			<p className="facultyassignments__title">Create Assignments</p>
			<form className="facultyassignments__form" onSubmit={handleFormSubmit}>
				<div className="facultyassignments__radio__wrapper">
					<div>
						<input
							className="facultyassignments__radio"
							type="radio"
							name="assignment_radio"
							value="homework"
							defaultChecked
						/>
						<label className="facultyassignments__label">Homework</label>
					</div>
					<div>
						<input
							className="facultyassignments__radio"
							type="radio"
							name="assignment_radio"
							value="exam"
						/>
						<label className="facultyassignments__label">Exam</label>
					</div>
				</div>
				<div className="facultyassignments__input__wrapper">
					<input
						className="facultyassignments__input"
						type="text"
						name="assignment_input"
						value={inputText}
						onChange={handleInputChange}
					/>
					<button className="facultyassignments__button" type="submit">
						Submit
					</button>
				</div>
			</form>

			<div className="facultyassignments__wrapper">
				<div className="facultyassignments__homeworks__wrapper">
					{homeworks.map((homework) => {
						return (
							<div key={homework.hw_no}>
								<p className="facultyassignments__homeworks__entry">
									HW NO. {homework.hw_no}: {homework.hw_details}
								</p>
								{/* You need an identifier to make sure that it's a homework or exam type. You can pass as param again. */}
								<Link
									className="facultyassignments__link"
									to={`/faculty/${course}/${section}/grades/homework/${homework.hw_no}`}
								>
									Grade >>
								</Link>
							</div>
						);
					})}
				</div>

				<div className="facultyassignments__exams__wrapper">
					{exams.map((exam) => {
						return (
							<div key={exam.exam_no}>
								<p className="facultyassignments__exams__entry">
									EXAM NO. {exam.exam_no}: {exam.exam_details}
								</p>
								<Link
									className="facultyassignments__link"
									to={`/faculty/${course}/${section}/grades/exam/${exam.exam_no}`}
								>
									Grade >>
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default FacultyAssignments;
