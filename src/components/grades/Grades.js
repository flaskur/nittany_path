import React from 'react';
import './Grades.scss';
import { useParams } from 'react-router-dom';

const Grades = function() {
	const [ homeworkGrades, setHomeworkGrades ] = React.useState([]);
	const [ examGrades, setExamGrades ] = React.useState([]);

	const { course, section } = useParams();

	React.useEffect(
		() => {
			fetch(`http://localhost:3001/courses/${course}/${section}/grades/homework_grades`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => setHomeworkGrades(data))
				.catch((error) => console.log(error));
		},
		[ course, section ]
	);

	React.useEffect(
		() => {
			fetch(`http://localhost:3001/courses/${course}/${section}/grades/exam_grades`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => setExamGrades(data))
				.catch((error) => console.log(error));
		},
		[ course, section ]
	);

	return (
		<div className="grades">
			<p className="grades__title">
				Grades {course} Section {section}
			</p>

			<div className="grades__wrapper">
				<div className="grades__homeworks__wrapper">
					<p className="grades__homeworks__title">Homework Grades</p>

					{homeworkGrades.map((homeworkGrade) => {
						return (
							<div>
								<p className="grades__homeworks__entry">
									HW NO. {homeworkGrade.hw_no} GRADE: {homeworkGrade.grade}
								</p>
							</div>
						);
					})}
				</div>

				<div className="grades__exams__wrapper">
					<p className="grades__exams__title">Exam Grades</p>

					{examGrades.map((examGrade) => {
						return (
							<div>
								<p className="grades__exams__entry">
									EXAM NO. {examGrade.exam_no} GRADE: {examGrade.grade}
								</p>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Grades;
