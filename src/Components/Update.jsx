import { useDispatch, useSelector } from 'react-redux';
import { updateUsers } from '../Redux/UserReducer';
import { useNavigate,useParams } from 'react-router-dom';
import { useState,useEffect } from 'react';


export const Update = () => {
    const {id} = useParams();
    const userId = Number(id)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(id);



    const user = useSelector((state)=>
      state.users.users.find((user)=>user.id === id)
    )

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");

    useEffect(()=>{
        if(user){
            setName(user.name);
            setEmail(user.email);
        }
    },[user])


    const handleUpdate = (e)=>{
        e.preventDefault();
        dispatch(updateUsers({id:parseInt(userId),name,email}));
        navigate("/");
    }





  return (
    <div className='flex justify-center items-center'>
    <div className="border bg-gray-700 text-white p-5 w-3xl items-center mt-4">
        <h3 className="text-lg font-semibold text-gray-200">Update User</h3>
        <form onSubmit={handleUpdate}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name:</label>
                <input
                    onChange={e => setName(e.target.value)}
                    value={name}
                    type="text"
                    name="name"
                    className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email:</label>
                <input
                    onChange={(e)=>setEmail(e.target.value)
                    }
                    value={email}
                    type="email"
                    name="email"
                    className="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                />
            </div>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                Update
            </button>
        </form>
    </div>
</div>
  )
}
