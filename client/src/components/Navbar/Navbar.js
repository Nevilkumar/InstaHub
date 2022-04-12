import React,{useContext,useRef,useEffect,useState} from 'react'
import { NavLink, useLocation, useHistory, Link } from 'react-router-dom';
import {UserContext} from '../../App'
import './Navbar.css'

import { AiFillHome, AiOutlineUser } from 'react-icons/ai';
import { BsPlusSquare } from 'react-icons/bs';
import { FaUserFriends } from 'react-icons/fa';
import { MdExitToApp } from 'react-icons/md';
import { BsInstagram } from 'react-icons/bs';
import { FiUserPlus, FiLock } from 'react-icons/fi';


const NavBar = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const location = useLocation();
    const [mobileView, setMobileView] = useState(false);

    
    useEffect(() => {
      setMobileView(false);
    }, [location]);

    return (
        
        <>
        <div className='navbar'>
            <div className="topnav" id="myTopnav">

                <NavLink className="brand-logo" to="/"><BsInstagram className='logo-icons' />InstaHub</NavLink>

                <div className={mobileView ? "menu-toggle is-mobile-active" : "menu-toggle"} id="mobile-menu" onClick={() => setMobileView((prev) => !prev)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>

                <div className={mobileView ? "link-container mobile-active" : "link-container"} >
                    {
                        state ? (
                        <>
                            <NavLink className='nav-links' to="/" ><AiFillHome className='nav-icons'/>Home</NavLink>
                            <NavLink className="nav-links" to="/profile" ><AiOutlineUser className='nav-icons' />Profile</NavLink>
                            <NavLink className="nav-links" to="/create" ><BsPlusSquare className='nav-icons' />Create</NavLink>
                            <NavLink className="nav-links" to="/myfollowingpost" ><FaUserFriends className="nav-icons" />My Followings</NavLink>
                            <button 
                                className='nav-links logout-btn' 
                                onClick={()=>{
                                localStorage.clear()
                                dispatch({type:"CLEAR"})
                                history.push('/signin')
                            }}>
                            <MdExitToApp className='nav-icons' />
                            Logout
                            </button>
                        </>
                        ) : (
                    
                        <>
                            <NavLink className="nav-links" to="/signin"><FiLock className="nav-icons" />Login</NavLink>
                            <NavLink className="nav-links" to="/signup"><FiUserPlus className='nav-icons'/>Signup</NavLink>
                        </>
                        )
                    }
                    
                </div>
            </div>
        </div>
        </>
        

    )
}


export default NavBar

