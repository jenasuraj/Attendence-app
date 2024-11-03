import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import './setAttendence.css';
import img1 from '../assets/pexels-padrinan-19670.jpg';
import axios from 'axios';

const SetAttendence = () => {
    const [date, setDate] = useState('');
    const { id } = useParams(); 
    const [attendanceData, setAttendanceData] = useState([]);

    const pushAttendence = async () => {
        try {
            const response = await axios.post('http://localhost:1000/put-date', {
                id: id,
                date: date
            });
            setDate('');
        } catch (error) {
            console.log("Could not send date, error in catch");
        }
    }

    const showAttendence = async () => {
        try {
            const response = await axios.get('http://localhost:1000/show-guddu', {
                params: { id: id }
            });
            if (response.status === 200) {
                const data = response.data;
                console.log("in response status");
                console.log(data);
                setAttendanceData(data);
            }
        } catch (error) {
            console.log("Sorry, but we are not able to bring data of a particular teacher's attendance.");
        }
    }

    return (
        <>
            <div className='attendence-field'
                style={{
                    backgroundImage: `url(${img1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100vh',
                }}>
                
                <div className='attendence-taker'>
                    <div>
                        <h1>Attend yourself</h1>
                    </div>
                    <div>        
                        <input type="date" placeholder='Enter the date' value={date} onChange={(e) => setDate(e.target.value)} />
                        <button className='put' onClick={pushAttendence}>Put</button>
                        <button className='see' onClick={showAttendence}>See Attendance</button>
                    </div>
                </div>

                {attendanceData.length > 0 && 
    <div className='attendence-lister'>
        <h4>Attendance List Dates</h4>
        {attendanceData.map((item, index) => {
            // Create a new Date object from the item.date
            const date = new Date(item.date); // Assuming item.date is a valid date string
            const formattedDate =
             `Present Date's--[${date.toISOString().split('T')[0]}]`; // Format it as required

            return (
                <p key={index}>
                    {formattedDate} {/* Display the formatted date */}
                </p>
            );
        })}
    </div>
}

                
            </div>
        </>
    )
}

export default SetAttendence;
