import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserForm.css'


const UserForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ id: '', firstName: '', lastName: '', email: '', department: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = 'https://jsonplaceholder.typicode.com/users';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(API_URL, formData);
      setUsers([...users, response.data]);
      setFormData({ id: '', firstName : '', lastName: '', email: '', department: '' });
      setError(null);
      
    } catch (err) {
      setError('Failed to add user. Please try again.');
    }
  };

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`${API_URL}/${formData.id}`, formData);
      setUsers(users.map((user) => (user.id === formData.id ? response.data : user)));
      setFormData({ id: '', firstName: '', lastName: '', email: '', department: '' });
      setIsEditing(false);
      setError(null);
    } catch (err) {
      setError('Failed to update user. Please try again.');
    }
  };

  const handleEditUser = (user) => {
    setIsEditing(true);
    setFormData({
      id: user.id,
      firstName: user.name.split(' ')[0],
      lastName: user.name.split(' ')[1] || '',
      email: user.email,
      department: user.department || '',
    });
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete user. Please try again.');
    }
  };

  return (
    <>
    <div className="p-4">
      

      {error && <p className="text-red-500">{error}</p>}

      <div className="card-container">
        <div className="card">
          
          <form className="form-container">
          <h2 className="action-text">{isEditing ? 'Edit User' : 'Add User'}</h2>
            <div className="Input-container">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
              className="user-input"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="user-input"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="user-input"
            />
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Department"
              className="user-input"
            />
             </div>
          </form>
          <div className="form-add-btn">
            <button className="addOrSubmitBtn" onClick={isEditing ? handleUpdateUser : handleAddUser}>
            {isEditing ? 'Update User' : 'Add User'}
          </button>
            </div>
           
        </div>
      </div>
      <div>
    </div>



    <h2 className="user-list-text">User List</h2>
    <div className="user-list-container">
            <ul className="">
            {users.map((user) => (
              <div key={user.id} className="user-list">
                  <p>ID: {user.id}</p>
                  <p>Name:{user.name}  {user.firstName} {user.lastName}</p>
                  <p>Email: {user.email}</p>
                  <p>Department: {user.department || 'N/A'}</p>
                <div className="buttons-container">
                  <button onClick={() => handleEditUser(user)} className='button black'>Edit</button>
                  <button onClick={() => handleDeleteUser(user.id)} className="button red">
                    Delete
                  </button>
              </div>
              </div>
            ))}
          </ul>
      </div>
      </div>
    </>
  );
};

export default UserForm;
