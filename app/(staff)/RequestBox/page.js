"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

const RequestBox=()=>{
    const router=useRouter();
    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [days, setDays] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (parseInt(days) > 15) {
            setError("Leave request denied: Exceeds 15 days per year.");
            setSuccess("");
            return;
        }
        setError("");
        setSuccess("");
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("department", department);
            formData.append("days", days);
            if (file) formData.append("file", file);
            const res = await fetch("/api/leave-request", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                setSuccess("Leave request submitted successfully!");
                setName("");
                setDepartment("");
                setDays("");
                setFile(null);
                                router.push('/NavbarUser');
            } else {
                setError(data.error || "Failed to submit leave request.");
            }
        } catch (err) {
            setError("Failed to submit leave request.");
        }
    };

    return(
        <div className="request-container">
           <div className="request-header">
            <h1>Leave-Request-Form</h1>
           </div>
           <div className="request-form">
            <form className="form" onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
                <input type="text" placeholder="Department" value={department} onChange={e => setDepartment(e.target.value)} required/>
                <input type="number" placeholder="No-of-days" value={days} onChange={e => setDays(e.target.value)} required/>
                <input type="file" placeholder="Upload the files here" onChange={e => setFile(e.target.files[0])}/>
                <button className="btn1" type="submit">Request</button>
                {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
                {success && <div style={{ color: 'green', marginTop: 8 }}>{success}</div>}
            </form>
            <button className="btn3" style={{marginTop: '1rem'}} onClick={()=>router.push('/StaffLogin')}>Back to Home</button>
           </div>
        </div>
    )
}
export default RequestBox