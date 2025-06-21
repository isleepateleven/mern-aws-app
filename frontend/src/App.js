import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [examples, setExamples] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState(null);

  const fetchExamples = async () => {
    const res = await axios.get('http://localhost:3004/api/examples');
    setExamples(res.data);
  };

  useEffect(() => {
    fetchExamples();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:3004/api/examples/${editingId}`, {
          name,
          description,
        });
        setEditingId(null);
      } else {
        await axios.post('http://localhost:3004/api/examples', {
          name,
          description,
        });
      }
      setName('');
      setDescription('');
      fetchExamples();
    } catch (err) {
      console.error('Failed', err);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3004/api/examples/${id}`);
    fetchExamples();
  };

  const handleEdit = (example) => {
    setEditingId(example._id);
    setName(example.name);
    setDescription(example.description);
  };

  return (
    <div className="container">
      <h1 className="title">MERN Stack CRUD</h1>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button type="submit">Add Example</button>
        </form>
      </div>

      <h2 className="examples-heading">Examples</h2>

      <div className="card-container">
        {examples.map((example) => (
          <div className="card" key={example._id}>
            <h3>{example.name}</h3>
            <p>{example.description}</p>
            <div className="card-buttons">
              <button className="edit-btn" onClick={() => handleEdit(example)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(example._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
