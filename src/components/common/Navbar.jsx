import React from 'react';
import banner from '../../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/operations/authAPI';
import ProfileDrop from '../ProfileDrop';

const NavbarLinks = [
    {
        title: "Home",
        path: "/",
    },
    {
        title: "Services",
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

function Navbar() {
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-around pt-2 bg-gray-900 text-white'>
            {/* logo */}
            <div className='w-[300px]'>
                <img src={banner} className='w-[100px] md:w-[120px] pt-1 py-2 rounded-3xl' alt="Logo" />
            </div>
            {/* Navlinks */}
            <div className='text-lg flex gap-4 '>
                {NavbarLinks.map((items, index) => (
                    <ul key={index}>
                        <li>
                            <Link to={items.path}>
                                <p className="nav-link">{items.title}</p>
                            </Link>
                        </li>
                    </ul>
                ))}
            </div>

            {/* button */}
            <div className='flex gap-4'>
                {token === null && (
                    <Link to="/login">
                        <button className="nav-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Login</button>
                    </Link>
                )}
                {token === null && (
                    <Link to="/signup">
                        <button className="nav-button bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out">Signup</button>
                    </Link>
                )}
                {token !== null && <ProfileDrop />}
            </div>
        </div>
    );
}

export default Navbar;
