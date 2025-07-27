"use client"
import { useRouter } from "next/navigation"

const RequestBox=()=>{
    const router=useRouter();
    return(
        <div className="request-container">
           <div className="request-header">
            <h1>Leave-Request-Form</h1>
           </div>
           <div className="request-form">
            <form className="form">
                <input type="text" placeholder="Name"/>
                <input type="text" placeholder="Department"/>
                <input type="number" placeholder="No-of-days"/>
                <input type="file" placeholder="Upload the files here"/>
                <button className="btn1">Request</button>
                
            </form>
           </div>
        </div>
    )
}
export default RequestBox