import React from "react";
import { Card, CardDeck, Carousel } from "react-bootstrap";

function HomePage(props) {
  return (
    <div>
      <div id="home">
        <div className="text-intro">
          <div className="landing-text">
            <h1>DELTA BIRD NEST</h1>
            <h3>Quality from nature</h3>
            <a href="#" className="btn btn-info btn-lg">
              Buy Now
            </a>
          </div>
        </div>
        <div className="image-intro">
          <img
            src="/images/YDB-concept-1-to-1.jpeg"
            className="img-intro"
          ></img>
        </div>
      </div>

      <div className="padding"></div>

      <div className="card-product">
        <h2 className="text-center">San Pham Cua Chung Toi</h2>
        <CardDeck>
          <Card>
            <Card.Img variant="top" src="/images/2ba5546f5833a46dfd22.jpg" />
            <Card.Body>
              <Card.Title>To Yen Tinh Che 100g</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card>
            <Card.Img variant="top" src="/images/YDB-50.png" />
            <Card.Body>
              <Card.Title>To Yen Tinh Che 50g</Card.Title>
              <Card.Text>
                This card has supporting text below as a natural lead-in to
                additional content.{" "}
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
          <Card>
            <Card.Img variant="top" src="images/1d93fa5bf6070a595316.jpg" />
            <Card.Body>
              <Card.Title>Yen 1 To</Card.Title>
              <Card.Text>
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This card has even longer content
                than the first to show that equal height action.
              </Card.Text>
            </Card.Body>
            {/* <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer> */}
          </Card>
        </CardDeck>
      </div>

      <div id="fixed"></div>

      <div className="padding"></div>

      <div className="container myCarousel">
        <button className="btn btn-lg btn-info">
          Xem Nha Yen Cua Chung Toi >>
        </button>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/Lỗ-ra-vào-của-nhà-yến.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/nha-yen-kien-giang.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/nhayen1.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/images1964299_a2..jpg"
              alt="Fourth slide"
            />

            <Carousel.Caption>
              <h3>Fourth slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default HomePage;
