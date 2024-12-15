import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { jwtDecode } from 'jwt-decode';

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('Apparel');

  const categories = {
    Shoes: [
      { image: 'shoe.jpg', title: 'Trend Shoes', description: 'NIKE KILLSHOT 2 PREMIUM.' },
      { image: 'shoe2.jpg', title: 'Latest Shoes', description: 'NIKE SHOX.' },
      { image: 'shoe3.jpg', title: 'Collab Shoes', description: 'NIKE SB X STUSSY.' },
    ],
    Apparel: [
      { image: 'shirt.jpg', title: 'Latest Apparel', description: 'NIKE SB SUNFLOWER.' },
      { image: 'apparel.jpg', title: 'Vintage Apparel', description: 'NIKE CHAMPIONSHIP SHIRT 1998.' },
      { image: 'apparel2.jpg', title: 'Collab Apparel', description: 'NIKE X STUSSY SWEATPANTS.' },
    ],
    Accessories: [
      { image: 'access.jpg', title: 'Sport Peripherals', description: 'NIKE SKI MASK.' },
      { image: 'access2.jpg', title: 'Wrist Accessories', description: 'NIKE WATCH.' },
      { image: 'cap.jpg', title: 'Head Gear', description: 'NIKE DADHAT.' },
    ],
  };

  useEffect(() => {
    const fetchUser = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error('Failed to verify session:', error);
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <>
      <Navbar expand="lg" style={{ backgroundColor: '#343a40', padding: '10px' }}>
        <Container>
          <Navbar.Brand as={Link} to="/dashboard" style={{ color: 'white', fontWeight: 'bold' }}>NIKE OUTLET</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/dashboard/logbook" style={{ color: 'white' }}>Employee's Records</Nav.Link>
              <NavDropdown title={<span style={{ color: 'white' }}>Categories</span>} id="category-nav-dropdown">
                <NavDropdown.Item onClick={() => setSelectedCategory('Shoes')}>Shoes</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedCategory('Apparel')}>Apparel</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setSelectedCategory('Accessories')}>Accessories</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav className="ms-auto">
              <NavDropdown title={user?.username || 'Account'} id="basic-nav-dropdown" align="end">
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div style={{ 
        backgroundImage: "url('nikebg.jpg')", 
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        minHeight: '100vh', 
        color: '#fff' 
      }}>
        <Container>
          <h2 className="mt-4 text-center">
            Welcome to NIKE OUTLET {selectedCategory}, {user ? user.username : 'Guest'}!
          </h2>
          <Row>
            {categories[selectedCategory].map((item, index) => (
              <Col md={4} key={index} className="mb-4">
                <Card>
                  <Card.Img 
                    variant="top" 
                    src={item.image} 
                    alt={item.title} 
                    style={{ width: '100%', height: '500px', objectFit: 'cover' }} // Ensures uniform size
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Dashboard;
