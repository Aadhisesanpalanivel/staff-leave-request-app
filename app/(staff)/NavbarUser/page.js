"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const NavbarUser = () => {
    const router = useRouter();
    const [showStatus, setShowStatus] = useState(false);
    const [staffName, setStaffName] = useState("");
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchStaffRequests = async () => {
        if (!staffName.trim()) {
            setError("Please enter your name to view status");
            return;
        }
        
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/api/leave-request?name=${encodeURIComponent(staffName)}`);
            const data = await res.json();
            setRequests(data.requests || []);
        } catch (err) {
            setError("Failed to fetch your requests");
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="admin_navbar">
                <div className="header">
                    Staff Dashboard
                </div>
                <div className="list">
                    <ul className="ul">
                        <li className="notify" onClick={() => setShowStatus(!showStatus)}>📋 Status</li>
                        <li className="requestB" onClick={() => {
                            router.push("/RequestBox")
                        }}>New Request</li>
                        <li className="logout" onClick={() => {
                            router.push("/StaffLogin")
                        }}>Logout</li>
                    </ul>
                </div>
            </div>

            {showStatus && (
                <div className="notify-container">
                    <div className="notify-header">
                        <h3>My Leave Requests</h3>
                        <button className="notify-close-btn" onClick={() => setShowStatus(false)}>Close</button>
                    </div>
                    
                    <div className="staff-status-input">
                        <input 
                            type="text" 
                            placeholder="Enter your name" 
                            value={staffName}
                            onChange={(e) => setStaffName(e.target.value)}
                        />
                        <button onClick={fetchStaffRequests}>
                            View Status
                        </button>
                    </div>

                    {loading && <div>Loading...</div>}
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    
                    {requests.length === 0 && !loading && staffName && (
                        <div>No leave requests found for &quot;{staffName}&quot;</div>
                    )}
                    
                    {requests.map((req) => (
                        <div key={req._id} className="notify-item">
                            <div className="notify-item-field"><b>Name:</b> {req.name}</div>
                            <div className="notify-item-field"><b>Department:</b> {req.department}</div>
                            <div className="notify-item-field"><b>Days:</b> {req.days}</div>
                            <div className="notify-item-field">
                                <b>Status:</b> 
                                <span className={`status-${req.status}`}> {req.status.toUpperCase()}</span>
                            </div>
                            <div className="notify-item-field">
                                <b>Submitted:</b> {new Date(req.createdAt).toLocaleDateString()}
                            </div>
                            {req.updatedAt && (
                                <div className="notify-item-field">
                                    <b>Last Updated:</b> {new Date(req.updatedAt).toLocaleDateString()}
                                </div>
                            )}
                            {req.file && req.file.originalFilename && (
                                <div className="notify-item-field"><b>File:</b> {req.file.originalFilename}</div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className="register-request" onClick={() => {
                router.push("/StaffLogin")
            }}>
                <h1>Click here to Submit a New Leave Request!</h1>
            </div>
        </div>
    )
} 
export default NavbarUser;