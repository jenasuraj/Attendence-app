const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const PORT = 1000;
app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: //"Your connection name",
    password: //"Your password",
    database: //"your database name",
    timezone: 'Z',
});


app.get('/', (req, res) => {
    const {searchById} = req.query; 
    console.log(searchById);
    const q = `SELECT * FROM attendence_database WHERE teacher_id =${searchById} `;
    db.query(q, (err, data) => {
        if (err) {
            console.error("Error retrieving data from database:", err);
            return res.status(500).json({ error: "Failed to retrieve data" });
        }
        console.log(data);
        res.json(data);
       
    });
});


app.post('/push-inputData', (req, res) => {
    const { name, email, phone, teacher_id } = req.body;
    const q = "INSERT INTO attendence_database (teacher_id, name, email, phone) VALUES (?, ?, ?, ?)";
    const values = [teacher_id, name, email, phone]; 

    db.query(q, values, (err, result) =>
         {
        if (err) {
            console.error("Error inserting data:", err);
            return res.status(500).json(
                { error: "Failed to insert data" });
        }
        res.json(
    { message: "Successfully created entry in attendance database" });
        console.log("done posting");
    });
});


app.post('/put-date',(req,res)=>
{
   const {id,date} = req.body;
   console.log(`here in post method to set date where the teacher id is ${id} and the date of attendence is ${date}`);
   const q = "INSERT INTO attendence_table (teacher_id, date) VALUES (?, ?)";
   const values = [
    id,date
   ];
   db.query(q,values,(err,data)=>
{
    if(err)
    {
        console.log("error in pushing date to table");
    }
    else{
  res.json(data); 
    }
})
});

app.get('/show-guddu', (req, res) => {
    const { id } = req.query;
    console.log(`the id in guddu is ${id}`);
    const q = `SELECT date FROM attendence_table WHERE teacher_id = ?`;
    db.query(q, [id], (err, data) => {
        if (err) {
            console.log("error in sending data to uh guddu", err);
            return res.status(500).json({ error: "Failed to retrieve attendance data" });
        }
        console.log(data);
        return res.json(data);
    });
});



app.delete('/delete-profile/:deletingId', (req, res) => {
    const { deletingId } = req.params;
    console.log("Deleting section");
    console.log("The deleting ID is:", deletingId);

    const q = `DELETE FROM attendence_database WHERE teacher_id = ${deletingId}`;
    db.query(q, (err, data) => {
        if (err) {
            console.log("Not able to delete from table");
            return res.status(500).json({ message: "Failed to delete from table" });
        }
        
        res.json({ message: 'Deleted successfully', data });
    });
});



app.put('/change-data/:id', (req, res) => {
    const { id } = req.params; // Extract the id from the request parameters
    const { name, email, phone } = req.body;

    // Correctly structure the SQL query using placeholders
    const q = "UPDATE attendence_database SET name = ?, phone = ?, email = ? WHERE teacher_id = ?";

    // Execute the query with values as an array
    const values = [name, phone, email, id]; 
    db.query(q, values, (err, result) => {
        if (err) {
            console.error("Error updating data:", err);
            return res.status(500).json({ message: "Failed to update data" });
        }

        // Optionally check if any rows were affected
        if (result.affectedRows > 0) {
            res.json({ message: 'Data updated successfully', teacherId: id });
        } else {
            res.status(404).json({ message: 'Teacher ID not found' });
        }
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
});
