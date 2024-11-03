import React, { useState } from 'react';
import img1 from '../assets/pexels-padrinan-19670.jpg';
import axios from 'axios';
import DeleteProfile from './DeleteProfile';
import { Link } from 'react-router-dom';

const Attendence = () => {
    const [searchById, setSearchById] = useState('');
    const [toggle, setToggle] = useState(false);
    const [data, setData] = useState([]); // State to hold fetched data

    const find = async () => {
        console.log(searchById);
        try {
            const response = await axios.get('http://localhost:1000', {
                params: { searchById: searchById }
            });

            if (response.status === 200) {
                setData(response.data); // Store the response data
                setSearchById('');
                setToggle(true);
            } else {
                console.log("Error: Response status is not OK");
            }
        } catch (error) {
            console.log("Error while trying to fetch data from the server:", error);
        }
    };

    return (
        <div className='search-section'
            style={{
                backgroundImage: `url(${img1})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
            }}
        >
            <div className='search-field'>
                <input 
                    type="text"
                    placeholder='Find yourself via Teacher Id'
                    value={searchById}
                    onChange={(e) => setSearchById(e.target.value)} 
                />
                <button className='submit-btn' onClick={find}>Find</button>
            </div>

            {toggle && data.length > 0 && (
                <div className='output'>
                    <div className='data'>
                        <p>Teacher ID: {data[0].teacher_id}</p>
                        <p>Name: {data[0].name}</p>
                        <p>Email: {data[0].email}</p>
                        <p>Phone: {data[0].phone}</p>
                    </div>
                    <div className='side'>
                        <Link to={`/updateFile/${data[0].teacher_id}`}>
                            <button className='submit'>Update</button>
                        </Link>
                        <DeleteProfile id={data[0].teacher_id} />
                       
                        <Link to={`/set-attendence/${data[0].teacher_id}`}>
                            <button className='attendence'>Attendence</button>
                        </Link>
                      
                    </div>
                </div>
            )}
        </div>
    );
};

export default Attendence;
