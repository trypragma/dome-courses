import * as React from "react";
import '../App.css';

const Admin = ({addEmployeeSubmit, employeeAddress, setEmployeeAddress, unlockTime, setUnlockTime, amountToPay, setAmountToPay  }) => {
    return (
        <div className="AdminContainer">
            <h3>Company Admin</h3>
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={addEmployeeSubmit}>
            <label> Employee Address:</label>
            <input type="text" value={employeeAddress} onChange={(e) => setEmployeeAddress(e.target.value)}/>
            <label> Unlock Time:</label>
            <input type="text" value={unlockTime} onChange={(e) => setUnlockTime(e.target.value)} />
            <label> Amount to Pay: </label>
            <input type="number" value={amountToPay} onChange={(e) => setAmountToPay(e.target.value)} />
            <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Admin;