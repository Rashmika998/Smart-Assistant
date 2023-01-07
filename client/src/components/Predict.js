import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.js";
import DataTable from "react-data-table-component";
import axios from "axios";
import Background1 from "./assets/01.jpg";

function Predict() {
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
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://127.0.0.1:5000/get_brand_types")
        .then((res) => {
          setBrands(res.data.brands);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("http://127.0.0.1:5000/get_vehiclemodel_types")
        .then((res) => {
          setModels(res.data.vehicle_models);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("http://127.0.0.1:5000/get_fuel_types")
        .then((res) => {
          setFuels(res.data.fuels);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("http://127.0.0.1:5000/get_transmission_types")
        .then((res) => {
          setTransmissions(res.data.transmissions);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("http://127.0.0.1:5000/get_condition_types")
        .then((res) => {
          setConditions(res.data.conditions);
        })
        .catch((err) => {
          alert(err);
        });

      axios
        .get("http://127.0.0.1:5000/get_capacity_types")
        .then((res) => {
          setCapacities(res.data.capacities);
        })
        .catch((err) => {
          alert(err);
        });
    };
    fetchData();
  }, []);

  function getPrice(e) {
    e.preventDefault();

    const newVehicle = {
      brand,
      vehicle_model,
      year,
      mileage,
      fuel,
      transmission,
      condition,
      capacity,
    };

    console.log(newVehicle);

    axios
      .post("http://127.0.0.1:5000/predict_vehicle_price", newVehicle)
      .then((res) => {
        console.log(res.data.estimated_price);
        setPrice(res.data.estimated_price);
        const searchedVehicle = {
          brand,
          vehicle_model,
          year,
          mileage,
          fuel,
          transmission,
          condition,
          capacity,
          price: res.data.estimated_price,
        };

        axios
          .post("http://127.0.0.1:5000/add_vehicle", searchedVehicle)
          .then((res) => {
            console.log(searchedVehicle);
            console.log(res.data.status);
          })
          .catch((err) => {
            alert(err);
            if (err.response) console.log(err.response);

            if (err.request) console.log(err.request);
          });
      })
      .catch((err) => {
        alert(err);
        if (err.response) console.log(err.response);

        if (err.request) console.log(err.request);
      });
  }

  function seeRelatedVehicles() {
    const vehicle_prop = { price: price, year: year };
    axios
      .post("http://127.0.0.1:5000/get_related_vehicles", vehicle_prop)
      .then((res) => {
        setVehicles(res.data.vehicles);
      })
      .catch((err) => {
        alert(err);
        if (err.response) console.log(err.response);

        if (err.request) console.log(err.request);
      });
  }

  const BootyPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    currentPage,
  }) => {
    const handleBackButtonClick = () => {
      onChangePage(currentPage - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
    };

    const handlePageNumber = (e) => {
      onChangePage(Number(e.target.value));
    };

    const pages = getNumberOfPages(rowCount, rowsPerPage);
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === pageItems.length;
    const previosDisabled = currentPage === 1;

    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>
          {pageItems.map((page) => {
            const className =
              page === currentPage ? "page-item active" : "page-item";

            return (
              <li key={page} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 1; i < pages; i++) {
      results.push(i);
    }

    return results;
  }

  const columns = [
    {
      name: "Brand",
      selector: (row) => row.Brand,
      sortable: true,
    },
    {
      name: "Model",
      selector: (row) => row.Model,
      sortable: true,
    },
    {
      name: "Mileage (km)",
      selector: (row) =>
        parseInt(row.mileage)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    },
    {
      name: "Fuel",
      selector: (row) => row.Fuel,
      sortable: true,
    },
    {
      name: "Transmission",
      selector: (row) => row.Transmission,
      sortable: true,
    },
    {
      name: "Condition",
      selector: (row) => row.Condition,
      sortable: true,
    },
    {
      name: "Capacity (cc)",
      selector: (row) => row.capacity,
    },
    {
      name: "Price (Rs.)",
      selector: (row) =>
        (parseInt(row.price).toString() + "/=").replace(
          /\B(?=(\d{3})+(?!\d))/g,
          ","
        ),
    },
  ];

  // const related_vehicles = vehicles;

  function filterData(vehicles, searchKey) {
    const result = vehicles.filter(
      (vehicle) =>
        vehicle.Brand.toLowerCase().includes(searchKey) ||
        vehicle.Model.toLowerCase().includes(searchKey)
    );
    setVehicles(result);
  }

  function handleSearchArea(e) {
    const searchKey = e.currentTarget.value;
    const vehicle_prop = { price: price, year: year };
    axios
      .post("http://127.0.0.1:5000/get_related_vehicles", vehicle_prop)
      .then((res) => {
        filterData(res.data.vehicles, searchKey);
      })
      .catch((err) => {
        alert(err);
        if (err.response) console.log(err.response);

        if (err.request) console.log(err.request);
      });
  }

  const SearchVehicle = (
    <div className="col-lg-3 mt-2 mb-2">
      <input
        className="form-control"
        type="search"
        placeholder="Search vehicle"
        name="searchQuery"
        onChange={handleSearchArea}
      ></input>
    </div>
  );

  return (
    <div>
      <br></br>
      <Container>
        <Form onSubmit={getPrice}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Brand</Form.Label>
                <Form.Select
                  aria-label="Brand select"
                  id="brand"
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                >
                  {brands.map((brand, index) => (
                    <option key={index} value={brand}>
                      {brand}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Vehicle Model</Form.Label>
                <Form.Select
                  aria-label="Brand select"
                  id="vehicle_model"
                  onChange={(e) => {
                    setModel(e.target.value);
                  }}
                >
                  {models.map((model, index) => (
                    <option key={index} value={model}>
                      {model}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Year (Valid for vehicles manufactured above 2000)
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter the vehicle manufactured year"
                  id="year"
                  onChange={(e) => {
                    setYear(parseInt(e.target.value));
                  }}
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Mileage (km)</Form.Label>
                <Form.Control
                  type="float"
                  placeholder="Enter the vehicle mileage"
                  id="mileage"
                  onChange={(e) => {
                    setMileage(parseFloat(e.target.value));
                  }}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Fuel Type</Form.Label>
                <Form.Select
                  aria-label="Fuel select"
                  id="fuel"
                  onChange={(e) => {
                    setFuel(e.target.value);
                  }}
                >
                  {fuels.map((fuel, index) => (
                    <option key={index} value={fuel}>
                      {fuel}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Transmission Type</Form.Label>
                <Form.Select
                  aria-label="Transmission select"
                  id="transmssion"
                  onChange={(e) => {
                    setTransmission(e.target.value);
                  }}
                >
                  {transmissions.map((transmssion, index) => (
                    <option key={index} value={transmssion}>
                      {transmssion}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Condition Type</Form.Label>
                <Form.Select
                  aria-label="Condition select"
                  id="condition"
                  onChange={(e) => {
                    setCondition(e.target.value);
                  }}
                >
                  {conditions.map((condition, index) => (
                    <option key={index} value={condition}>
                      {condition}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>
                  Engine Capacity (Please select the correct capacity to avoid
                  unexpected results)
                </Form.Label>
                <Form.Select
                  aria-label="Brand select"
                  id="capacity"
                  onChange={(e) => {
                    setCapacity(e.target.value);
                  }}
                >
                  {capacities.map((capacity, index) => (
                    <option key={index} value={capacity}>
                      {capacity}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <div className="d-grid">
            <Button
              type="submit"
              size="lg"
              style={{ backgroundColor: "#008B8B" }}
            >
              View Price
            </Button>
          </div>
        </Form>
        <br></br>
        <Card className="text-center">
          <Card.Header>
            Predicted Price for
            <strong>
              {" " + brand[0].toUpperCase() + brand.slice(1)}{" "}
              {vehicle_model[0].toUpperCase() + vehicle_model.slice(1)}
            </strong>
          </Card.Header>
          <Card.Body>
            <Card.Title>
              Rs.
              {parseInt(price)
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              /=
            </Card.Title>
            <Card.Text>
              Click the below button to view Related Vehicles
            </Card.Text>
            <Button
              style={{ backgroundColor: "#008B8B" }}
              onClick={seeRelatedVehicles}
            >
              See more...
            </Button>
            <br></br>
            <br></br>
            <DataTable
              title="Relatable Vehicles with Same Manufactured Year"
              responsive
              subHeader
              columns={columns}
              data={vehicles}
              subHeaderComponent={SearchVehicle}
              striped={true}
              highlightOnHover={true}
              pagination
              paginationComponent={BootyPagination}
              defaultSortFieldID={1}
            />
          </Card.Body>
          <Card.Footer className="text-muted">
            Last updated on Feb 2022
          </Card.Footer>
        </Card>
        <br></br>
      </Container>
    </div>
  );
}

export default Predict;
