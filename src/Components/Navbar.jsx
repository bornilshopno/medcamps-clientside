import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo-medCamp.png"
import useAuth from "../Hooks/useAuth";
import { BsFillMenuButtonWideFill } from "react-icons/bs";



const Navbar = () => {
  const { user, logout, setRegistered } = useAuth()

  const links = <>
    <li><NavLink to={"/"}>Home</NavLink></li>
    <li><NavLink to={"/camps"}>Available Camps</NavLink></li>


  </>
  return (
    <div>
      <div className="navbar bg-primary text-white px-5 md:px-7 lg:px-10 fixed z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost p-0 lg:hidden">
              <BsFillMenuButtonWideFill className="text-2xl m-0 mx-2" />

            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-primary rounded-box z-20 mt-3 w-52 p-2 shadow">
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
          {user ?

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="border-2 border-secondary rounded-xl bg-white p-[2px]">
                <img src={user?.photoURL} alt="" className="h-10 w-10 object-cover rounded-lg" />
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-primary rounded-box z-20 w-64 p-2 shadow">
                <li><p>{user.email}</p></li>
                <li><Link to={"/dashboard"}>Dashboard</Link></li>
                <li><button onClick={() => { logout(); setRegistered(false) }}>Logout</button></li>
              </ul>
            </div>

            :
            <Link to={"/join-us"}>
              <button>Join Us</button></Link>}
        </div>
      </div>
      <div className="h-[64px] ">

      </div>

    </div>
  );
};

export default Navbar;