import React, { useEffect, useState } from 'react'
import { addUsers } from '../Redux/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../Redux/UserReducer';

export const Create = () => {

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {users,loading} = useSelector((state)=>state.users);

  // useEffect(()=>{
  //   dispatch(fetchUsers())
  // },[dispatch]);

  const handleSubmit = (e) =>{
    e.preventDefault();

    //find the max id in the users array
    const nextId = users.length > 0 ? Math.max(...users.map((user) => user.id)) + 1 : 1;

    const newUser ={
      id: nextId,
      name,
      email,
    }

    dispatch(addUsers(newUser));
    navigate("/");

  }

  console.log(name);
  console.log(email);

  return (
    <div className="flex h-1/2 justify-center items-center mt-5">
      <div className="w-11/12 border bg-gray-700 text-white p-5">
        <h3 className="text-2xl mb-8 font-semibold text-gray-200">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label htmlFor="name" className="block text-xl font-medium text-gray-300">Name:</label>
            <input
              type="text"
              name="name"
              className="text-black bg-white form-input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 mx-1 pl-4"
              placeholder="Enter name"
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <label htmlFor="email" className="block text-xl font-medium text-gray-300">Email:</label>
            <input
              type="email"
              name="email"
              className="text-black bg-white form-input mt-1 block w-full rounded-md border-blue-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 pl-4 py-2 mx-1"
              placeholder="Enter email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
