"use client"

import { useRouter } from "next/navigation";

const StaffLogin=()=>{
    const router=useRouter()
    return(
        <div className="login_container">
            <div className="login-left-container">
                
            </div>
            <div className="login-right-container">
                <div className="login-header">
                    <h1>Login</h1>
                </div>
                <div className="login-input-box">
                    <input type="text" placeholder="Username"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="password" placeholder="Password"></input>
                    <input type="password" placeholder="Confirm Password"></input>
                    <button className="btn2" onClick={()=>{
                        router.push("RequestBox")
                    }}>Submit</button>
                </div>
            </div>
        </div>
    )
}
export default StaffLogin;