import * as React from "react";
import '../App.css';

const Employee = ({withdrawAsEmployee}) => {
    return (
        <div className="EmployeeContainer">
            <h3>Employee</h3>
            <p>Need to switch to the Employee account</p>
            <button style={{marginTop: '1rem'}} onClick={withdrawAsEmployee} title="Withdraw">Withdraw as Employee</button>
        </div>
    )
}

export default Employee;