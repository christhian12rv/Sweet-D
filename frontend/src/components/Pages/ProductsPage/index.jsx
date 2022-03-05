import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "rc-slider";
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
import "rc-slider/assets/index.css";
import ReactPaginate from "react-paginate";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ListProductsActions from "../../../store/actions/listProducts";

import InputText from "../../InputText";
import InputNumber from "../../InputNumber";
import ProductsCardContent from "../../ProductsCardContent";
import Select from "../../Select";

import "./index.scss";
import SquareButton from "../../Buttons/SquareButton";

const ProductsPage = ({
    products,
    limit,
    page,
    totalRows,
    columnSort,
    directionSort,
    minPrice,
    maxPrice,
    search,
    priceFilter,
    getProducts,
    updateInput,
    updateSelectFilter
}) => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const pageCount = Math.ceil(totalRows / limit);

    const handleInputChange = (e, stateProp) => {
        updateInput(e.target.value, stateProp);
    };

    const handleInputPriceChange = value => {
        updateInput(value, "price");
    };

    const handlePageClick = async event => {
        const pageSelected = event.selected + 1;
        setIsLoading(true);
        const response = await getProducts(
            limit,
            pageSelected,
            columnSort,
            directionSort,
            search,
            priceFilter
        );
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    const handleSelectFilterChange = e => {
        updateSelectFilter(e.target.value);
    };

    const handleFilterInputsSubmit = async e => {
        e.preventDefault();
        setIsLoading(true);
        const response = await getProducts(
            limit,
            1,
            columnSort,
            directionSort,
            search,
            priceFilter
        );
        setIsLoading(false);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    };

    useEffect(async () => {
        setIsLoading(true);
        const response = await getProducts(
            limit,
            1,
            "id",
            "asc",
            "",
            undefined
        );
        setIsLoading(false);
        console.log(response);
        handleInputPriceChange([response.minPrice, response.maxPrice]);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
    }, []);

    return (
        <div>
            <div className="filter-div">
                <h3>Filtro</h3>
                <form
                    className="inputs-filter-form"
                    onSubmit={handleFilterInputsSubmit}
                >
                    <InputText
                        placeholder="Procure por produtos..."
                        value={search}
                        onChange={e => handleInputChange(e, "search")}
                    />
                    <div className="price-range-div">
                        <InputNumber
                            placeholder="R$"
                            min="0"
                            step="0.01"
                            value={priceFilter[0]}
                            onInput={e =>
                                (e.target.value =
                                    !!e.target.value &&
                                    Math.abs(e.target.value) >= 0
                                        ? Math.abs(e.target.value)
                                        : null)
                            }
                            onChange={e => {
                                const actualPriceFilter = priceFilter;
                                actualPriceFilter[0] = parseFloat(
                                    e.target.value
                                );
                                handleInputPriceChange(actualPriceFilter);
                            }}
                        />
                        <Range
                            className="range-slider"
                            min={minPrice}
                            max={maxPrice}
                            step={0.01}
                            value={priceFilter}
                            defaultValue={priceFilter}
                            pushable={1}
                            marks={{
                                [minPrice]:
                                    "R$ " +
                                    parseFloat(minPrice)
                                        .toFixed(2)
                                        .toString()
                                        .replace(".", ","),
                                [maxPrice]:
                                    "R$ " +
                                    parseFloat(maxPrice)
                                        .toFixed(2)
                                        .toString()
                                        .replace(".", ",")
                            }}
                            trackStyle={[{ backgroundColor: "#fabca5" }]}
                            handleStyle={[{ borderColor: "#fabca5" }]}
                            onChange={e => handleInputPriceChange(e)}
                        />
                        <InputNumber
                            placeholder="R$"
                            min="0"
                            step="0.01"
                            value={priceFilter[1]}
                            onInput={e =>
                                (e.target.value =
                                    !!e.target.value &&
                                    Math.abs(e.target.value) >= 0
                                        ? Math.abs(e.target.value)
                                        : null)
                            }
                            onChange={e => {
                                const actualPriceFilter = priceFilter;
                                actualPriceFilter[1] = parseFloat(
                                    e.target.value
                                );
                                handleInputPriceChange(actualPriceFilter);
                            }}
                        />
                    </div>

                    <Select onChange={handleSelectFilterChange}>
                        <option value="min-price">Menor preço</option>
                        <option value="max-price">Maior preço</option>
                    </Select>
                    <SquareButton>Buscar</SquareButton>
                </form>
            </div>
            <div className="products-div">
                {products.length ? (
                    <>
                        <ProductsCardContent data={products} />
                        <div className="paginate-div">
                            <ReactPaginate
                                breakLabel="..."
                                previousLabel={<BsFillCaretLeftFill />}
                                nextLabel={<BsFillCaretRightFill />}
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                renderOnZeroPageCount={null}
                                className="paginate"
                                breakClassName="paginate-break"
                                breakLinkClassName="paginate-break-link"
                                containerClassName="paginate-container"
                                pageLinkClassName="paginate-page-link"
                                activeClassName="paginate-active"
                                pageClassName="paginate-item-li"
                            />
                        </div>
                    </>
                ) : (
                    <div className="no-products">
                        <p>Nenhum produto encontrado...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    products: state.listProducts.products,
    limit: state.listProducts.limit,
    page: state.listProducts.page,
    totalRows: state.listProducts.totalRows,
    columnSort: state.listProducts.columnSort,
    directionSort: state.listProducts.directionSort,
    minPrice: state.listProducts.minPrice,
    maxPrice: state.listProducts.maxPrice,
    search: state.listProducts.input.search,
    priceFilter: state.listProducts.input.price
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(ListProductsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsPage);
