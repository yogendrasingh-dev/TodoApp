import { useState, ChangeEventHandler, useEffect } from 'react';
import './App.css';
import NoteItem from './components/NoteItem';
import axios from 'axios';

type noteType = {
	id: string;
	title: string;
	description?: string;
};

function App() {
	// return React.createElement('div', { className: 'App' }, React.createElement('h1', null, 'Hello World!'));
	// const [title, setTitle] = useState('');
	// const [description, setDescription] = useState('');

	const [notes, setNotes] = useState<noteType[]>([]);

	const [values, setValues] = useState({ title: '', description: '' });

	const [selectedNoteId, setSelectedNoteId] = useState('');

	const [noteView, setNoteView] = useState<noteType>();

	const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
		const { name, value } = target;
		setValues({ ...values, [name]: value });
	};

	useEffect(() => {
		const fetchNotes = async () => {
			const { data } = await axios('http://localhost:8000/note');
			setNotes(data.notes);
		};
		fetchNotes();
	}, []);

	return (
		<div className="max-w-3xl mx-auto">
			<form
				onSubmit={async evt => {
					evt.preventDefault();
					if (selectedNoteId) {
						const { data } = await axios.patch('http://localhost:8000/note/' + selectedNoteId, {
							title: values.title,
							description: values.description
						});
						const updatedNotes = notes.map(note => {
							if (note.id === selectedNoteId) {
								note.title = data.note.title;
								note.description = data.note.description;
							}
							return note;
						});
						setNotes([...updatedNotes]);
						setValues({ title: '', description: '' });
						return;
					}
					const { data } = await axios.post('http://localhost:8000/note/create', {
						title: values.title,
						description: values.description
					});
					console.log(data);
					setNotes([data.note, ...notes]);
					setValues({ title: '', description: '' });
				}}
				className=" bg-white shadow-md rounded p-5 space-y-6"
			>
				<h1 className="font-semibold text-2xl text-center">Note Application</h1>
				<div>
					<input
						className="w-full border-b-2 border-gray-700 outline-none"
						type="text"
						placeholder="Title"
						value={values.title}
						onChange={handleChange}
						name="title"
					/>
				</div>
				<div>
					<textarea
						value={values.description}
						name="description"
						className="w-full border-b-2 border-gray-700 outline-none resize-none h-36"
						placeholder="Description"
						onChange={handleChange}
					/>
				</div>
				<div className="text-center">
					<button className="bg-blue-500 text-white px-5 py-2 rounded">Submit</button>
				</div>
			</form>
			{/** note items */}
			{notes.map(note => {
				return (
					<NoteItem
						key={note.id}
						title={note.title}
						onEditClick={() => {
							setSelectedNoteId(note.id);
							setValues({ title: note.title, description: note.description || '' });
						}}
						onDeleteClick={async () => {
							const result = confirm('Are you sure?');
							if (result) {
								await axios.delete('http://localhost:8000/note/' + note.id);
								// const updatedNotes = note.filter(({id}) => {
								//   if (id != note.id) return note;
								// })
								const updatedNotes = notes.filter(({ id }) => note.id != id);
								setNotes([...updatedNotes]);
							}
						}}
						description={noteView?.id == note.id ? noteView?.description : ''}
						onViewClick={() => {
							if (noteView) {
								setNoteView(undefined);
							} else {
								setNoteView(note);
							}
						}}
					/>
				);
			})}
		</div>
	);
}

export default App;
