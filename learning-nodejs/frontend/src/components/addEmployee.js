import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function AddEmployee() {

    const location = useLocation();
    const navigate = useNavigate();
    const imageInpRef = useRef();
    const imagePreviewRef = useRef();
    const formRef = useRef();
    const BASE_URL = 'http://localhost:8000/';

    useEffect(() => {
        if (location.state) {
            getEmloyeeById();
        } else {
            formRef.current.reset();
            imagePreviewRef.current.src = "";
            imageInpRef.current.required = true;
        }
    }, [location.state]);

    const addEmployee = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("avatar", e.target.avatar.files[0]);
        formData.append("name", e.target.name.value);
        formData.append("email", e.target.email.value);
        formData.append("phoneNumber", e.target.phone.value);
        formData.append("designation", e.target.designation.value);
        formData.append("age", e.target.age.value);

        let response;
        if (!location.state) {
            response = await axios.post(BASE_URL + 'api/employee/add', formData);
        } else {
            formData.append("id", location.state.id);
            response = await axios.post(BASE_URL + 'api/employee/update', formData)
            navigate("/");
        }
        
        if(response.data.error) {
            if(response.data.error?.code == 11000) {
                alert(e.target.email.value + " is aready in used by another account.")
            } else {
                alert(response.data.message);
            }
        } else {
            e.target.reset();
            imagePreviewRef.current.src = "";
            alert(response.data.message);
        }
    }

    const getEmloyeeById = async () => {
        const { data } = await axios.post(BASE_URL + 'api/employee/id', { id: location.state.id });
        const { avatar, name, email, phoneNumber, designation, age } = data.response;
        imagePreviewRef.current.src = BASE_URL + avatar;
        formRef.current.name.value = name;
        formRef.current.email.value = email;
        formRef.current.phone.value = phoneNumber;
        formRef.current.designation.value = designation;
        formRef.current.age.value = age;
    }

    return (
        <div className='main add-employee'>
            <Form onSubmit={(e) => { addEmployee(e) }} ref={formRef}>
                <Form.Group>
                    <Form.Label>Avatar</Form.Label>
                    <Form.Control type="file" name="avatar" accept=".png, .jpg, .jpeg" ref={imageInpRef}
                        onChange={(e) => e.target.files[0] ? imagePreviewRef.current.src = URL.createObjectURL(e.target.files[0])
                            : imagePreviewRef.current.src = ""} />
                    <img className='prev-img' src="" ref={imagePreviewRef} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Full name</Form.Label>
                    <Form.Control name="name" type="text" placeholder="Enter full name" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phone number</Form.Label>
                    <Form.Control name="phone" type="text" placeholder="Enter phone number" required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Designation</Form.Label>
                    <Form.Select name="designation" required>
                        <option value="" defaultChecked>Open this select menu</option>
                        <option value="Software Engineer">Software Engineer</option>
                        <option value="SQA Engineer">SQA Engineer</option>
                        <option value="Mobile App Developer">Mobile App Developer</option>
                        <option value="Graphics Designer">Graphics Designer</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Age</Form.Label>
                    <Form.Control name="age" type="text" placeholder="Enter age" required />
                </Form.Group>

                {/* <Form.Group className="mb-3" name="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group> */}
                <Button variant="primary" type="submit">
                    {location.state ? "Update" : "Add"} Employee
                </Button>
            </Form>
        </div>
    )
}

export default AddEmployee;