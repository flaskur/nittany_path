import React from 'react';
import './FacultyAssignments.scss';
import { useParams } from 'react-router-dom';

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
		[ homeworks, course, section ]
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
		[ exams, course, section ]
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
			<h2>
				This is faculty assignments meant to be a todolist that adds to assignments database based on course and
				section
			</h2>
			<form className="facultyassignments__form" onSubmit={handleFormSubmit}>
				<div className="facultyassignments__radio__wrapper">
					<div>
						<input type="radio" name="assignment_radio" value="homework" defaultChecked />
						<label>Homework</label>
					</div>
					<div>
						<input type="radio" name="assignment_radio" value="exam" />
						<label>Exam</label>
					</div>
				</div>
				<input
					className="facultyassignments__input"
					type="text"
					name="assignment_input"
					value={inputText}
					onChange={handleInputChange}
				/>
				<button type="submit">Submit</button>
			</form>

			<div className="facultyassignments__homeworks">
				{homeworks.map((homework) => {
					return (
						<div key={homework.hw_no}>
							<p>{homework.course_id}</p>
							<p>{homework.sec_no}</p>
							<p>{homework.hw_no}</p>
							<p>{homework.hw_details}</p>
						</div>
					);
				})}
			</div>

			<div className="facultyassignments__exams">
				{exams.map((exam) => {
					return (
						<div key={exam.exam_no}>
							<p>{exam.course_id}</p>
							<p>{exam.sec_no}</p>
							<p>{exam.exam_no}</p>
							<p>{exam.exam_details}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FacultyAssignments;
