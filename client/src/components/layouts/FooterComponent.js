import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons";

function FooterComponent(props) {
  return (
    <footer className="footer">
      <Container fluid>
        <Row>
          <Col md={4} xs={6} className="footer-address">
            <h3>Contact Us</h3>
            <ul>
              <li>
                Hem 3T2 duong 30/4, phuong Xuan Khanh, quan Ninh Kieu, TP Can
                Tho
              </li>
              <li>So 72, duong CMT8, quan Ninh Kieu, TP Can Tho</li>
              <li>Email: yendongbang@gmail.com</li>
              <li>SDT: 0123456789</li>
            </ul>
          </Col>
          <Col md={4} xs={6} className="footer-connect">
            <h3>Connect US</h3>
            <ul>
              <li>
                <a
                  href="https://www.facebook.com/yendongbang"
                  className="fa"
                  target="_blank"
                >
                  <FontAwesomeIcon icon={faFacebookSquare} size="3x" />
                </a>
              </li>
              <li>
                <a href="#" className="fa">
                  <img
                    src="/images/Lazada_(2019)_icon.png"
                    width="45px"
                    height="45px"
                  ></img>
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4} xs={12}>
            <img src="/images/LogoYDB.png" className="logo"></img>
          </Col>
        </Row>
        <div>
          <p className="text-center">
            Copyright &#169; SD. All rights reserved
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default FooterComponent;
