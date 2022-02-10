import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios'

function Home() {
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [fuels, setFuels] = useState([]);
    const [transmissions, setTransmissions] = useState([]);
    const [conditions, setConditions] = useState([]);
    const [capacities, setCapacities] = useState([]);

    const [brand, setBrand] = useState("alfa romeo");
    const [vehicle_model, setModel] = useState("206");
    const [year, setYear] = useState(2000);
    const [mileage, setMileage] = useState(0);
    const [fuel, setFuel] = useState("cng");
    const [transmission, setTransmission] = useState("automatic");
    const [condition, setCondition] = useState("new");
    const [capacity, setCapacity] = useState("0");
    const [price, setPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            axios.get("http://127.0.0.1:5000/get_brand_types").then((res) => {
                setBrands(res.data.brands);
            }).catch((err) => {
                alert(err)
            });

            axios.get("http://127.0.0.1:5000/get_vehiclemodel_types").then((res) => {
                setModels(res.data.vehicle_models);
            }).catch((err) => {
                alert(err)
            });

            axios.get("http://127.0.0.1:5000/get_fuel_types").then((res) => {
                setFuels(res.data.fuels);
            }).catch((err) => {
                alert(err)
            });

            axios.get("http://127.0.0.1:5000/get_transmission_types").then((res) => {
                setTransmissions(res.data.transmissions);
            }).catch((err) => {
                alert(err)
            });

            axios.get("http://127.0.0.1:5000/get_condition_types").then((res) => {
                setConditions(res.data.conditions);
            }).catch((err) => {
                alert(err)
            });

            axios.get("http://127.0.0.1:5000/get_capacity_types").then((res) => {
                setCapacities(res.data.capacities);
            }).catch((err) => {
                alert(err)
            });
        };
        fetchData();
    }, []);

    function getPrice(e) {
        e.preventDefault();

        const newVehicle = {
            brand, vehicle_model, year, mileage, fuel, transmission, condition, capacity
        }

        console.log(newVehicle);

        axios.post("http://127.0.0.1:5000/predict_vehicle_price", newVehicle).then((res) => {
            console.log(res.data.estimated_price);
            setPrice(res.data.estimated_price);
        }).catch((err) => {
            alert(err);
            if (err.response)
                console.log(err.response)

            if (err.request)
                console.log(err.request)
        });

    }

    return (
        <div>
            <Container>
                <Form onSubmit={getPrice}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Vehicle Brand</Form.Label>
                                <Form.Select aria-label="Brand select" id="brand" onChange={(e) => {
                                    setBrand(e.target.value)
                                }} >
                                    {brands.map((brand, index) =>
                                        <option key={index} value={brand}>{brand}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Vehicle Model</Form.Label>
                                <Form.Select aria-label="Brand select" id="vehicle_model" onChange={(e) => {
                                    setModel(e.target.value)
                                }}  >
                                    {models.map((model, index) =>
                                        <option key={index} value={model}>{model}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Year</Form.Label>
                                <Form.Control type="number" placeholder="Enter the vehicle manufactured year" id="year" onChange={(e) => {
                                    setYear(parseInt(e.target.value))
                                }} />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Mileage</Form.Label>
                                <Form.Control type="float" placeholder="Enter the vehicle mileage" id="mileage" onChange={(e) => {
                                    setMileage(parseFloat(e.target.value))
                                }} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Fuel Type</Form.Label>
                                <Form.Select aria-label="Fuel select" id="fuel" onChange={(e) => {
                                    setFuel(e.target.value)
                                }}  >
                                    {fuels.map((fuel, index) =>
                                        <option key={index} value={fuel}>{fuel}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Transmission Type</Form.Label>
                                <Form.Select aria-label="Transmission select" id="transmssion" onChange={(e) => {
                                    setTransmission(e.target.value)
                                }}  >
                                    {transmissions.map((transmssion, index) =>
                                        <option key={index} value={transmssion}>{transmssion}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Condition Type</Form.Label>
                                <Form.Select aria-label="Condition select" id="condition" onChange={(e) => {
                                    setCondition(e.target.value)
                                }}  >
                                    {conditions.map((condition, index) =>
                                        <option key={index} value={condition}>{condition}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Engine Capacity</Form.Label>
                                <Form.Select aria-label="Brand select" id="capacity" onChange={(e) => {
                                    setCapacity(e.target.value)
                                }}  >
                                    {capacities.map((capacity, index) =>
                                        <option key={index} value={capacity}>{capacity}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-grid">
                        <Button type="submit" size="lg" style={{backgroundColor:'#008B8B'}}>
                            View Price
                    </Button>
                    </div>
                </Form>
                <br></br>
                <Card className="text-center">
                    <Card.Header>Predicted Price for <strong>{brand} {vehicle_model}</strong></Card.Header>
                    <Card.Body>
                        <Card.Title>Rs.{parseInt(price).toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}/=</Card.Title>
                        <Card.Text>
                            See Related Vehicles
                    </Card.Text>
                        <Button style={{backgroundColor:'#008B8B'}}>See more</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Last updated on Feb 2022</Card.Footer>
                </Card>
            </Container>
        </div>
    )
}

export default Home;