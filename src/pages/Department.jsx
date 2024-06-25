import React, { useEffect, useState } from 'react'
import { variables } from '../utils/Variables'

const Department = () => {
    const [departments, setDepartments] = useState([]);

    const [modalTitle, setModalTitle] = useState("");
    const [departmentName, setDepartmentName] = useState("");
    const [departmentId, setDepartmentId] = useState(0);

    const refreshList = () => {
        fetch(variables.API_URL + "Department")
            .then(response => response.json())
            .then(data => {
                setDepartments(data)
            })
    }

    const changeDepartmentName = (e) => {
        setDepartmentName(e.target.value)
    }

    const AddClick = () => {
        setModalTitle("Add Department")
        setDepartmentId(0)
        setDepartmentName("")
    }

    const EditClick = (department) => {
        setModalTitle("Edit Department")
        setDepartmentId(department.DepartmentId)
        setDepartmentName(department.DepartmentName)
    }

    const CreateClick = () => {
        fetch(variables.API_URL + "department", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ DepartmentName: departmentName })
        })
            .then(response => response.json())
            .then(result => {
                alert("Department added")
                refreshList()
            }, (error) => {
                alert("Failed")
            })
    }

    const UpdateClick = () => {
        fetch(variables.API_URL + "department", {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ DepartmentId: departmentId, DepartmentName: departmentName })
        })
            .then(response => response.json())
            .then(result => {
                alert("Department updated")
                refreshList()
            }, (error) => {
                alert("Failed")
            })
    }

    const DeleteClick = (id) => {
        if (window.confirm("Are you sure want to delete?")) {
            fetch(variables.API_URL + "department/" + id, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ DepartmentId: id })
            })
                .then(response => response.json())
                .then(result => {
                    alert("Department deleted")
                    refreshList()
                }, (error) => {
                    alert("Failed")
                })
        }
    }

    useEffect(() => {
        refreshList();
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 d-flex justify-content-between align-items-center mb-3">
                    <h3 className="h3 text-dark">Departments</h3>
                    <button type='button' className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#departmentEditModal" onClick={AddClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>
                        Add New
                    </button>
                </div>
                <div className="col-md-12">
                    <div className="card card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>
                                        DepartmentId
                                    </th>
                                    <th>
                                        DepartmentName
                                    </th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map(dep =>
                                    <tr key={dep.DepartmentId}>
                                        <td>{dep.DepartmentId}</td>
                                        <td>{dep.DepartmentName}</td>
                                        <td>
                                            <button type="button" className="btn text-info" data-bs-toggle="modal" data-bs-target="#departmentEditModal" onClick={() => EditClick(dep)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                                </svg>
                                            </button>
                                            <button type="button" className="btn text-danger" onClick={() => DeleteClick(dep.DepartmentId)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="departmentEditModal" tabIndex="-1" aria-labelledby="departmentEditModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="departmentEditModalLabel">{modalTitle}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="">Department Name</label>
                                <input type="text" className="form-control" onChange={changeDepartmentName} value={departmentName} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {departmentId == 0 && <button type="button" className="btn btn-primary" onClick={() => CreateClick()}>Create</button>}
                            {departmentId != 0 && <button type="button" className="btn btn-primary" onClick={() => UpdateClick()}>Update</button>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Department