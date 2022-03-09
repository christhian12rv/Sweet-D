import React, { useEffect, useState } from "react";
import TelefoneBrasileiroInput from "react-telefone-brasileiro";
import { BrazilMaskComponent } from "react-brazil";
import axios from "axios";
import { MdWarningAmber } from "react-icons/md";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UserSettingsActions from "../../../../store/actions/userSettings";

import InputText from "../../../InputText";
import InputPassword from "../../../InputPassword";
import UserSidebar from "../Sidebar";
import Modal from "../../../Modal";
import TextArea from "../../../TextArea";

import "./index.scss";
import { useNavigate } from "react-router-dom";
import SquareButton from "../../../Buttons/SquareButton";

const Settings = ({
    id,
    name,
    email,
    address,
    input,
    update,
    updateInput,
    updateAddress,
    deleteAccount
}) => {
    const toastId = React.useRef(null);
    const navigate = useNavigate();

    const [modalIsOpenUserSettings, setModalIsOpenUserSettings] =
        useState(false);
    const [modalIsOpenDeleteAccount, setModalIsOpenDeleteAccount] =
        useState(false);
    const [fieldToChange, setFieldToChange] = useState({
        textField: "name",
        text: "Nome"
    });

    const statesObj = {
        AC: "Acre",
        AL: "Alagoas",
        AP: "Amapá",
        AM: "Amazonas",
        BA: "Bahia",
        CE: "Ceará",
        DF: "Distrito Federal",
        ES: "Espírito Santo",
        GO: "Goiás",
        MA: "Maranhão",
        MT: "Mato Grosso",
        MS: "Mato Grosso do Sul",
        MG: "Minas Gerais",
        PA: "Pará",
        PB: "Paraíba",
        PR: "Paraná",
        PE: "Pernambuco",
        PI: "Piauí",
        RJ: "Rio de Janeiro",
        RN: "Rio Grande do Norte",
        RS: "Rio Grande do Sul",
        RO: "Rondônia",
        RR: "Roraima",
        SC: "Santa Catarina",
        SP: "São Paulo",
        SE: "Sergipe",
        TO: "Tocantins"
    };

    useEffect(async () => {
        if (
            !address.postalCode ||
            address.postalCode.length != 10 ||
            !/[0-9]{2}.[0-9]{3}-[\d]{3}/.test(address.postalCode)
        ) {
            updateInput("", "state", true);
            updateInput("", "city", true);
        }

        const response = await axios.get(
            "https://viacep.com.br/ws/" +
                address.postalCode.replace("-", "").replace(".", "") +
                "/json/unicode/"
        );
        const data = response.data;
        if (!("erro" in data)) {
            updateInput(statesObj[data.uf], "state", true);
            updateInput(data.localidade, "city", true);
        }
    }, [address.postalCode]);

    const handleInputChange = (e, stateProp, isAddress = false) => {
        updateInput(e.target.value, stateProp, isAddress);
    };

    const handleUserUpdate = async e => {
        e.preventDefault();

        const response = await update(
            id,
            { [fieldToChange.textField]: input[fieldToChange.textField] },
            input.password,
            toastId
        );

        if (response && response.type)
            if (response.type == "REDIRECT") navigate(response.to);
            else if (response.type == "SUCCESS")
                setModalIsOpenUserSettings(false);
    };

    const handleInputUpdateClick = field => {
        switch (field) {
            case "name":
                setFieldToChange({
                    field: input.name,
                    textField: "name",
                    text: "Nome"
                });
                break;
            case "email":
                setFieldToChange({
                    field: input.email,
                    textField: "email",
                    text: "Email"
                });
                break;
            default:
                break;
        }
        setModalIsOpenUserSettings(true);
    };

    const handleAddressUpdate = async e => {
        e.preventDefault();
        const response = await updateAddress(id, address, toastId);

        if (response && response.type)
            if (response.type == "REDIRECT") navigate(response.to);
    };

    const handleDeleteAccount = async e => {
        e.preventDefault();
        const response = await deleteAccount(input.delete, id, toastId);
        if (response && response.type)
            if (response.type == "SUCCESS") window.location.href = "/";
            else if (response.type == "REDIRECT") navigate(response.to);
    };

    return (
        <div className="user-settings">
            <UserSidebar active="settings" />
            <div className="content">
                <div className="account">
                    <h2>Conta</h2>
                    <div className="account-content-div">
                        <div className="item">
                            <h3>Nome</h3>
                            <InputText
                                value={name}
                                readOnly={true}
                                className="name"
                            ></InputText>
                            <p onClick={() => handleInputUpdateClick("name")}>
                                Mudar
                            </p>
                        </div>
                        <div className="item">
                            <h3>Email</h3>
                            <InputText
                                value={email}
                                readOnly={true}
                                className="email"
                            ></InputText>
                            <p onClick={() => handleInputUpdateClick("email")}>
                                Mudar
                            </p>
                        </div>
                        <div className="item">
                            <h3>Senha</h3>
                            <InputPassword
                                value="12345678"
                                readOnly={true}
                            ></InputPassword>
                            <p onClick={() => navigate("/recovery-password")}>
                                Mudar
                            </p>
                        </div>
                    </div>
                </div>
                <div className="address">
                    <h2>Endereço</h2>
                    <form onSubmit={handleAddressUpdate}>
                        <div className="address-content-div">
                            <div className="item">
                                <h3>* Endereço</h3>
                                <InputText
                                    value={address.address}
                                    className="address-input"
                                    placeholder="Endereço"
                                    onChange={e =>
                                        handleInputChange(e, "address", true)
                                    }
                                ></InputText>
                            </div>
                            <div className="item">
                                <h3>* Número</h3>
                                <InputText
                                    value={address.number}
                                    className="number"
                                    placeholder="Número"
                                    onChange={e =>
                                        handleInputChange(e, "number", true)
                                    }
                                ></InputText>
                            </div>
                            <div className="item">
                                <h3>* Bairro</h3>
                                <InputText
                                    value={address.district}
                                    className="district"
                                    placeholder="Bairro"
                                    onChange={e =>
                                        handleInputChange(e, "district", true)
                                    }
                                ></InputText>
                            </div>
                            <div className="item">
                                <h3>* CEP</h3>
                                <BrazilMaskComponent
                                    format="cep"
                                    value={address.postalCode}
                                    className="postal-code brazil-mask-component"
                                    placeholder="CEP"
                                    onChange={e =>
                                        handleInputChange(e, "postalCode", true)
                                    }
                                />
                            </div>
                            <div className="item">
                                <h3>* Cidade</h3>
                                <InputText
                                    value={address.city}
                                    className="city"
                                    placeholder="Cidade"
                                    onChange={e =>
                                        handleInputChange(e, "city", true)
                                    }
                                    readOnly={true}
                                ></InputText>
                            </div>
                            <div className="item">
                                <h3>* Estado</h3>
                                <InputText
                                    value={address.state}
                                    className="state"
                                    placeholder="Estado"
                                    onChange={e =>
                                        handleInputChange(e, "state", true)
                                    }
                                    readOnly={true}
                                ></InputText>
                            </div>
                            <div className="item">
                                <h3>Complemento</h3>
                                <InputText
                                    value={address.complement}
                                    className="complement"
                                    placeholder="Complemento"
                                    onChange={e =>
                                        handleInputChange(e, "complement", true)
                                    }
                                ></InputText>
                            </div>
                            <div className="item">
                                <h3>Telefone</h3>
                                <TelefoneBrasileiroInput
                                    value={address.phone}
                                    className="phone"
                                    placeholder="(00) 90000-0000"
                                    temDDD
                                    separaDDD
                                    onChange={e =>
                                        handleInputChange(e, "phone", true)
                                    }
                                ></TelefoneBrasileiroInput>
                            </div>
                            <div className="item item-description">
                                <h3>Descrição</h3>
                                <TextArea
                                    value={address.description}
                                    className="description"
                                    rows={5}
                                    placeholder="Descrição..."
                                    onChange={e =>
                                        handleInputChange(
                                            e,
                                            "description",
                                            true
                                        )
                                    }
                                ></TextArea>
                            </div>
                        </div>
                        <SquareButton submit={true}>Atualizar</SquareButton>
                    </form>
                </div>
                <div className="delete-account">
                    <SquareButton
                        onClick={() => setModalIsOpenDeleteAccount(true)}
                    >
                        <MdWarningAmber className="icon" />
                        Excluir Conta
                    </SquareButton>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpenUserSettings}
                setIsOpen={setModalIsOpenUserSettings}
                contentLabel="Example"
                cancelButton={true}
                confirmButton={true}
                confirmButtonText="Atualizar"
                confirmButtonOnClick={handleUserUpdate}
                form={true}
            >
                <div className="user-settings-field-change-div">
                    <h3 className="modal-title">Mudar {fieldToChange.text}</h3>
                    <p className="modal-text">
                        Tem certeza que deseja mudar seu {fieldToChange.text}?
                    </p>
                    <p className="modal-text">
                        Digite seu novo {fieldToChange.text} abaixo e sua senha
                    </p>
                    <p className="modal-text">e clique em Atualizar.</p>
                    <InputText
                        className="modal-input"
                        value={input.field}
                        onChange={e =>
                            handleInputChange(e, fieldToChange.textField)
                        }
                        placeholder={fieldToChange.text}
                    />
                    <InputPassword
                        className="modal-input"
                        value={input.password}
                        onChange={e => handleInputChange(e, "password")}
                        placeholder="Senha"
                    />
                </div>
            </Modal>

            <Modal
                isOpen={modalIsOpenDeleteAccount}
                setIsOpen={setModalIsOpenDeleteAccount}
                contentLabel="Example"
                cancelButton={true}
                confirmButton={true}
                confirmButtonText="Excluir"
                confirmButtonOnClick={handleDeleteAccount}
                form={true}
            >
                <div className="user-settings-field-change-div">
                    <h3 className="modal-title">Excluir conta</h3>
                    <p className="modal-text">
                        Tem certeza que deseja excluir sua conta? Após a
                        exclusão, todos os dados da sua conta, exceto pedidos,
                        serão eliminados de nosso servidor. A decisão é
                        permanente.
                    </p>
                    <p className="modal-text">
                        Digite "excluir" abaixo e clique em Excluir.
                    </p>
                    <InputText
                        className="modal-input"
                        value={input.delete}
                        onChange={e => handleInputChange(e, "delete")}
                        placeholder={"excluir"}
                    />
                </div>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    id: state.login.user.id,
    name: state.login.user.name,
    email: state.login.user.email,
    isAdmin: state.login.user.isAdmin,
    address: {
        address: state.login.address.address,
        number: state.login.address.number,
        postalCode: state.login.address.postalCode,
        city: state.login.address.city,
        state: state.login.address.state,
        district: state.login.address.district,
        complement: state.login.address.complement,
        phone: state.login.address.phone,
        description: state.login.address.description
    },
    input: {
        name: state.userSettings.input.name,
        email: state.userSettings.input.email,
        password: state.userSettings.input.password,
        delete: state.userSettings.input.delete
    }
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(UserSettingsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
