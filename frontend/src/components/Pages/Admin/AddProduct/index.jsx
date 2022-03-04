import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CurrencyInput from "react-currency-input-field";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { MdOutlineFileUpload, MdCancel } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AddProductActions from "../../../../store/actions/admin/addProduct";

import InputText from "../../../InputText";
import SquareButton from "../../../Buttons/SquareButton";
import ModalLoading from "../../../ModalLoading";

import "./index.scss";

const AddProduct = ({
    name,
    slug,
    price,
    storage,
    description,
    extras,
    photos,
    updateInput,
    addProduct,
    clearState
}) => {
    const toastId = React.useRef(null);
    const navigate = useNavigate();

    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        clearState();
    }, []);

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

    React.useEffect(() => {
        if (quill) {
            quill.clipboard.dangerouslyPasteHTML(description);
            quill.on("text-change", (delta, oldDelta, source) => {
                handleInputChange(quill.root.innerHTML, "description");
            });
        }
    }, [quill]);

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

    const handleDeleteImagePreview = index => {
        imagePreview.splice(index, 1);
        setImagePreview([...new Set(imagePreview)]);
        const newPhotos = photos;
        newPhotos.splice(index, 1);
        handleInputChange(newPhotos, "photos");
    };

    const handleInputChange = (e, stateProp) => {
        const value = e.target ? e.target.value : e;
        updateInput(value, stateProp);
    };

    const handleAddProduct = async e => {
        e.preventDefault();
        setModalShow(true);
        const response = await addProduct(
            name,
            slug,
            price,
            storage,
            description,
            extras,
            photos,
            toastId
        );
        if (response && response.type) {
            if (response.type == "REDIRECT") navigate(response.to);
        }
        setModalShow(false);
    };

    return (
        <div className="admin-add-product">
            <ModalLoading modalShow={modalShow} />
            <form onSubmit={handleAddProduct}>
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

                    <div className="item add-product">
                        <SquareButton submit={true}>
                            Adicionar Produto
                        </SquareButton>
                    </div>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = state => ({
    name: state.addProductAdmin.input.name,
    slug: state.addProductAdmin.input.slug,
    price: state.addProductAdmin.input.price,
    storage: state.addProductAdmin.input.storage,
    description: state.addProductAdmin.input.description,
    extras: state.addProductAdmin.input.extras,
    photos: state.addProductAdmin.input.photos
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AddProductActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct);
