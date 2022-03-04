import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import { MdSearch } from "react-icons/md";
import Moment from "react-moment";
import "moment-timezone";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as ListUsersActions from "../../../../store/actions/listUsers";

import "./index.scss";

import InputText from "../../../InputText";
import SquareButton from "../../../Buttons/SquareButton";
import ModalLoading from "../../../ModalLoading";

const ListUsers = ({
    users,
    limit,
    page,
    totalRows,
    getUsers,
    columnSort,
    directionSort,
    search,
    updateInput
}) => {
    const navigate = useNavigate();
    const searchInput = useRef(null);
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
            name: "Nome",
            selector: row => row.name,
            sortable: true,
            nameOnDB: "name"
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
            nameOnDB: "email"
        },
        {
            name: "Registro",
            selector: row => row.createdAt,
            sortable: true,
            nameOnDB: "createdAt"
        }
    ];

    const data = [];

    users.forEach(user => {
        data.push({
            id: <h5 className="id">{user.id}</h5>,
            name: user.name,
            email: user.email,
            createdAt: (
                <Moment format="DD/MM/YYYY - HH:mm:ss" tz="America/Sao_Paulo">
                    {user.createdAt}
                </Moment>
            ),
            address: user.address
        });
    });

    const ExpandedComponent = ({ data }) => {
        const address = data.address;
        const haveAddress = data.address ? true : false;
        if (haveAddress)
            return (
                <div className="user-address">
                    <p>
                        <strong>Endereço: </strong>
                        {address.address}
                    </p>
                    <p>
                        <strong>Número: </strong>
                        {address.number}
                    </p>
                    <p>
                        <strong>Bairro: </strong>
                        {address.district}
                    </p>
                    <p>
                        <strong>CEP: </strong>
                        {address.postalCode}
                    </p>
                    <p>
                        <strong>Cidade: </strong>
                        {address.city}
                    </p>
                    <p>
                        <strong>Estado: </strong>
                        {address.state}
                    </p>
                    <p>
                        <strong>Telefone: </strong>
                        {address.phone}
                    </p>
                    <p>
                        <strong>Complemento: </strong>
                        {address.complement}
                    </p>
                    <p>
                        <strong>Descrição: </strong>
                        {address.description}
                    </p>
                </div>
            );
        else
            return (
                <pre className="no-user-address">
                    <p>Usuário sem endereço</p>
                </pre>
            );
    };

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };

    useEffect(async () => {
        setIsLoading(true);
        const response = await getUsers(10, 1, "id", "asc", "");
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
        const response = await getUsers(
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
        <div className="users-list-admin">
            <div className="form-box">
                <form onSubmit={handleSearch}>
                    <div
                        className="users-list-admin-search-box"
                        onClick={() => {
                            searchInput.current?.focus();
                        }}
                    >
                        <InputText
                            placeholder="Pesquise por usuários..."
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
                    progressPending={isLoading}
                    progressComponent={<ModalLoading onDataTable={true} />}
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
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
    users: state.listUsers.users,
    limit: state.listUsers.limit,
    page: state.listUsers.page,
    totalRows: state.listUsers.totalRows,
    columnSort: state.listUsers.columnSort,
    directionSort: state.listUsers.directionSort,
    search: state.listUsers.input.search
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(ListUsersActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ListUsers);
