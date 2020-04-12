import React from 'react';
import './FacultyForum.scss';
import { useParams } from 'react-router-dom';

const FacultyForum = function() {
	const [ posts, setPosts ] = React.useState([]);
	const [ inputText, setInputText ] = React.useState('');

	const { course, section } = useParams();

	React.useEffect(
		() => {
			fetch(`http://localhost:3001/faculty/${course}/${section}/forum`, {
				headers: {
					authorization: localStorage.getItem('token')
				}
			})
				.then((response) => response.json())
				.then((data) => setPosts(data))
				.catch((error) => console.log(error));
		},
		[ course, section ]
	);

	const handleFormSubmit = function(event) {
		event.preventDefault();

		fetch(`http://localhost:3001/faculty/${course}/${section}/forum`, {
			headers: {
				authorization: localStorage.getItem('token'),
				'content-type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ postInfo: inputText })
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data.message);

				// rerender the component
				fetch(`http://localhost:3001/faculty/${course}/${section}/forum`, {
					headers: {
						authorization: localStorage.getItem('token')
					}
				})
					.then((response) => response.json())
					.then((data) => setPosts(data))
					.catch((error) => console.log(error));
			})
			.catch((error) => console.log(error));

		setInputText('');
	};

	// Realistically this should include socket.io for realtime changes between contacts without refresh.
	return (
		<div className="facultyforum">
			<p className="facultyforum__title">
				{course} Section {section} Forum
			</p>

			<form className="facultyforum__form" onSubmit={handleFormSubmit}>
				<div className="facultyforum__input__wrapper">
					<input
						className="facultyforum__input"
						type="text"
						name="post"
						value={inputText}
						onChange={(event) => setInputText(event.target.value)}
					/>
					<button className="facultyforum__button" type="submit">
						Add Post
					</button>
				</div>
			</form>

			<div className="facultyforum__wrapper">
				{posts.map((post) => {
					return (
						<div
							className="facultyforum__post"
							key={post.course_id + post.post_no + post.student_email + post.post_info}
						>
							<p className="facultyforum__post--email">{post.student_email}</p>
							<p className="facultyforum__post--postinfo">{post.post_info}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default FacultyForum;
