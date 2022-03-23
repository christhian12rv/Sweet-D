import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdSearch } from "react-icons/md";
import Switch from "react-switch";
import Moment from "react-moment";
import "moment-timezone";
import { CgDetailsMore } from "react-icons/cg";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as OrdersActions from "../../../../store/actions/orders";

import ModalLoading from "../../../ModalLoading";
import InputText from "../../../InputText";
import SquareButton from "../../../Buttons/SquareButton";

import "./index.scss";

const ListOrders = ({
    orders,
    limit,
    page,
    totalRows,
    getOrders,
    columnSort,
    directionSort,
    search,
    clearState,
    updateInput,
    updateFinish
}) => {
    const navigate = useNavigate();
    const toastId = useRef(null);
    const searchInput = useRef(null);
    let isSorting = false;
    const [isLoading, setIsLoading] = useState(true);

    const handleActiveToggle = async (state, id) => {
        setIsLoading(true);
        let response = await updateFinish(id, toastId);
        if (response && response.success) {
            response = await getOrders(
                limit,
                page,
                columnSort,
                directionSort,
                search
            );
            if (response && response.type) {
                if (response.type == "REDIRECT") navigate(response.to);
            }
        } else {
            if (response && response.type) {
                if (response.type == "REDIRECT") navigate(response.to);
            }
        }
        setIsLoading(false);
    };

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
            sortable: true,
            nameOnDB: "products",
            minWidth: "150px",
            maxWidth: "150px"
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
            sortable: true,
            minWidth: "150px",
            maxWidth: "150px"
        },
        {
            name: "Data",
            selector: row => row.createdAt,
            sortable: true,
            nameOnDB: "createdAt",
            minWidth: "180px",
            maxWidth: "180px"
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

    !isLoading &&
        orders.forEach((order, i) => {
            let productsName = [];
            order.orderProducts.forEach(p => {
                productsName.push(p.product.name);
            });
            productsName = productsName.join(", ");

            data.push({
                id: <h5 className="id">{order.id}</h5>,
                photo: (
                    <img
                        src={
                            JSON.parse(order.orderProducts[0].product.photos)[0]
                                .url
                        }
                        alt="Foto do produto"
                        className="product-img"
                    />
                ),
                products: productsName,
                total:
                    "R$ " +
                    parseFloat(order.total)
                        .toFixed(2)
                        .toString()
                        .replace(".", ","),
                user: order.user ? (
                    order.user.name
                ) : (
                    <span className="user-anonym">Anônimo</span>
                ),
                createdAt: (
                    <Moment
                        format="DD/MM/YYYY - HH:mm:ss"
                        tz="America/Sao_Paulo"
                    >
                        {order.createdAt}
                    </Moment>
                ),
                finish: (
                    <div className="edit-column">
                        <Switch
                            checked={order.finished}
                            height={22}
                            width={44}
                            handleDiameter={15}
                            offColor="#a5d6a7"
                            onColor="#2e7d32"
                            activeBoxShadow="none"
                            uncheckedIcon={false}
                            checkedIcon={false}
                            onChange={state =>
                                handleActiveToggle(state, order.id)
                            }
                        />
                    </div>
                ),
                details: (
                    <h5
                        className="details-link"
                        onClick={() => navigate("/admin/orders/" + order.id)}
                    >
                        <CgDetailsMore className="icon" />
                        Detalhes
                    </h5>
                )
            });
        });

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleSearch = async e => {
        e.preventDefault();
        setIsLoading(true);
        const response = await getOrders(
            limit,
            1,
            columnSort,
            directionSort,
            search
        );
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    const handlePerRowsChange = async (newLimit, newPage) => {
        setIsLoading(true);
        const response = await getOrders(
            newLimit,
            newPage,
            columnSort,
            directionSort,
            search
        );
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    const handlePageChange = async newPage => {
        if (!isSorting) {
            setIsLoading(true);
            const response = await getOrders(
                limit,
                newPage,
                columnSort,
                directionSort,
                search
            );
            setIsLoading(false);
            if (response && response.type) {
                if (response.type == "REDIRECT") navigate(response.to);
            }
        }
    };

    const handleColumnOrderChange = async (column, direction) => {
        isSorting = true;
        setIsLoading(true);
        const response = await getOrders(
            limit,
            1,
            column.nameOnDB,
            direction,
            search
        );
        isSorting = false;
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    useEffect(async () => {
        setIsLoading(true);
        await clearState();
        const response = await getOrders(10, 1, "id", "asc", "");
        setIsLoading(false);

        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    return (
        <div className="orders-list-admin">
            <div className="form-box">
                <form onSubmit={handleSearch}>
                    <div
                        className="orders-list-admin-search-box"
                        onClick={() => {
                            searchInput.current?.focus();
                        }}
                    >
                        <InputText
                            placeholder="Pesquise por pedidos (#)..."
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
                    onChangeRowsPerPage={handlePerRowsChange}
                    onChangePage={handlePageChange}
                    onSort={handleColumnOrderChange}
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
    limit: state.orders.limit,
    page: state.orders.page,
    totalRows: state.orders.totalRows,
    columnSort: state.orders.columnSort,
    directionSort: state.orders.directionSort,
    search: state.orders.input.search
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(OrdersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListOrders);
