import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsers } from '../Redux/UserReducer'
import { fetchUsers } from '../Redux/UserReducer'

export const Home = () => {
  const users = useSelector((state)=> state.users.users)
  const dispatch = useDispatch();
  console.log(users)

  useEffect(()=>{
    dispatch(fetchUsers())
  },[]);

  const handleDelete = (id) =>{
    dispatch(deleteUsers(Number(id)));
  }

  return (
    <div className="container mx-auto mt-8 m-10">
      <h2 className="text-2xl font-bold mb-5">Simple Crud App With Redux</h2>
      <Link to="/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-5 inline-block">
        Create +
      </Link>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (users.map((user) => (
             <tr key={user.id}>
             <td className="border border-gray-300 px-4 py-2">{user.id}</td>
             <td className="border border-gray-300 px-4 py-2">{user.name}</td>
             <td className="border border-gray-300 px-4 py-2">{user.email}</td>
             <td className="border border-gray-300 px-4 py-2">
               <Link
                  to={`/update/${user.id}`}
                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded text-sm"
               >
                 Edit
               </Link>
               <button
                 onClick={() => handleDelete(user.id)}
                 className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded text-sm ml-2"
               >
                 Delete
               </button>
             </td>
           </tr>
          ))) :
          (
            <tr>
                <td className='text-center text-gray-500' colSpan={4}>
                  No users found
                </td>
            </tr>
          )}

        </tbody>
      </table>
    </div>
  )
}