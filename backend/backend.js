const express = require('express');

const app = express()
const hello = (request, response) => {
	console.log('Wooohooooo!!!!!');
	response.send('Works!');
}

app.get('/hello', hello);
app.listen(8080);

