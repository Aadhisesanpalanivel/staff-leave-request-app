"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const AdminInsideNavbar = () => {
    const router = useRouter();
    const [notify, setNotify] = useState(false);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Polling for real-time updates
    useEffect(() => {
        let interval;
        if (notify) {
            fetchRequests();
            interval = setInterval(fetchRequests, 3000);
        }
        return () => clearInterval(interval);
    }, [notify]);

    const fetchRequests = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch("/api/leave-request", { method: "GET" });
            const data = await res.json();
            setRequests(data.requests || []);
        } catch (err) {
            setError("Failed to fetch leave requests.");
        }
        setLoading(false);
    };

    const handleAction = async (id, action, days) => {
        if (action === "accept" && days > 15) {
            alert("Leave request denied: Exceeds 15 days per year.");
            return;
        }
        try {
            const res = await fetch("/api/leave-request", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, action }),
            });
            const data = await res.json();
            if (data.success) {
                fetchRequests();
            } else {
                alert(data.error || "Failed to update request.");
            }
        } catch (err) {
            alert("Failed to update request.");
        }
    };

    return (
        <>
            <div className="admin_navbar">
                <div className="header">Admin</div>
                <div className="list">
                    <ul className="ul">
                        <li className="notify" onClick={() => setNotify(true)}>🔔</li>
                        <li className="logout" onClick={() => {
                            router.push("/Login");
                        }}>Logout</li>
                    </ul>
                </div>
            </div>
            {notify && (
                <div className="notify-container">
                    <div className="notify-header">
                        <h3>Leave Requests</h3>
                        <button className="notify-close-btn" onClick={() => setNotify(false)}>Close</button>
                    </div>
                    {loading && <div>Loading...</div>}
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    {requests.length === 0 && !loading && <div>No leave requests.</div>}
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
                            {req.file && req.file.originalFilename && (
                                <div className="notify-item-field"><b>File:</b> {req.file.originalFilename}</div>
                            )}
                            {req.status === 'pending' && (
                                <div className="notify-actions">
                                    <button className="notify-accept-btn" onClick={() => handleAction(req._id, 'accept', req.days)}>Accept</button>
                                    <button className="notify-reject-btn" onClick={() => handleAction(req._id, 'reject', req.days)}>Reject</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
export default AdminInsideNavbar;