import mongoose from 'mongoose';
mongoose
	.connect('mongodb://localhost:27017/note-app')
	.then(() => console.log('DB Connected!'))
	.catch(error => {
		console.log('DB Connection Failed: ', error);
	});
