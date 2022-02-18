import React, {useState, useEffect} from 'react'
import "bootstrap/dist/js/bootstrap.bundle.js";
import DataTable from "react-data-table-component";
import axios from 'axios'
import { Container, Card } from 'react-bootstrap';

export default function Searches() {

    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            axios.get("http://127.0.0.1:5000/get_vehicles").then((res) => {
            setVehicles(res.data.vehicles);
            console.log(res.data.vehicles)
        }).catch((err) => {
            alert(err);
            if (err.response)
                console.log(err.response)

            if (err.request)
                console.log(err.request)
        });
        };
        fetchData();
    }, []);

    const BootyPagination = ({
        rowsPerPage,
        rowCount,
        onChangePage,
        currentPage
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
            sortable: true
        },
        {
            name: "Model",
            selector: (row) => row.vehicle_model,
            sortable: true
        },
        {
            name: "Mileage (km)",
            selector: (row) => parseInt(row.mileage).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sortable: true
        },
        {
            name: "Fuel",
            selector: (row) => row.fuel,
            sortable: true
        },
        {
            name: "Transmission",
            selector: (row) => row.transmission,
            sortable: true
        },
        {
            name: "Condition",
            selector: (row) => row.condition,
            sortable: true
        },
        {
            name: "Capacity (cc)",
            selector: (row) => row.capacity,
            sortable: true
        },
        {
            name: "Price (Rs.)",
            selector: (row) => (parseInt(row.price).toString() + "/=").replace(/\B(?=(\d{3})+(?!\d))/g, ","),
            sortable: true
        }
    ]

    function filterData(vehicles, searchKey) {
        const result = vehicles.filter((vehicle) =>
            vehicle.brand.toLowerCase().includes(searchKey) || vehicle.vehicle_model.toLowerCase().includes(searchKey)
        )
        setVehicles(result);
    }

    function handleSearchArea(e) {
        const searchKey = e.currentTarget.value;
        axios.get("http://127.0.0.1:5000/get_vehicles").then((res) => {
            filterData(res.data.vehicles, searchKey)
        }).catch((err) => {
            alert(err);
            if (err.response)
                console.log(err.response)

            if (err.request)
                console.log(err.request)
        });
    }

    const SearchVehicle = <div className="col-lg-3 mt-2 mb-2">
        <input className="form-control" type="search" placeholder="Search vehicle" name="searchQuery" onChange={handleSearchArea}></input>
    </div>


    return (
        <Container>
            <Card className="text-center">
                <Card.Header>Searched Results</Card.Header>
                <Card.Body>
                    <DataTable
                        title="User Searched Vehicles"
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
                <Card.Footer className="text-muted">Last updated on Feb 2022</Card.Footer>
            </Card>
        </Container>
    )
}
