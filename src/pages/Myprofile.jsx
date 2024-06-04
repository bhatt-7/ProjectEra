import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "../components/EditProfile";
import { AnimatedPinDemo } from "../components/AnimatedPinDemo";
import {useNavigate} from "react-router-dom"
function Myprofile() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  const navigate = useNavigate();

  const handleSubmit = ()=>{
    navigate("/dashboard/create-project")
  }
  return (
    <div className="flex flex-col items-center  mb-6 ">
      <h1 className="mb-14 text-3xl font-bold text-black">My Profile</h1>
      <div className="flex flex-col items-center justify-between rounded-md shadow-2xl  bg-pure-grey-900  p-8 px-12">
        <div className="flex text-black items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] border-[1px] border-richblack-50 rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-xl font-semibold text-black">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-md text-richblack-100">{user?.email}</p>
          </div>
        </div>

        <div className="my-10 flex flex-col mb-6 gap-y-10 rounded-md  bg-pure-grey-900 p-8 px-12">
        <EditProfile/>
        <button onClick={handleSubmit} className="text-white p-3 bg-blue-500 rounded-md hover:shadow-md hover:shadow-black transition-all duration-300 font-bold " > Create Project </button>
      </div>
       
      </div>

      
    </div>
  );
}

export default Myprofile;
