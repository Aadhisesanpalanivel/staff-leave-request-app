"use client"

import { useRouter } from "next/navigation";

const NavbarUser=()=>{
    const router=useRouter();
return(
    <div>
    <div className="admin_navbar">
        <div className="header">
            User 
        </div>
        <div className="list">
            <ul className="ul">
                <li className="login" onClick={()=>{
                    router.push("/Login")
                }}>Login</li>
            
            </ul>
        </div>
        
    </div>
    <div className="register-request" onClick={()=>{
        router.push("/Login")
    }}>
        <h1>Click here to Register For Leave !!!</h1>
        </div>
    </div>
)
} 
export default NavbarUser;