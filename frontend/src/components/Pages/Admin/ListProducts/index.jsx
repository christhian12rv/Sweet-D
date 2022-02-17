import React from "react";
import DataTable from "react-data-table-component";
import { MdEditNote, MdHome } from "react-icons/md";
import { ToggleSlider } from "react-toggle-slider";

import "./index.scss";

import Donut from "../../../../img/donut-example.jpg";

const ListProducts = () => {
    const customStyles = {
        headCells: {
            style: {
                fontSize: "1.3em"
            }
        }
    };

    const columns = [
        {
            name: "",
            selector: row => row.photo
        },
        {
            name: "Nome",
            selector: row => row.name,
            sortable: true
        },
        {
            name: "Preço",
            selector: row => row.price,
            sortable: true
        },
        {
            name: "Quantidade",
            selector: row => row.quantity,
            sortable: true
        },
        {
            name: "",
            selector: row => row.edit,
            sortable: true,
            right: true
        }
    ];

    const data = [
        {
            id: 1,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            name: "Donut Doce",
            price: "R$ 26,20",
            quantity: "27",
            edit: (
                <div className="edit-column">
                    <MdHome className="view-product" />
                    <MdEditNote className="edit-product" />
                    <ToggleSlider
                        barBackgroundColorActive="#b2ff59"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            )
        },
        {
            id: 1,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            name: "Donut Doce",
            price: "R$ 26,20",
            quantity: "27",
            edit: (
                <div className="edit-column">
                    <MdHome className="view-product" />
                    <MdEditNote className="edit-product" />
                    <ToggleSlider
                        barBackgroundColorActive="#b2ff59"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            )
        },
        {
            id: 1,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            name: "Donut Doce",
            price: "R$ 26,20",
            quantity: "27",
            edit: (
                <div className="edit-column">
                    <MdHome className="view-product" />
                    <MdEditNote className="edit-product" />
                    <ToggleSlider
                        barBackgroundColorActive="#b2ff59"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            )
        },
        {
            id: 1,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            name: "Donut Doce",
            price: "R$ 26,20",
            quantity: "27",
            edit: (
                <div className="edit-column">
                    <MdHome className="view-product" />
                    <MdEditNote className="edit-product" />
                    <ToggleSlider
                        barBackgroundColorActive="#b2ff59"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            )
        },
        {
            id: 1,
            photo: (
                <img
                    src={Donut}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            name: "Donut Doce",
            price: "R$ 26,20",
            quantity: "27",
            edit: (
                <div className="edit-column">
                    <MdHome className="view-product" />
                    <MdEditNote className="edit-product" />
                    <ToggleSlider
                        barBackgroundColorActive="#b2ff59"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            )
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };
    return (
        <div className="products-list-admin">
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

export default ListProducts;
