import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/operations/authAPI";

export default function ProfileDrop() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  return (
    <button className="relative" onClick={() => setOpen(!open)}>
      <div className="flex items-center gap-x-1">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <p>{user?.name}</p>
        <AiOutlineCaretDown className="text-sm text-white" />
      </div>
      <div
        className={`absolute top-[118%] right-0 z-[1000] divide-y-[1px]  overflow-hidden rounded-md border-[1px] border-white bg-gray-900 transition-max-height ${open ? "max-h-[200px]" : "max-h-0"
          }`}
        ref={ref}
      >
        <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
          <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white hover:bg-gray-700 hover:text-gray-200">
            <VscDashboard className="text-lg" />
            Dashboard
          </div>
        </Link>
        <div
          onClick={() => {
            dispatch(logout(navigate));
            setOpen(false);
          }}
          className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-white hover:bg-gray-700 hover:text-gray-200"
        >
          <VscSignOut className="text-lg" />
          Logout
        </div>
      </div>
    </button>
  );
}
