import React from 'react';
import './Forum.scss';
import { useParams } from 'react-router-dom';

const Forum = function() {
	const [ posts, setPosts ] = React.useState([]);
	const [ inputText, setInputText ] = React.useState('');

	const { course, section } = useParams();

	React.useEffect(
		() => {
			fetch(`http://localhost:3001/courses/${course}/${section}/forum`, {
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

		fetch(`http://localhost:3001/courses/${course}/${section}/forum`, {
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
				fetch(`http://localhost:3001/courses/${course}/${section}/forum`, {
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
		<div className="forum">
			<p className="forum__title">
				{course} Section {section} Forum
			</p>

			<form className="forum__form" onSubmit={handleFormSubmit}>
				<div className="forum__input__wrapper">
					<input
						className="forum__input"
						type="text"
						name="post"
						value={inputText}
						onChange={(event) => setInputText(event.target.value)}
						required
					/>
					<button className="forum__button" type="submit">
						Add Post
					</button>
				</div>
			</form>

			<div className="forum__wrapper">
				{posts.map((post) => {
					return (
						<div
							className="forum__post"
							key={post.course_id + post.post_no + post.student_email + post.post_info}
						>
							<p className="forum__post--email">{post.student_email}</p>
							<p className="forum__post--postinfo">{post.post_info}</p>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Forum;
