import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cardImg from '../images/card-image.svg';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AllEmployees() {

  const [employees, setEmployees] = useState();
  const BASE_URL = 'http://localhost:8080/';
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const { data } = await axios.get(BASE_URL + 'api/product');
    setEmployees(data.response);
  }

  const deleteEmployee = async (id, e) => {
    await axios.post(BASE_URL + 'api/employee/delete', { id: id });
    e.target.parentNode.parentNode.remove();
  }

  return (
    <div className='main'>
      <div className='all-employees'>
        {
          employees?.map(({ _id, avatar, name, email, phoneNumber, designation, age }, index) => {
            return (
              <Card key={index} style={{ width: '20rem' }}>
                <Card.Img variant="top" src={avatar ? BASE_URL + avatar : cardImg} />
                <Card.Body className='cards'>
                  <Card.Title>{name}</Card.Title>
                  <Card.Text>
                    Email: {email}
                  </Card.Text>
                  <Card.Text>
                    Phone: {phoneNumber}
                  </Card.Text>
                  <Card.Text>
                    Designation: {designation}
                  </Card.Text>
                  <Card.Text>
                    Age: {age}
                  </Card.Text>
                  <Button variant="primary" onClick={() => navigate("/employee-form", {state: {id: _id}})}>Update</Button>
                  <Button className='mx-2' variant="danger" onClick={(e) => deleteEmployee(_id, e)}>Delete</Button>
                </Card.Body>
              </Card>
            )
          })
        }
      </div>
    </div>
  );
}

export default AllEmployees;