import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "/api/students";

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    age: ""
  });
  const [editingId, setEditingId] = useState(null);

  // GET: Fetch all students
  const fetchStudents = async () => {
    const response = await axios.get(API_URL);
    setStudents(response.data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // POST: Add student
  const addStudent = async (e) => {
    e.preventDefault();

    await axios.post(API_URL, {
      name: form.name,
      email: form.email,
      age: Number(form.age)
    });

    resetForm();
    fetchStudents();
  };

  // PUT: Update student
  const updateStudent = async (e) => {
    e.preventDefault();

    await axios.put(`${API_URL}/${editingId}`, {
      name: form.name,
      email: form.email,
      age: Number(form.age)
    });

    resetForm();
    fetchStudents();
  };

  // DELETE: Remove student
  const deleteStudent = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchStudents();
  };

  // Edit button
  const editStudent = (student) => {
    setEditingId(student.id);

    setForm({
      name: student.name,
      email: student.email,
      age: student.age
    });
  };

  // Reset form
  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      age: ""
    });

    setEditingId(null);
  };

  return (
    <div className="app">

      <header>
        <div>
          <p className="tag">REST API PROJECT</p>
          <h1>Student Management</h1>
          <p className="subtitle">
            React + REST API + Postman
          </p>
        </div>

        <div className="status">
          <span></span>
          API Connected
        </div>
      </header>

      <main>

        {/* Student Form */}

        <section className="card">

          <p className="label">
            {editingId ? "UPDATE STUDENT" : "ADD STUDENT"}
          </p>

          <h2>
            {editingId
              ? "Update student details"
              : "Create a new student"}
          </h2>

          <form
            onSubmit={editingId ? updateStudent : addStudent}
          >

            <div className="form-row">

              <div>
                <label>Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                  required
                />
              </div>

              <div>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>

              <div>
                <label>Age</label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="Age"
                  required
                />
              </div>

            </div>

            <div className="buttons">

              <button className="primary" type="submit">
                {editingId ? "Update Student" : "Add Student"}
              </button>

              {editingId && (
                <button
                  className="cancel"
                  type="button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}

            </div>

          </form>

        </section>


        {/* Student Table */}

        <section className="card">

          <div className="table-title">
            <div>
              <p className="label">DATABASE</p>
              <h2>All Students</h2>
            </div>

            <button
              className="refresh"
              onClick={fetchStudents}
            >
              Refresh
            </button>
          </div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>AGE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>

              {students.map((student) => (
                <tr key={student.id}>

                  <td>#{student.id}</td>

                  <td>
                    <strong>{student.name}</strong>
                  </td>

                  <td>{student.email}</td>

                  <td>{student.age}</td>

                  <td>
                    <button
                      className="edit"
                      onClick={() => editStudent(student)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </section>

      </main>

      <footer>
        Student REST API • React • Axios • Express
      </footer>

    </div>
  );
}

export default App;