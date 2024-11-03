import React from 'react';
import { Link } from 'react-router-dom';
import img1 from '../assets/pexels-padrinan-19670.jpg';
import './Home.css';
const Home = () => {
  return (
    <>
      <div 
        className='container'
        style={{
          backgroundImage: `url(${img1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '100vh', // adjust the height as needed
        }}
      >
        <div className='add-section'>

          <button>
            <Link to='see-attendence'>
            Add Attendance
            </Link>
          </button>

          <button>
            <Link to='/form-section'>
            New Teacher
            </Link>
          </button>

          <button>
            <Link to='see-attendence'>
            See Attendance
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
