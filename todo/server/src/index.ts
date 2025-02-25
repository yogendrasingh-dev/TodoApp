//create a server
import express from 'express';
import './db';
import cors from 'cors';

import noteRouter from './routers/note';
const app = express();

app.use(cors());

//this will parse post request coming from fetch/axios.post()
app.use(express.json());

//this will parse post request coming from html form
app.use(express.urlencoded({ extended: false }));

/*
Example how to middleware work & these middleware only used for JSON so for support 
for other form like React,axios, or html we have to use above middleware
**/

// app.use((req, res, next) => {
// 	req.on('data', chunk => {
// 		req.body = JSON.parse(chunk);
// 		next();
// 	});
// });

// app.post('/', (req, res) => {
// 	console.log(req.body);
// 	res.json({
// 		message: 'I am listening!'
// 	});
// });

app.use('/note', noteRouter);

//listen to some port
app.listen(8000, () => {
	console.log('listening');
});
