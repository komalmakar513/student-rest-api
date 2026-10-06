import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

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

// GET ALL STUDENTS
app.get("/students", (req, res) => {
    res.status(200).json(students);
});

// GET STUDENT BY ID
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

// ADD NEW STUDENT
app.post("/students", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
        return res.status(400).json({
            message: "Name, email and age are required"
        });
    }

    const newStudent = {
        id: students.length + 1,
        name,
        email,
        age: Number(age)
    };

    students.push(newStudent);

    res.status(201).json(newStudent);
});

// UPDATE STUDENT
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
        id,
        name,
        email,
        age: Number(age)
    };

    res.status(200).json(students[studentIndex]);
});

// DELETE STUDENT
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

    const deletedStudent = students.splice(studentIndex, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

export default app;