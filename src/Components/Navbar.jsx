import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-medCamp.png"
import useAuth from "../Hooks/useAuth";
import { BsFillMenuButtonWideFill } from "react-icons/bs";

{/* <li>
<a>Parent</a>
<ul className="p-2">
  <li><a>Submenu 1</a></li>
  <li><a>Submenu 2</a></li>
</ul>
</li> */}

const Navbar = () => {
const{user,logout,registered, setRegistered}=useAuth()
    const links=<>
            <li><NavLink to={"/"}>Home</NavLink></li>
            <li><NavLink to={"/camps"}>Available Camps</NavLink></li>

       
        </>
    return (
        <div>
          <div className="navbar bg-primary text-white px-10">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost p-0 lg:hidden">
        <BsFillMenuButtonWideFill className="text-2xl m-0 mr-2"/>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg> */}
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-52 p-2 shadow">
        {links}
      </ul>
    </div>
   <Link>
   <img src={logo} alt="logo" className="h-10 rounded-sm" /></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      {links}
      </ul>
  </div>
  <div className="navbar-end">
   { user ?  
   
   <div className="dropdown dropdown-end">
  <div tabIndex={0} role="button" className="btn m-1">{user?.email}</div>
  <ul tabIndex={0} className="dropdown-content menu bg-primary rounded-box z-[1] w-52 p-2 shadow">
    <li><p>{user.email}</p></li>
    <li><Link to={"/dashboard"}>Dashboard</Link></li>
    <li><button onClick={()=>{logout(); setRegistered(false)}}>Logout</button></li>
  </ul>
</div>
   
   : 
    <Link to={"/join-us"}>
    <button>Join Us</button></Link>}
  </div>
</div>

        </div>
    );
};

export default Navbar;