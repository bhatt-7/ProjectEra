import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';



const FriendRequest = () => {
    // Initialize state for storing users data
    const [users, setUsers] = useState([]);
    const token = useSelector((state) => state.auth.user)

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users data from the server
                const response = await axios.get(`http://localhost:5000/api/users/getAllUsers`, { withCredentials: true });
                // Update the state with the fetched users data
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        // Clean-up function (optional)
        return () => {
            // Any clean-up code can go here
        };
    }, []);

    const handleResquest = async (friend) => {
        const fromUserId = token._id
        const toUserId = friend._id
        console.log(token._id,friend._id)
        await axios.post(`http://localhost:5000/api/users/send`, { fromUserId, toUserId }, { withCredentials: true })
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <div className='flex flex-col items-center'>
            <h1>Friend Requests</h1>
            {/* Render users data */}

            {users.map((user, index) => (
                <div key={user._id}>
                    {/* Render user details */}
                    <div>
                        <p>Name: {user.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>

                    </div>
                    <div>
                        {/* Render other user details as needed */}
                        <button className='text-black'
                            onClick={() => handleResquest(user)}>sendRequest()</button>

                    </div>
                </div>

                // <div key={user._id} className=" flex  mx-auto">

                //     <div className="  w-[500px]  mb-6 flex items-center flex-col border border-gray-200 rounded-lg h-[100%] p-5  ">
                //         <a href="#">
                //             <img className="rounded-full h-[100px] " src={user.image} alt="" />
                //         </a>
                //         <div className="p-5">
                //             <a href="#">
                //                 <h5 className="text-black  font-bold text-2xl tracking-tight mb-2 dark:text-white">
                //                     {user.firstName}
                //                 </h5>
                //             </a>
                //             <p className="font-normal text-gray-700 mb-3 dark:text-gray-400">
                //                 {""}
                //             </p>

                //         </div>


                //         <button className='text-black'
                //             onClick={() => handleResquest(user)}>sendRequest()</button>
                //     </div>
                // </div>
            ))}

        </div>
    );
};

export default FriendRequest;
