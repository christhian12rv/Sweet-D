import React from "react";
import DataTable from "react-data-table-component";
import { MdEditNote, MdHome } from "react-icons/md";
import { ToggleSlider } from "react-toggle-slider";

import "./index.scss";

import Donut from "../../../../img/donut-example.jpg";

const ListOrders = () => {
    const customStyles = {
        headCells: {
            style: {
                fontSize: "1.3em"
            }
        }
    };

    const columns = [
        {
            name: "#",
            selector: row => row.id,
            sortable: true,
            minWidth: "fit-content",
            maxWidth: "fit-content"
        },
        {
            name: "",
            selector: row => row.photo
        },
        {
            name: "Produtos",
            selector: row => row.products,
            sortable: true
        },
        {
            name: "Total",
            selector: row => row.total,
            sortable: true
        },
        {
            name: "Usuário",
            selector: row => row.user,
            sortable: true
        },
        {
            name: "Finalizado",
            selector: row => row.finish,
            sortable: true,
            right: true
        },
        {
            name: "",
            selector: row => row.details
        }
    ];

    const data = [
        {
            id: <h5 className="id">1</h5>,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            products: "Donut Doce, Bolo de chocolate, Pudim",
            total: "R$ 26,20",
            user: "christhian@gmail.com",
            finish: (
                <div className="edit-column">
                    <ToggleSlider
                        barBackgroundColor="#a5d6a7"
                        barBackgroundColorActive="#2e7d32"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            ),
            details: <h5 className="details-link">Detalhes</h5>
        },
        {
            id: <h5 className="id">1</h5>,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            products: "Donut Doce, Bolo de chocolate, Pudim",
            total: "R$ 26,20",
            user: "christhian@gmail.com",
            finish: (
                <div className="edit-column">
                    <ToggleSlider
                        barBackgroundColor="#a5d6a7"
                        barBackgroundColorActive="#2e7d32"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            ),
            details: <h5 className="details-link">Detalhes</h5>
        },
        {
            id: <h5 className="id">1</h5>,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            products: "Donut Doce, Bolo de chocolate, Pudim",
            total: "R$ 26,20",
            user: "christhian@gmail.com",
            finish: (
                <div className="edit-column">
                    <ToggleSlider
                        barBackgroundColor="#a5d6a7"
                        barBackgroundColorActive="#2e7d32"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            ),
            details: <h5 className="details-link">Detalhes</h5>
        },
        {
            id: <h5 className="id">1</h5>,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            products: "Donut Doce, Bolo de chocolate, Pudim",
            total: "R$ 26,20",
            user: "christhian@gmail.com",
            finish: (
                <div className="edit-column">
                    <ToggleSlider
                        barBackgroundColor="#a5d6a7"
                        barBackgroundColorActive="#2e7d32"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            ),
            details: <h5 className="details-link">Detalhes</h5>
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };
    return (
        <div className="orders-list-admin">
            <DataTable
                columns={columns}
                data={data}
                pagination
                responsive
                noDataComponent={
                    <p style={{ padding: "1.5em 0", fontSize: "1.1em" }}>
                        Nenhum resultado encontrado
                    </p>
                }
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
        </div>
    );
};

export default ListOrders;
