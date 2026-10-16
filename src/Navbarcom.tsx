import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,

  NavbarBrand,
  NavbarCollapse,
 
  NavbarToggle,
} from "flowbite-react";
import { useContext } from "react";

import { Link, NavLink, useNavigate } from "react-router";
import { authContext } from "./context/AuthContext";
import type { user } from "./user";

export function Navbarcom() {
let nav=useNavigate()
 let {userdata,setuser}:{userdata:user}= useContext(authContext)
 function logout(){
  //removeitem
  //setuser=null
  //return login 
localStorage.removeItem("userToken")
setuser(null)
nav('/register')

}


  return (
 <Navbar className="!bg-gray-100  px-10 shadow">
      <NavbarBrand href="https://flowbite-react.com">
        <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold ">Flowbite React</span>
      </NavbarBrand>
      <div className="flex items-center md:order-2">

        {userdata?    <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar alt="User settings" img={userdata?.photo} rounded />

          }
        
        >
         
          
          <DropdownHeader>
            <span className="block text-sm">Bonnie Green</span>
            
          </DropdownHeader>
          <DropdownItem><NavLink to="/register">Register</NavLink></DropdownItem>
          <DropdownItem>Settings</DropdownItem>
          
          <DropdownDivider />
          <DropdownItem onClick={logout}>Sign out</DropdownItem>
        </Dropdown>: 
         <>  <NavLink to="/register" className="mx-2" >Register</NavLink>
        <NavLink to="/login">login</NavLink></>}
    
    
        <NavbarToggle />
      </div>
    {userdata &&   <NavbarCollapse className="border bprder-gray-300 p-3 rounded-2xl">
       <NavLink to="/feed"><i className="fa-regular fa-house"></i>Feed</NavLink>
       <NavLink to="/profile"><i className="fa-regular fa-user"></i>profile</NavLink> 
      </NavbarCollapse>}
    </Navbar>
  );
}
