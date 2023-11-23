const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'tagdij',
    user: 'root',
    password: ''
});

connection.connect((error) =>{
    console.log("connect");
});

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.get("/get:data",(req, res) =>{
    const sql = `SELECT * FROM ugyfel ORDER BY azon ASC`;

    connection.query(sql,(error, result) =>{
        res.send(result);
    });
});

app.post("/add_data", (req, res) =>{
    const nev = request.body.nev;

    const szulev = request.body.szulev;

    const irszam = request.body.irszam;

    const sql = `
    INSERT INTO ugyfel 
    (nev,szulev,irszam)
    VALUES("${nev}","${szulev}","${irszam}")
    `;

    connection.query(sql, (error,results) =>{
        response.json({
            message: 'Adat hozzáadva!'
        });
    });
});

app.post('/update_data', (request, response) => {

	const variable_name = request.body.variable_name;

	const variable_value = request.body.variable_value;

	const id = request.body.id;

	const sql = `UPDATE ugyfel SET `+variable_name+`= "${variable_value}" WHERE azon = "${azon}"`;

	connection.query(sql, (error, results) => {

		response.json({
			message : 'Frissitve!'
		});

	});

});

app.post("/delete_data", (request, response) => {

	const azon = request.body.azon;

	const sql = `DELETE FROM ugyfel WHERE azon = '${azon}'`;

	connection.query(sql, (error, results) => {
		response.json({
			message : 'Törölve!'
		});
	});

});

app.listen(3000, () =>{
    console.log('Server listening on port 3000');
});