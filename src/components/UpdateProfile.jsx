import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './Home.css';
import img1 from '../assets/pexels-padrinan-19670.jpg';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UpdateProfile = () => {
    const { id } = useParams(); // Extract ID from URL parameters
const navigate = useNavigate();
    // State variables for input fields
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const updateData = async () => {
        try {
            // Sending a PUT request to update the teacher's data
            const response = await axios.put(`http://localhost:1000/change-data/${id}`, {
                name: name,
                phone: phone,
                email: email
            });
            navigate('/');

            // Optionally handle the response (e.g., show a success message or redirect)
            if (response.status === 200) {
                console.log("Data updated successfully", response.data);
                // Redirect or show success message here
            }
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    return (
        <>
            <div 
                className='container'
                style={{
                    backgroundImage: `url(${img1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                }}
            >
                <div className='add-section'>
                    <div className='toptext'>
                        <p>Updating section for Id <span>{id}</span></p>
                    </div>

                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} // Update name state
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="phone">Phone no.</label>
                        <input 
                            type="number" 
                            id="phone" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} // Update phone state
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} // Update email state
                        />
                    </div>

                    <button className='submit' onClick={updateData}>Update</button>
                </div>
            </div>
        </>
    );
};

export default UpdateProfile;
