import React from "react";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";

import Background1 from "./assets/01.jpg";
import Background2 from "./assets/02.jpg";
import Background3 from "./assets/03.jpg";

const Home = () => {
  return (
    <>
      <div className=" mb-3 mx-auto " style={{ width: "100%" }}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Background1}
              alt="First slide"
            />

            <Carousel.Caption
              style={{
                bottom: "50%",
              }}
            >
              <h1 style={{ fontSize: "10vw" }}>Predictive</h1>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Background2}
              alt="Second slide"
            />
            <Carousel.Caption
              style={{
                bottom: "50%",
              }}
            >
              <h1 style={{ fontSize: "10vw" }}>Adoptive</h1>
            </Carousel.Caption>{" "}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Background3}
              alt="Third slide"
            />
            <Carousel.Caption
              style={{
                bottom: "50%",
              }}
            >
              <h1 style={{ fontSize: "10vw" }}>Result Oriented</h1>
            </Carousel.Caption>{" "}
          </Carousel.Item>
        </Carousel>
      </div>
      <Container>
        <div style={{ fontSize: "16px", textAlign: "justify" }}>
          <span
            style={{ color: "#008B8B", fontStyle: "italic", fontSize: "24px" }}
          >
            Smart Assitant{" "}
          </span>
          predicts the price of a used vehicle in Sri Lanka more accurately by
          getting input from the user with some essential features of a vehicle
          as inputs such as model, brand name, mileage driven, fuel type,
          transmission type, capacity, year. It is designed to avoid the issues
          that can be occurred when buying or selling a vehicle in Sri Lanka.
          Smart Assitant allows users to get to know about the worth of their
          vehicle even they are not experts in that field.
        </div>
        <br></br>
        <div>
          <h3 style={{ color: "#008B8B" }}>AIMs</h3>
          <Row style={{ fontSize: "16px", textAlign: "left" }}>
            <Col md={3} style={{ paddingTop: "3px", paddingBottom: "3px" }}>
              <Card style={{ borderColor: "#008B8B" }}>
                <Card.Body>
                  <Row>
                    <Col md={3} style={{ color: "#008B8B" }}>
                      <img src="https://img.icons8.com/fluency/48/null/carpool.png" />
                    </Col>
                    <Col md={9}>
                      Get to know about factors that could affect the price when
                      buying a used vehicle
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} style={{ paddingTop: "3px", paddingBottom: "3px" }}>
              <Card style={{ borderColor: "#008B8B" }}>
                <Card.Body>
                  <Row>
                    <Col md={3} md={3} style={{ color: "#008B8B" }}>
                      <img src="https://img.icons8.com/fluency/48/null/money-bag.png" />
                    </Col>
                    <Col md={9}>
                      Enable user to search vehicle prices without any
                      skepticism
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} style={{ paddingTop: "3px", paddingBottom: "3px" }}>
              <Card style={{ borderColor: "#008B8B" }}>
                <Card.Body>
                  <Row>
                    <Col md={3} style={{ color: "#008B8B" }}>
                      <img src="https://img.icons8.com/fluency/48/null/globe.png" />
                    </Col>
                    <Col md={9}>
                      {" "}
                      Find available vehicle prices accurately easily at anytime
                      from anywhere
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3} style={{ paddingTop: "3px", paddingBottom: "3px" }}>
              <Card style={{ borderColor: "#008B8B" }}>
                <Card.Body>
                  <Row>
                    <Col md={3} md={3} style={{ color: "#008B8B" }}>
                      <img src="https://img.icons8.com/cotton/64/null/profitable-idea.png" />
                    </Col>
                    <Col md={9}>
                      Show alternative vehicles that is similar to the predicted
                      price
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <br></br>
      </Container>
    </>
  );
};

export default Home;
