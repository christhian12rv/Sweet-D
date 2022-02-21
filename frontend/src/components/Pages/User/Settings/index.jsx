import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as LoginActions from "../../../../store/actions/login";
import * as UserSettingsActions from "../../../../store/actions/userSettings";

import InputText from "../../../InputText";
import InputPassword from "../../../InputPassword";
import UserSidebar from "../Sidebar";

import "./index.scss";
import { useNavigate } from "react-router-dom";

const Settings = ({ teste, name, email, updateInput }) => {
    const navigate = useNavigate();

    return (
        <div className="user-settings">
            <UserSidebar active="settings" />
            <div className="content">
                <h2>Conta</h2>
                <div className="account-content-div">
                    <div className="item">
                        <h3>Nome</h3>
                        <InputText
                            value={name}
                            readOnly={true}
                            className="name"
                        ></InputText>
                    </div>
                    <div className="item">
                        <h3>Email</h3>
                        <InputText
                            value={email}
                            readOnly={true}
                            className="email"
                        ></InputText>
                        <p onClick={handleChangeEmail}>Mudar</p>
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
        </div>
    );
};

const mapStateToProps = state => ({
    teste: state,
    name: state.login.user.name,
    email: state.login.user.email,
    isAdmin: state.login.user.isAdmin
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(UserSettingsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
