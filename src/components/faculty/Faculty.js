import React from 'react';
import './Faculty.scss';
import FacultyCard from '../facultycard/FacultyCard';

const Faculty = function({ email }) {
	const [ course, setCourse ] = React.useState({});
	const [ isFaculty, setIsFaculty ] = React.useState(false);

	React.useEffect(
		() => {
			fetch('http://localhost:3001/faculty', {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => {
					setCourse(data);
					if (data) setIsFaculty(true);
				})
				.catch((error) => console.log(error));
		},
		[ email ]
	);

	return (
		<div className="faculty">
			<div className="faculty__wrapper">
				{isFaculty ? (
					<div className="faculty__inner__wrapper">
						<p className="faculty__title">Hello {course.name}!</p>
						<p className="faculty__title">Here Are Your Teaching Course Sections!</p>
						<FacultyCard course={course} sectionNumber={1} />
						<FacultyCard course={course} sectionNumber={2} />
					</div>
				) : (
					<p className="faculty__error">You are NOT faculty</p>
				)}
			</div>
		</div>
	);
};

export default Faculty;
