import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService';
import '../../styles/UpdateEmployeeComponent.css';



const UpdateEmployeeComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        emailId: ''
    });

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then((res) => {
            const employeeData = res.data;
            setEmployee({
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                emailId: employeeData.emailId
            });
        });
    }, [id]);

    const updateEmployee = (e) => {
        e.preventDefault();
        let updatedEmployee = { ...employee };
        EmployeeService.updateEmployee(updatedEmployee, id).then((res) => {
            navigate('/employees');
        });
    };

    const changeFirstNameHandler = (event) => {
        setEmployee({ ...employee, firstName: event.target.value });
    };

    const changeLastNameHandler = (event) => {
        setEmployee({ ...employee, lastName: event.target.value });
    };

    const changeEmailHandler = (event) => {
        setEmployee({ ...employee, emailId: event.target.value });
    };

    const cancel = () => {
        navigate('/employees');
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">
                        <h3 className="text-center">Update Employee</h3>
                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input
                                        placeholder="First Name"
                                        name="firstName"
                                        className="form-control"
                                        value={employee.firstName}
                                        onChange={changeFirstNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Last Name: </label>
                                    <input
                                        placeholder="Last Name"
                                        name="lastName"
                                        className="form-control"
                                        value={employee.lastName}
                                        onChange={changeLastNameHandler}
                                    />
                                </div>
                                <div className="form-group">
                                    <label> Email Id: </label>
                                    <input
                                        placeholder="Email Address"
                                        name="emailId"
                                        className="form-control"
                                        value={employee.emailId}
                                        onChange={changeEmailHandler}
                                    />
                                </div>
                                <button className="btn btn-success" onClick={updateEmployee}>Save</button>
                                <button className="btn btn-danger" onClick={cancel} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployeeComponent;
