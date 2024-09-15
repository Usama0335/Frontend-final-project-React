import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { AuthProvider, useAuth } from '../AuthContext'; // Import AuthContext
import './Home.css'; // Import the CSS file for styling

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:4000/login', {
        email,
        password,
      });
      if (response.data && response.data.access_token) {
        login(response.data.access_token);
        const userType = response.data.id;
        if (userType === 0) {
          navigate('/doctor');
        } else if (userType === 1 || userType === 2 || userType === 3) {
          navigate('/pet-owner');
        }
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="home-background">
      <Container className="mt-5">
        <Row>
          <Col>
            {/* Stylish website name */}
            <h1 className="text-center mb-4" style={{ color: '#3498db', fontSize: '4em', fontFamily: 'cursive' }}>
              Pet Clinic
            </h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} className="text-center bg-light p-4 rounded shadow">
            <h2 className="mb-4">Login</h2>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Form>
              <Form.Group controlId="email">
                <Form.Label className="mb-2">Email:</Form.Label>
                <div className="input">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ width: '100%', height: '50px', borderRadius: '10px', backgroundColor: 'transparent', border: '2px solid black', padding: '20px 45px 20px 20px', color: 'black', fontSize: '16px' }}
                  />
                  <FaUserCircle className="icon" />
                </div>
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label className="mb-2">Password:</Form.Label>
                <div className="input">
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ width: '100%', height: '50px', borderRadius: '10px', backgroundColor: 'transparent', outline: 'none', border: '2px solid black', padding: '20px 45px 20px 20px', color: 'black', fontSize: '16px' }}
                  />
                  <RiLockPasswordFill className="icon" />
                </div>
              </Form.Group>

              <Button variant="primary" onClick={handleLogin} className="mt-3">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
