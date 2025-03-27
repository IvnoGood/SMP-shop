import React from 'react';
import "./Input.css"; // Import external CSS file

export default function Input() {
    return (
        <div className="input-group">
            <input required type="text" name="text" autoComplete="off" className="input" />
            <label className="user-label">First Name</label>
        </div>
    );
}
