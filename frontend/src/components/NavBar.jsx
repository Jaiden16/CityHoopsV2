import React, { useContext, useState } from "react"
import { NavLink, Link } from 'react-router-dom'
import "../Css/NavBar.css"
import { logout } from "../util/firebaseFunctions"
import { AuthContext } from "../Provider/authContext"
import * as FaICons from 'react-icons/fa'
import * as AiICons from 'react-icons/ai'
import { SidebarData } from "../util/sidebarData"

export default function NavBar() {
    const { currentUser } = useContext(AuthContext);
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    const displayButtons = () => {
        if (currentUser) {
            return (
                <>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index}
                                className={item.cName}
                                onClick={showSidebar}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })}
                    <li className='nav-text' onClick={showSidebar}>
                        <span>
                            <button onClick={logout}>LogOut</button>
                        </span>
                    </li>
                </>
            )
        } else {
            return (
                <>
                    <li className='nav-text' onClick={showSidebar}>
                        <Link to="/login">
                            <FaICons.FaKey />
                            <span>Login</span>
                        </Link>
                    </li>
                    <li className='nav-text' onClick={showSidebar}>
                        <Link to="/signup">
                            <FaICons.FaPenSquare />
                            <span>SignUp</span>
                        </Link>
                    </li>
                </>
            )
        }
    }

    return (
        <>
            <div className="navbar">
                <NavLink to="#" className='menu-bars'>
                    <FaICons.FaBars onClick={showSidebar} />
                </NavLink>
            </div>

            <div className="Navigation">
                <ul>
                    <li className="list">
                        <NavLink to="/">
                            <span className="icon"><FaICons.FaHome /></span>
                            <span className="text">Home</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink to="/profile">
                            <span className="icon"><FaICons.FaUser /></span>
                            <span className="text">Profile</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink to="/users">
                            <span className="icon"><FaICons.FaUsers /></span>
                            <span className="text">Users</span>
                        </NavLink>
                    </li>
                    <li className="list">
                        <NavLink to="/about">
                            <span className="icon"><FaICons.FaCartPlus /></span>
                            <span className="text">About</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiICons.AiOutlineClose onClick={showSidebar} />
                        </Link>
                    </li>

                    <li className='nav-text' onClick={showSidebar}>
                        <Link to="/">
                            <AiICons.AiFillHome />
                            <span>Home</span>
                        </Link>
                    </li>
                    {displayButtons()}
                </ul>
            </nav>
            {sidebar ? <div onClick={showSidebar} className="nav-mask"></div> : null}
        </>
    )
};