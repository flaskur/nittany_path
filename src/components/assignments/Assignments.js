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
			<p className="assignments__title">
				Assignments: {course} Section {section}
			</p>

			<div className="assignments__wrapper">
				<div className="assignments__homeworks__wrapper">
					<p className="assignments__homeworks__title">Homeworks</p>
					{homeworks.map((homework) => {
						return (
							<div key={homework.hw_no}>
								<p className="assignments__homeworks__entry">
									HW NO. {homework.hw_no}: {homework.hw_details}
								</p>
							</div>
						);
					})}
				</div>

				<div className="assignments__exams__wrapper">
					<p className="assignments__exams__title">Exams</p>
					{exams.map((exam) => {
						return (
							<div key={exam.exam_no}>
								<p className="assignments__exams__entry">
									EXAM NO. {exam.exam_no}: {exam.exam_details}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Assignments;
