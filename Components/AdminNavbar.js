"use client"
import { useRouter } from "next/navigation";

const AdminNavbar=()=>{
    const router=useRouter()
return(
    <div className="admin_navbar">
        <div className="header">
            Admin 
        </div>
        <div className="list">
            <ul className="ul">
                <li className="login" onClick={()=>{
                    router.push("/Login")
                }}>Login</li>
                {/* <li className="notify">🔔</li>
                <li className="logout">Logout</li> */}
            </ul>
        </div>
    </div>
)
} 
export default AdminNavbar;