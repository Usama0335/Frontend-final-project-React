import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../AuthContext';
import { FaPlus, FaSearch, FaTrash } from 'react-icons/fa'; // Import icons for add, search, and delete buttons


const DoctorDashboard = () => {
  const { accessToken, logout } = useAuth();
  const [allPets, setAllPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');
  const [showOnlyAlive, setShowOnlyAlive] = useState(false);
  const [showAddPetModal, setShowAddPetModal] = useState(false);
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [visitMonth, setVisitMonth] = useState('');
  const [visitYear, setVisitYear] = useState('');

  const doLogout = () => {
    logout();
    navigate('/');
  };

  const fetchPets = () => {
    axios
      .get('http://localhost:4000/pets', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((response) => {
        setAllPets(response.data);
        filterPets(response.data);
      })
      .catch((error) => {
        window.alert('An error occurred: ' + error.message);
      });
  };

  const filterPets = (pets) => {
    let filtered = pets;
    if (searchText) {
      filtered = pets.filter((pet) => pet.name.toLowerCase().includes(searchText.toLowerCase()));
    }
    if (showOnlyAlive) {
      filtered = filtered.filter((pet) => pet.status.toLowerCase() === 'alive');
    }
    setFilteredPets(filtered);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  useEffect(() => {
    filterPets(allPets);
  }, [showOnlyAlive, searchText, allPets]);

  const handleAddPet = () => {
    setShowAddPetModal(true);
  };

  const handleCloseAddPetModal = () => {
    setShowAddPetModal(false);
  };

  const handleSubmitAddPet = () => {
    // Your logic to add a pet goes here
    // You can access the input field values from the state variables
    // After adding a pet, close the modal
    setShowAddPetModal(false);
  };
  

  const handleDeletePet = (petId) => {
    // Implement logic to delete the pet with the given ID
    // For example, you can send a DELETE request to the backend API
    axios.delete(`http://localhost:4000/pets/${petId}`)
      .then((response) => {
        // After successful deletion, refetch the pets to update the list
        fetchPets();
      })
      .catch((error) => {
        window.alert('An error occurred while deleting the pet: ' + error.message);
      });
  };

  return (
    <Container className="dashboard-background">
      <Row className="mt-4">
        <Col>
          <Col className="text-center">
            <h1 style={{ color: '#3498db', fontSize: '2.5em', fontFamily: 'cursive' }}>
              Doctor Dashboard
            </h1>
          </Col>
          <Button variant="primary" className="me-3" onClick={handleAddPet}>
            <FaPlus className="me-2" />
            Add Pet
          </Button>
          <Col xs="auto" className="text-end">
            <Button variant="danger" onClick={doLogout}>
              Sign Out
            </Button>
          </Col>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <Form>
            <Form.Group controlId="searchText" className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search pets..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <FaSearch className="search-icon" />
            </Form.Group>
            <Form.Group controlId="showOnlyAlive" className="mb-3">
              <Form.Check
                type="checkbox"
                label="Show Only Alive Pets"
                checked={showOnlyAlive}
                onChange={(e) => setShowOnlyAlive(e.target.checked)}
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <ListGroup>
            {filteredPets.map((pet, id) => (
              <ListGroup.Item key={pet.id} className="d-flex justify-content-between align-items-center">
                {pet.name} - {pet.petType} - {pet.status} - Last visited: {pet.dob}
                <Button variant="danger" size="sm" onClick={() => handleDeletePet(pet.id)}>
                  <FaTrash />
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Modal show={showAddPetModal} onHide={handleCloseAddPetModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Pet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="petName">
              <Form.Label>Pet Name</Form.Label>
              <Form.Control
                type="text"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="petType">
              <Form.Label>Pet Type</Form.Label>
              <Form.Control
                type="text"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="visitDate">
              <Form.Label>Visit Date</Form.Label>
              <Form.Control
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAddPetModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmitAddPet}>
            Add Pet
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DoctorDashboard;
