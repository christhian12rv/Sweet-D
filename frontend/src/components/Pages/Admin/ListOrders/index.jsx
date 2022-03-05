import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { ToggleSlider } from "react-toggle-slider";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../../../store/actions/admin/listProducts";

import ModalLoading from "../../../ModalLoading";

import "./index.scss";

const ListOrders = ({
    orders,
    totalRows,
    orderProducts,
    orderProductsData,
    getOrders
}) => {
    const navigate = useNavigate();
    const toastId = useRef(null);
    const searchInput = useRef(null);
    let isSorting = false;
    const [isLoading, setIsLoading] = useState(false);

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
            nameOnDB: "id",
            minWidth: "100px",
            maxWidth: "100px"
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
            sortable: true,
            nameOnDB: "total"
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
            right: true,
            nameOnDB: "finished"
        },
        {
            name: "",
            selector: row => row.details
        }
    ];

    const data = [];

    orders.forEach(order => {
        const productsName = [];
        orderProductsData.forEach(p => {
            productsName.push(p.name);
        });
        productsName.join(", ");

        data.push({
            id: <h5 className="id">{order.id}</h5>,
            photo: (
                <img
                    src={orderProductsData[0].photos[0].url}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            products: ProductsName,
            total: "R$ " + order.total,
            user: order.user.name,
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
        });
    });

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };
    return (
        <div className="orders-list-admin">
            <div className="form-box">
                <form onSubmit={handleSearch}>
                    <div
                        className="products-list-admin-search-box"
                        onClick={() => {
                            searchInput.current?.focus();
                        }}
                    >
                        <InputText
                            placeholder="Pesquise por produtos..."
                            value={search}
                            onChange={e => handleInputChange(e, "search")}
                            innerRef={searchInput}
                        />
                        <MdSearch
                            className="icon"
                            onClick={() => searchInput.current?.focus()}
                        />
                    </div>
                    <SquareButton submit={true}>Buscar</SquareButton>
                </form>
            </div>
            <div className="table-box">
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    onChangeRowsPerPage={}
                    onChangePage={}
                    onSort={}
                    sortServer={true}
                    defaultSortFieldId={1}
                    progressPending={isLoading}
                    progressComponent={<ModalLoading onDataTable={true} />}
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
        </div>
    );
};

const mapStateToProps = state => ({
    orders: state.orders.orders,
    totalRows: state.orders.totalRows,
    orderProducts: state.orders.orderProducts,
    orderProductsData: state.order.orderProductsData
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(OrdersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders);
