import { Link } from "react-router-dom"
import { Logout } from "./pages/home"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

interface state_props {
    loggedInStatus: string, 
    user: {[key: string]: string | number | undefined},
    setUser: Function, 
    setLoggedInStatus: Function
}


export const NavbarHome = (props: state_props) => {
    if (props.loggedInStatus === "user logged in") {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">EgamagE</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link as={Link} to={'/dashboard'}>Dashboard</Nav.Link>
          <Nav.Link as={Link} to={`/profile/${props.user.id}`}>My Profile</Nav.Link>
          <Nav.Link as={Link} to={'/games'}>Games</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a>{props.user.email}</a>
          </Navbar.Text>
        </Navbar.Collapse>
          <Logout setLoggedInStatus={props.setLoggedInStatus} setUser={props.setUser} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
    } else {
        return(
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">EgamagE</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link as={Link} to={'/'}>Login</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
    </Navbar>
        )
    }
}
