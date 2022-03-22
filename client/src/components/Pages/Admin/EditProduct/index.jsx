import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { MdOutlineFileUpload, MdCancel } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as EditProductActions from "../../../../store/actions/admin/editProduct";

import InputText from "../../../InputText";
import SquareButton from "../../../Buttons/SquareButton";
import ModalLoading from "../../../ModalLoading";

import "./index.scss";

const EditProduct = ({
    productId,
    name,
    slug,
    price,
    storage,
    description,
    extras,
    priceExtras,
    photos,
    updateInput,
    editProduct,
    clearState,
    getProduct,
    updateInputPriceExtras
}) => {
    const toastId = React.useRef(null);
    const navigate = useNavigate();
    const { slug: slugParam } = useParams();

    const [modalShow, setModalShow] = useState(false);
    const [getProductFinish, setGetProductFinish] = useState(false);

    const modules = {
        toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ align: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["link"],
            [{ color: [] }, { background: [] }]
        ]
    };

    const placeholder = "Descrição...";

    const { quill, quillRef } = useQuill({ modules, placeholder });

    useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(description);
            quill.on("text-change", (delta, oldDelta, source) => {
                handleInputChange(quill.root.innerHTML, "description");
            });
        }
    }, [quill, getProductFinish]);

    const [imagePreview, setImagePreview] = useState([]);
    const fileobj = [];

    const imageChangedHandler = event => {
        let files = event.target.files;
        fileobj.push(files);
        const newPhotos = [...photos, ...files];
        handleInputChange(newPhotos, "photos");
        let reader;

        for (var i = 0; i < fileobj[0].length; i++) {
            reader = new FileReader();
            reader.readAsDataURL(fileobj[0][i]);
            reader.onload = event => {
                imagePreview.push(event.target.result);

                setImagePreview([...new Set(imagePreview)]);
            };
        }
    };

    useEffect(async () => {
        clearState();
        const response = await getProduct(slugParam, toastId);
        setGetProductFinish(true);
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }

        if (response.type == "ADMIN_EDIT_PRODUCT_GET_SUCCESS") {
            response.photos.forEach(photo => {
                imagePreview.push(photo.url);
            });
            setImagePreview([...new Set(imagePreview)]);
        }
    }, []);

    const handleDeleteImagePreview = index => {
        imagePreview.splice(index, 1);
        setImagePreview([...new Set(imagePreview)]);
        const newPhotos = photos;
        newPhotos.splice(index, 1);
        handleInputChange(newPhotos, "photos");
    };

    const handleInputChange = (e, stateProp) => {
        const value = e.target ? e.target.value : e;
        updateInput(value, stateProp, toastId, priceExtras, extras);
    };

    const handleInputChangePriceExtras = (value, index) => {
        updateInputPriceExtras(value, index, priceExtras);
    };

    const handleEditProduct = async e => {
        e.preventDefault();
        setModalShow(true);
        const response = await editProduct(
            productId,
            name,
            slug,
            price,
            storage,
            description,
            extras,
            priceExtras,
            photos,
            toastId
        );
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setModalShow(false);
    };

    return (
        <div className="admin-edit-product">
            <ModalLoading modalShow={modalShow} />
            <form onSubmit={handleEditProduct}>
                <div className="item name">
                    <h5>Nome</h5>
                    <InputText
                        placeholder="Nome"
                        value={name}
                        onChange={e => handleInputChange(e, "name")}
                    />
                </div>
                <div className="item slug">
                    <h5>Slug</h5>
                    <InputText
                        placeholder="Slug"
                        value={slug}
                        onChange={e => handleInputChange(e, "slug")}
                    />
                </div>
                <div className="item price">
                    <h5>Preço</h5>
                    <CurrencyInput
                        className="currency-input"
                        prefix="R$ "
                        decimalSeparator=","
                        groupSeparator="."
                        allowNegativeValue={false}
                        placeholder="R$"
                        value={price}
                        onValueChange={value =>
                            handleInputChange(value, "price")
                        }
                    />
                </div>
                <div className="item storage">
                    <h5>Estoque</h5>
                    <CurrencyInput
                        className="currency-input"
                        allowNegativeValue={false}
                        disableGroupSeparators={true}
                        placeholder="Estoque"
                        value={storage}
                        onChange={e => handleInputChange(e, "storage")}
                    />
                </div>
                <div className="item description">
                    <h5>Descrição</h5>
                    <div style={{ width: "100%" }} className="text-area-box">
                        <div className="text-area" ref={quillRef}></div>
                    </div>
                </div>

                <div className="item extras">
                    <h5>Extras</h5>
                    <ReactTagInput
                        tags={extras}
                        placeholder="Extras (Digite enter para adicionar cada extra)"
                        editable={true}
                        readOnly={false}
                        removeOnBackspace={true}
                        value={extras}
                        onChange={e => handleInputChange(e, "extras")}
                    />
                </div>

                {extras.length ? (
                    <div className="item price-extras">
                        <h5>Preço dos extras</h5>
                        <div className="box">
                            {extras.map((e, i) => (
                                <CurrencyInput
                                    className="currency-input"
                                    prefix="R$ "
                                    decimalSeparator=","
                                    groupSeparator="."
                                    allowNegativeValue={false}
                                    placeholder={"R$ " + e}
                                    value={priceExtras[i]}
                                    onValueChange={value =>
                                        handleInputChangePriceExtras(value, i)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <div className="item photos">
                    <h5>Imagens</h5>
                    <label htmlFor="upload-photo" className="photo-label">
                        <MdOutlineFileUpload className="icon" />
                        Escolher Imagem
                    </label>
                    <input
                        className="upload-photo"
                        type="file"
                        name="upload-photo"
                        id="upload-photo"
                        multiple
                        onChange={imageChangedHandler}
                    />

                    <div className="group-photos">
                        {(imagePreview || []).map((url, index) => (
                            <div className="photo-item" key={index}>
                                <MdCancel
                                    className="icon"
                                    onClick={() =>
                                        handleDeleteImagePreview(index)
                                    }
                                />
                                <img src={url} alt="..." />
                            </div>
                        ))}
                    </div>

                    <div className="item edit-product">
                        <SquareButton submit={true}>
                            Salvar Produto
                        </SquareButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    productId: state.editProductAdmin.id,
    name: state.editProductAdmin.input.name,
    slug: state.editProductAdmin.input.slug,
    price: state.editProductAdmin.input.price,
    storage: state.editProductAdmin.input.storage,
    description: state.editProductAdmin.input.description,
    extras: state.editProductAdmin.input.extras,
    priceExtras: state.editProductAdmin.input.priceExtras,
    photos: state.editProductAdmin.input.photos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(EditProductActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
