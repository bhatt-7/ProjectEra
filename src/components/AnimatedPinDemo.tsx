"use client";
import React from "react";
import { PinContainer } from "./ui/3d-pin";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export function AnimatedPinDemo() {
  const { user } = useSelector((state:any) => state.auth);
  console.log(user)
    const projects = [user.projects];
  return (
    <div className="h-[40rem] w-full flex items-center justify-center ">
      <PinContainer
        title={user.firstName}
        href="#"
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[25rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-3xl text-slate-100 ">
            {user.firstName} {user.lastName}
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 text-xl ">
              Email: {user.email}
            </span>
          </div>
          <div className="mt-6" />
          <img src={user.image} alt="" className="rounded-full h-85" />        
        </div>

        <button className="bg-blue-500 mt-10 w-full  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <Link to="/dashboard/create-project">Create new project</Link>
            </button>
      </PinContainer>
    </div>
  );
}
