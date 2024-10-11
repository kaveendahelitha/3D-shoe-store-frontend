import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import '../../styles/ListEmployeeComponent.css';



const ListEmployeeComponent = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = () => {
        EmployeeService.getEmployees().then((response) => {
            setEmployees(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    const deleteEmployee = (employeeId) => {
        EmployeeService.deleteEmployee(employeeId).then((response) => {
            fetchEmployees();
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <div className="container">
            <h2 className="text-center"> List Employees </h2>
           
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th> Employee Id </th>
                        <th> Employee First Name </th>
                        <th> Employee Last Name </th>
                        <th> Employee Email Id </th>
                        <th> Edit </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map(
                            employee =>
                                <tr key={employee.id}>
                                    <td> {employee.id} </td>
                                    <td> {employee.firstName} </td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.emailId}</td>
                                    <td>
                                        <Link className="btn btn-info" to={`/update-employee/${employee.id}`} >Update</Link>
                                      
                                    </td>
                                </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ListEmployeeComponent;
