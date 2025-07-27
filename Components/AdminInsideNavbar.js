"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
const AdminInsideNavbar=()=>{
    const router=useRouter();
    const [notify,setnotify]=useState(false);
return(
    <>
    <div className="admin_navbar">
        <div className="header">
            Admin 
        </div>
        <div className="list">
            <ul className="ul">              
                 <li className="notify" onClick={()=>setnotify(true)}>🔔</li>
                <li className="logout" onClick={()=>{
                    router.push("/Login")
                }}>Logout</li> 
            </ul>
        </div>
       
    </div>
     {( notify && 
     <div className="notify-container">
       <div>
        <button></button>
       </div>
     </div>
    )}
     </>
)
} 
export default AdminInsideNavbar;