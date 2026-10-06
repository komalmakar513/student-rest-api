const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary student data
let students = [
    {
        id: 1,
        name: "Komal",
        email: "komal@gmail.com",
        age: 20
    },
    {
        id: 2,
        name: "Tannu",
        email: "tannu@gmail.com",
        age: 21
    }
];


// ===============================
// GET - Get all students
// ===============================

app.get("/students", (req, res) => {
    res.status(200).json(students);
});


// ===============================
// GET - Get student by ID
// ===============================

app.get("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const student = students.find(
        (student) => student.id === id
    );

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    res.status(200).json(student);
});


// ===============================
// POST - Add new student
// ===============================

app.post("/students", (req, res) => {

    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const newStudent = {
        id: students.length > 0
            ? students[students.length - 1].id + 1
            : 1,

        name: name,
        email: email,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});


// ===============================
// PUT - Update student
// ===============================

app.put("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
        (student) => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, email, age } = req.body;

    students[studentIndex] = {
        id: id,
        name: name,
        email: email,
        age: Number(age)
    };

    res.status(200).json(students[studentIndex]);
});


// ===============================
// DELETE - Delete student
// ===============================

app.delete("/students/:id", (req, res) => {

    const id = Number(req.params.id);

    const studentIndex = students.findIndex(
        (student) => student.id === id
    );

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(
        studentIndex,
        1
    );

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});


// ===============================
// Start Server
// ===============================

app.listen(PORT, "0.0.0.0", () => {
    console.log(`REST API running on port ${PORT}`);
});