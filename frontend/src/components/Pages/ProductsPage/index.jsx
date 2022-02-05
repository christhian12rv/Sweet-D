import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import ReactPaginate from "react-paginate";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import InputText from "../../InputText";
import InputNumber from "../../InputNumber";
import ProductsCardContent from "../../ProductsCardContent";
import Select from "../../Select";

import "./index.scss";

const ProductsPage = () => {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);

    const pageCount = 100;

    const handlePageClick = event => {
        console.log(event);
    };

    return (
        <div>
            <div className="filter-div">
                <h3>Filtro</h3>
                <div className="inputs-filter">
                    <InputText placeholder="Procure por produtos..." />
                    <div className="price-range-div">
                        <InputNumber />
                        <Range
                            className="range-slider"
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[0, 100]}
                            pushable={1}
                            marks={{
                                0: "R$ 0",
                                100: "R$ 100"
                            }}
                            trackStyle={[{ backgroundColor: "#fabca5" }]}
                            handleStyle={[{ borderColor: "#fabca5" }]}
                        />
                        <InputNumber />
                    </div>
                    <Select>
                        <option value="1">Maior preço</option>
                        <option value="1">Menor preço</option>
                    </Select>
                </div>
            </div>
            <div className="products-div">
                <ProductsCardContent />
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
            </div>
        </div>
    );
};

export default ProductsPage;
