import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdEditNote, MdHome } from "react-icons/md";
import { ToggleSlider } from "react-toggle-slider";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ListProductsActions from "../../../../store/actions/listProducts";

import "./index.scss";

import ModalLoading from "../../../ModalLoading";

const ListProducts = ({
    products,
    limit,
    page,
    totalRows,
    getProducts,
    columnSort,
    directionSort
}) => {
    const navigate = useNavigate();
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
            name: "Nome",
            selector: row => row.name,
            sortable: true,
            nameOnDB: "name"
        },
        {
            name: "Preço",
            selector: row => row.price,
            sortable: true,
            nameOnDB: "price"
        },
        {
            name: "Quantidade",
            selector: row => row.quantity,
            sortable: true,
            nameOnDB: "storage"
        },
        {
            name: "",
            selector: row => row.edit,
            right: true
        }
    ];

    const data = [];

    products.forEach(product => {
        const photos = JSON.parse(product.photos);
        let price = product.price;
        price = price.toFixed(2);
        price = price.toString().replace(".", ",");
        data.push({
            id: <h5 className="id">{product.id}</h5>,
            photo: (
                <img
                    src={photos[0].url}
                    alt="Foto do produto"
                    className="product-img"
                />
            ),
            name: product.name,
            price: "R$ " + price,
            quantity: product.storage,
            edit: (
                <div className="edit-column">
                    <MdHome className="view-product" />
                    <MdEditNote
                        className="edit-product"
                        onClick={() =>
                            navigate("/admin/products/edit/" + product.id)
                        }
                    />
                    <ToggleSlider
                        active={product.active ? true : false}
                        barBackgroundColorActive="#2e7d32"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                    />
                </div>
            )
        });
    });

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    const handlePerRowsChange = async (newLimit, newPage) => {
        setIsLoading(true);
        const response = await getProducts(
            newLimit,
            newPage,
            columnSort,
            directionSort
        );
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    const handlePageChange = async newPage => {
        if (!isSorting) {
            setIsLoading(true);
            const response = await getProducts(
                limit,
                newPage,
                columnSort,
                directionSort
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
        const response = await getProducts(
            limit,
            1,
            column.nameOnDB,
            direction
        );
        isSorting = false;
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    useEffect(async () => {
        setIsLoading(true);
        const response = await getProducts(10, 1, "id", "asc");
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    return (
        <div className="products-list-admin">
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
    );
};

const mapStateToProps = state => ({
    products: state.listProducts.products,
    limit: state.listProducts.limit,
    page: state.listProducts.page,
    totalRows: state.listProducts.totalRows,
    columnSort: state.listProducts.columnSort,
    directionSort: state.listProducts.directionSort
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ListProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
