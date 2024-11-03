import React, { useState } from 'react';
import img1 from '../assets/pexels-padrinan-19670.jpg';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InputData = () => {
    //const [newData,setNewData] = useState('');
    const [name,setName]= useState('');
    const [teacher_id,setTeacherId]= useState('');
    const [phone,setPhone]=useState('');
    const [email,setEmail] =useState('');
    const navigate = useNavigate();


    const SubmitNewData = async() =>
    {
        try
         {
          const response = await axios.post('http://localhost:1000/push-inputData',
            {name:name,teacher_id:teacher_id,phone:phone,email:email});
            setName('');
            setEmail('');
            setPhone('');
            setTeacherId('');
           if(response.ok)
           {
            const result = await response.json();
            console.log(result);
           }
         }
         catch(error)
         {
          console.log("error while sending data to server from input component...")
         }
         navigate('/');       
    }
    


  return (
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
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="teacherId">Teacher Id</label>
          <input type="number" id="teacherId"value={teacher_id} onChange={(e)=>setTeacherId(e.target.value)}  />
        </div>

        <div className="input-group">
          <label htmlFor="phone">Phone no.</label>
          <input type="number" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <button className='submit' onClick={ (name && phone && email && teacher_id) ? SubmitNewData : " "}>Submit</button>

      </div>
    </div>
  );
};

export default InputData;
