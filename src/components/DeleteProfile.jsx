import React from 'react'
import { useState } from 'react'
import axios from 'axios';

const DeleteProfile = ({id}) => 
    {
        console.log("the deleting id is" +id);
    //const [deleteItem,setDeleteItem]=useState('');

    const deleteSection = async () => {
        //console.log("in delete async method");
        try {
            const response = await axios.delete(`http://localhost:1000/delete-profile/${id}`);
            console.log("Profile deleted successfully");
        } catch (error) {
            console.log("Error while deleting profile", error);
        }
        window.location.reload();

    };
     
  return (
    <>
      <button className='delete' onClick={deleteSection}>Delete</button>
    </>
  )
}

export default DeleteProfile
