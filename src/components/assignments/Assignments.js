import React from 'react';
import './Assignments.scss';
import { useParams } from 'react-router-dom';

const Assignments = function() {
	const [ homeworks, setHomeworks ] = React.useState([]);
	const [ exams, setExams ] = React.useState([]);

	const { course, section } = useParams();

	React.useEffect(
		() => {
			fetch(`http://localhost:3001/courses/${course}/${section}/assignments/homeworks`, {
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
			fetch(`http://localhost:3001/courses/${course}/${section}/assignments/exams`, {
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

	return (
		<div className="assignments">
			<h2>assignments page</h2>
			<h3>
				Course: {course} Section: {section}
			</h3>
			<h2>Homeworks</h2>
			{homeworks.map((homework) => {
				return (
					<div>
						<p>{homework.course_id}</p>
						<p>Section: {homework.sec_no}</p>
						<p>Homework Number: {homework.hw_no}</p>
						<p>Details: {homework.hw_details}</p>
					</div>
				);
			})}
			<h2>Exams</h2>
			{exams.map((exam) => {
				return (
					<div>
						<p>{exam.course_id}</p>
						<p>Section: {exam.sec_no}</p>
						<p>Exam Number: {exam.exam_no}</p>
						<p>Details: {exam.exam_details}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Assignments;
