
"use client"
import { useRouter } from "next/navigation"

const Home1=()=>{
    const router=useRouter();
    return(
        <div className="h">
             <h1>Welcome to My app 😇</h1>
        <div className="home-container">
            {/* <h1>🤝𝐖𝐄𝐋𝐂𝐎𝐌𝐄</h1> */}
            <div className="home-img">
                <img src="/divImage.jpg"></img>
            </div>
        <div className="admin-staff">
            <div className="admin" onClick={()=>{
                router.push("/Navbar")
            }}>
                Admin
            </div>
            <div className="staff"
            onClick={()=>{
                router.push("/NavbarUser")
            }}>
                Staff
            </div>
        </div>
        </div>
        </div>
    )
}
export default Home1