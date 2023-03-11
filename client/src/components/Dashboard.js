import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/js/bootstrap.bundle.js";
import DataTable from "react-data-table-component";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function Dashboard() {
  var url = document.location.href;
  var user_id = url.toString().split("/")[4];
  const [vehicles, setVehicles] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandValues, setBrandValues] = useState([]);
  let brandVals = [];

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://127.0.0.1:5000/get_vehicles")
        .then((res) => {
          setVehicles(res.data.vehicles);
          axios
            .get("http://127.0.0.1:5000/get_brand_types")
            .then((res) => {
              setBrands(res.data.brands);
            })
            .catch((err) => {
              console.log(err);
            });
          let i = 0;
          brands.map((brand) => {
            brandVals[i] = 0;
            res.data.vehicles.map((vehicle) => {
              if (vehicle.brand === brand) {
                brandVals[i]++;
              }
            });
            i++;
          });
          setBrandValues(brandVals);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchData();
  }, []);

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
      selector: (row) => row.brand,
    },
    {
      name: "Model",
      selector: (row) => row.vehicle_model,
    },
    {
      name: "Year",
      selector: (row) => row.year,
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
      selector: (row) => returnFuelType(row.fuel),
    },
    {
      name: "Transmission",
      selector: (row) => returnTransmissionType(row.transmission),
    },
    {
      name: "Condition",
      selector: (row) => returnConditionType(row.condition),
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

  function returnTransmissionType(transmission_type) {
    console.log("lk");
    if (transmission_type === "automatic")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-success"
        >
          Automatic
        </button>
      );
    else if (transmission_type === "manual")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-warning"
        >
          Manual
        </button>
      );
    else if (transmission_type === "tiptronic")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-info"
        >
          Tiptronic
        </button>
      );
    else if (transmission_type === "other transmission")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-secondary"
        >
          Other Transmission
        </button>
      );
  }

  function returnConditionType(condition_type) {
    console.log("lk");
    if (condition_type === "used")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-danger"
        >
          Used
        </button>
      );
    else if (condition_type === "new")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-success"
        >
          New
        </button>
      );
    else if (condition_type === "reconditioned")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-warning"
        >
          Reconditioned
        </button>
      );
  }

  function returnFuelType(fuel_type) {
    if (fuel_type === "petrol")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-warning"
        >
          Petrol
        </button>
      );
    else if (fuel_type === "hybrid")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-dark"
        >
          Hybrid
        </button>
      );
    else if (fuel_type === "diesel")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-secondary"
        >
          Diesel
        </button>
      );
    else if (fuel_type === "electric")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-info"
        >
          Electric
        </button>
      );
    else if (fuel_type === "cng")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-danger"
        >
          CNG
        </button>
      );
    else if (fuel_type === "other transmission")
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-success"
        >
          Other Transmission
        </button>
      );
  }

  function filterData(vehicles, searchKey) {
    const result = vehicles.filter(
      (vehicle) =>
        String(vehicle.brand).toLowerCase().includes(searchKey) ||
        String(vehicle.vehicle_model).toLowerCase().includes(searchKey)
    );
    setVehicles(result);
  }

  function handleSearchArea(e) {
    const searchKey = e.currentTarget.value;
    axios
      .get("http://127.0.0.1:5000/get_vehicles")
      .then((res) => {
        filterData(res.data.vehicles, searchKey);
      })
      .catch((err) => {
        console.log(err);
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
  let barData = {
    labels: brands,
    datasets: [
      {
        label: "Searched Vehicles",
        backgroundColor: [
          "#002366",
          "#FFD12A",
          "#DE5D83",
          "#87A96B",
          "#007BA7",
          "#5D8AA8",
          "#318CE7",
          "#A1CAF1",
          "#002366",
          "#120A8F",
          "#003399",
          "#1560BD",
          "#3B444B",
          "#7FFFD4",
          "#CC5500",
          "#A0785A",
          "#00CC99",
          "#FFEF00",
          "#FFB7C5",
          "#004225",
          "#CD5B45",
          "#C19A6B",
          "#696969",
          "#9400D3",
          "#50C878",
          "#BDB76B",
          "#E75480",
          "#FCF75E",
          "#138808",
          "#FF7F00",
          "#836953",
          "#F49AC2",
          "#014421",
          "#EEE600",
          "#93C572",
          "#FF8C69",
          "#704214",
          "#4682B4",
          "#8F00FF",
          "#EEE600",
          "#E0115F",
          "#008080",
          "#B39EB5",
          "#996515",
          "#B22222",
          "#177245",
          "#E49B0F",
        ],
        borderWidth: 2,
        data: brandValues,
      },
    ],
  };

  return (
    <Container>
      <div>
        <DataTable
          title="Searched Vehicles"
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
      </div>
      <div>
        <Bar
          data={barData}
          options={{
            title: {
              display: true,
              text: "Searched Vehicle Brands",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          }}
        />
      </div>
    </Container>
  );
}
