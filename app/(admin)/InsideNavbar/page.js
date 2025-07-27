"use client"
import AdminInsideNavbar from "@/Components/AdminInsideNavbar"
import { useRouter } from "next/navigation"

const InsideNavbar=()=>{
    const router=useRouter();
    return(
        
        <div>
            <AdminInsideNavbar/>
            <div className="dept">
                <div className="dept-ids" 
                onClick={()=>{
                   router.push("/AimlJson")
                }}>
                    <div>
                        <img src="/aimlEng.jpg"></img>
                        <h2>AI & ML</h2>
                    </div>
                </div>
                <div className="dept-ids"onClick={()=>{
                   router.push("/CivilJson")
                }}>
                    <div>
                        <img src="/civil.jpeg"></img>
                        <h2>Civil Engineering</h2>
                    </div>
                </div>
                <div className="dept-ids"
                onClick={()=>{
                   router.push("/RoboticsJson")
                }} >
                    <div>
                        <img src="/cse.jpeg"></img>
                        <h2>Robotics</h2>
                    </div>
                </div>
                <div className="dept-ids"
                onClick={()=>{
                   router.push("/MechJson")
                }}>
                    <div>
                        <img src="/mechEng.jpg"></img>
                        <h2>Mechanical Engineering</h2>
                    </div>
                </div>
                <div className="dept-ids" onClick={()=>{
                   router.push("/CseJson")
                }}>
                    <div>
                        <img src="/cseEng.jpeg"></img>
                        <h2>Computer Science & Engineering</h2>
                    </div>
                </div>
                <div className="dept-ids"
                onClick={()=>{
                   router.push("/CsbsJson")
                }}>
                    <div>
                        <img src="/Csbs.jpeg"></img>
                        <h2>Computer Science& Business System</h2>
                    </div>
                </div>
                <div className="dept-ids"
                onClick={()=>{
                   router.push("/CceJson")
                }}>
                    <div>
                        <img src="/cce.jpeg"></img>
                        <h2>Computer & Communication Engineering</h2>
                    </div>
                </div>
                <div className="dept-ids"
                onClick={()=>{
                   router.push("/AidsJson")
                }}>
                    <div>
                        <img src="/aids.jpeg"></img>
                        <h2>AI & DS</h2>
                    </div>
                </div>
                
                 
            </div>
        </div>
    )
}
export default InsideNavbar