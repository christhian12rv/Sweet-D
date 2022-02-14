import React from "react";

import InputText from "../../../InputText";
import InputPassword from "../../../InputPassword";
import UserSidebar from "../Sidebar";

import "./index.scss";

const Settings = () => {
    return (
        <div className="user-settings">
            <UserSidebar active="settings" />
            <div className="content">
                <h2>Conta</h2>
                <div className="account-content-div">
                    <div className="item">
                        <h3>Nome</h3>
                        <InputText
                            value="Christhian Rezende Vieira"
                            readonly={true}
                            className="name"
                        ></InputText>
                    </div>
                    <div className="item">
                        <h3>Email</h3>
                        <InputText
                            value="exemplosweetd@gmail.com"
                            readonly={true}
                            className="email"
                        ></InputText>
                        <p>Mudar</p>
                    </div>
                    <div className="item">
                        <h3>Senha</h3>
                        <InputPassword
                            value="12345678"
                            readonly={true}
                        ></InputPassword>
                        <p>Mudar</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;
