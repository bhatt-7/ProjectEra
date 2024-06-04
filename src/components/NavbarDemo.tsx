"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";



export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
      
    </div>
  );
}

const NavbarLinks = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "About",
        path: "/about"
    },
    {
        title: "Projects",
        path: "/project",
    },
    
    {
        title: "Contact",
        path: "/contact-us",
    },
];

function Navbar({ className }: { className?: string }) {

    const {token} = useSelector((state:any)=>state.auth);
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        
        {
                NavbarLinks.map((items,index)=>(
                    <ul key={index}>
                        <li>
                            <Link to={items.path}>
                                <p>{items.title}</p>
                            </Link>
                        </li>
                    </ul>
                ))
            }
       
       { <div className='flex gap-4'>
            {
                token === null && (
                    <Link to="/login">
                        <button>Login</button>
                    </Link>
                )
            
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button>Signup</button>
                    </Link>
                )
            }
            {
                token !== null &&(
                    //<ProfileDrop/>
                    <div></div>
                )
            }

        </div>}
      </Menu>
     
    </div>
  );
}
