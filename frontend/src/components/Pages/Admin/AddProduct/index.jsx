import React, { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { MdOutlineFileUpload, MdCancel } from "react-icons/md";

import InputText from "../../../InputText";
import SquareButton from "../../../Buttons/SquareButton";

import "./index.scss";

const AddProduct = () => {
    const [tags, setTags] = useState([]);

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

    const { quillRef } = useQuill({ modules, placeholder });

    const [imagePreview, setImagePreview] = useState([]);
    const fileobj = [];

    const imageChangedHandler = event => {
        let files = event.target.files;
        fileobj.push(files);
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
    };

    return (
        <div className="admin-add-product">
            <div className="item name">
                <h5>Nome</h5>
                <InputText placeholder="Nome" />
            </div>
            <div className="item slug">
                <h5>Slug</h5>
                <InputText placeholder="Slug" />
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
                />
            </div>
            <div className="item storage">
                <h5>Estoque</h5>
                <CurrencyInput
                    className="currency-input"
                    allowNegativeValue={false}
                    disableGroupSeparators={true}
                    placeholder="Estoque"
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
                    tags={tags}
                    placeholder="Extras (Digite enter para adicionar cada extra)"
                    editable={true}
                    readOnly={false}
                    removeOnBackspace={true}
                    onChange={newTags => setTags(newTags)}
                />
            </div>

            <div className="item photos">
                <h5>Imagens</h5>
                <label for="upload-photo" className="photo-label">
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
                                onClick={() => handleDeleteImagePreview(index)}
                            />
                            <img src={url} alt="..." />
                        </div>
                    ))}
                </div>

                <div className="item add-product">
                    <SquareButton>Adicionar Produto</SquareButton>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
