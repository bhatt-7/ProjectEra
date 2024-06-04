import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';


const FriendConnect = () => {
    const [users, setUsers] = useState([])
    const token = useSelector((state) => state.auth.user)
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch users data from the server
                const response = await axios.get(`http://localhost:5000/api/users/getAllFreindRequest`, { withCredentials: true });
                // Update the state with the fetched users data
                setUsers(response?.data?.request);
                console.log(response)
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

    const handleAcceptResquest=async (friend)=>{
        
        const requestId =friend._id
        await axios.put(`http://localhost:5000/api/users/accept/`, {requestId},{ withCredentials: true })
            .then((res) => {
                console.log(res.data)
            })
    }
    return (
        <div className="">
            <h1>Friend Requests</h1>
            {/* Render users data */}

            {users && users?.map((user,index) => (
                <div key={index}>
                    {/* Render user details */}
                    <div>
                        <p>Name: {user?.toUser?.firstName} {user.lastName}</p>
                        <p>Email: {user.email}</p>

                    </div>[]
                    <div>
                        {/* Render other user details as needed */}
                        <button className='text-black ml-2' onClick={() => handleAcceptResquest(user)} >
                            acceptRequest
                        </button>
                        <button className='text-black ml-2' >
                            rejectRequest
                        </button>

                    </div>
                </div>
            ))}

        </div>
    )
}

export default FriendConnect
