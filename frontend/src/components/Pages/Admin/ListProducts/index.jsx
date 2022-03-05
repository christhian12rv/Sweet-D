import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdEditNote, MdHome, MdSearch } from "react-icons/md";
import { ToggleSlider } from "react-toggle-slider";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ListProductsAdminActions from "../../../../store/actions/admin/listProducts";

import "./index.scss";

import InputText from "../../../InputText";
import SquareButton from "../../../Buttons/SquareButton";
import ModalLoading from "../../../ModalLoading";

const ListProducts = ({
    products,
    limit,
    page,
    totalRows,
    getProducts,
    columnSort,
    directionSort,
    search,
    updateActive,
    updateInput
}) => {
    const navigate = useNavigate();
    const toastId = useRef(null);
    const searchInput = useRef(null);
    let isSorting = false;
    const [isLoading, setIsLoading] = useState(false);

    const handleActiveToggle = async (id, active) => {
        setIsLoading(true);
        const response = await updateActive(id, active, toastId);
        if (response && response.success) {
            const responseGetProducts = await getProducts(
                limit,
                page,
                columnSort,
                directionSort,
                search
            );
            setIsLoading(false);
            if (responseGetProducts && responseGetProducts.type) {
                if (responseGetProducts.type == "REDIRECT")
                    navigate(response.to);
            }
        } else {
            setIsLoading(false);
            if (response && response.type) {
                if (response.type == "REDIRECT") navigate(response.to);
            }
        }
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
            name: "Nome",
            selector: row => row.name,
            sortable: true,
            nameOnDB: "name"
        },
        {
            name: "Slug",
            selector: row => row.slug,
            sortable: true,
            nameOnDB: "slug"
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
            slug: product.slug,
            price: "R$ " + price,
            quantity: product.storage,
            edit: (
                <div className="edit-column">
                    <MdHome
                        className="view-product"
                        onClick={() => navigate("/products/" + product.slug)}
                    />
                    <MdEditNote
                        className="edit-product"
                        onClick={() =>
                            navigate("/admin/products/edit/" + product.slug)
                        }
                    />
                    <ToggleSlider
                        active={product.active ? true : false}
                        barBackgroundColorActive="#2e7d32"
                        barHeight={22}
                        barWidth={44}
                        handleSize={16}
                        onToggle={state =>
                            handleActiveToggle(product.id, state)
                        }
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
            const response = await getProducts(
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
        const response = await getProducts(
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
        const response = await getProducts(10, 1, "id", "asc", "");
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleSearch = async e => {
        e.preventDefault();
        setIsLoading(true);
        const response = await getProducts(
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

    return (
        <div className="products-list-admin">
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
    products: state.listProductsAdmin.products,
    limit: state.listProductsAdmin.limit,
    page: state.listProductsAdmin.page,
    totalRows: state.listProductsAdmin.totalRows,
    columnSort: state.listProductsAdmin.columnSort,
    directionSort: state.listProductsAdmin.directionSort,
    search: state.listProductsAdmin.input.search
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(ListProductsAdminActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListProducts);
