import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsers } from '../Redux/UserReducer'
import { fetchUsers } from '../Redux/UserReducer'


export const Home = () => {
  const [search, setSearch] = useState('')
  console.log(search)
  const users = useSelector((state)=> state.users.users)
  const dispatch = useDispatch();
  console.log(users)

  useEffect(()=>{
    dispatch(fetchUsers())
  },[]);

  const handleDelete = (id) =>{
    dispatch(deleteUsers(id));
  }

  const filteredUsers = users.filter((user)=>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-8 m-10 p-">
      <h2 className="text-2xl font-bold mb-5">Simple Crud App With Redux</h2>
      <div className='flex justify-between items-center'>
      <Link to="/create" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-5 inline-block">
        Create +
      </Link>
      <div>
        <input
        type="text"
        name='search'
        onChange={(e)=> setSearch(e.target.value)}
        value={search}
        placeholder='Search...'
        className='border border-gray-800 rounded px-4 py-2 mb-5 ml-5'
        />
      </div>
      </div>
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
          {filteredUsers && filteredUsers.length > 0 ? (filteredUsers.map((user,index) => (
             <tr key={user.id}>
             <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
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