import React from "react";
import { Navbar, NavDropdown, Nav, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../action/userAction";

function NavbarComponent(props) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Navbar collapseOnSelect expand="lg">
      <Navbar.Brand href="/">
        <img
          src="/images/LogoYDB.png"
          width="100"
          height="100"
          className="d-inline-block align-top"
          alt="Logo"
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/shop">Shop</Nav.Link>
          <Nav.Link href="#pricing">Blog</Nav.Link>
          <Nav.Link href="#pricing">About</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        {userInfo ? (
          <Nav>
            <Nav.Link href="/cart">
              Cart{" "}
              {cartItems.length > 0 ? (
                <Badge variant="primary">{cartItems.length}</Badge>
              ) : null}
            </Nav.Link>

            <Nav.Link onClick={() => handleLogout()}>
              {userInfo.name} - Logout
            </Nav.Link>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link href="/signin">Signup</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
