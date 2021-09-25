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
                    {/* <NavLink to={'/profile'}>My Profile</NavLink>
                    <button onClick={logout}>LogOut</button> */}
                    <li className='nav-text' onClick={showSidebar}>
                        <span>
                            <button  onClick={logout}>LogOut</button>
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


                    {/* {SidebarData.map((item, index) => {
                        return (
                            <li key={index}
                                className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                </Link>
                            </li>
                        )
                    })} */}
                </ul>
            </nav>
        </>
    )

    // return (
    //     <nav>
    //         <NavLink exact to={'/'}>Home</NavLink>
    //         <NavLink to={'/users'}>Users</NavLink>
    //         {displayButtons()}
    //     </nav>
    // )
};

