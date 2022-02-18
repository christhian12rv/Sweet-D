import React from "react";
import DataTable from "react-data-table-component";

import "./index.scss";

const ListUsers = () => {
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
            sortable: true
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true
        },
        {
            name: "Registro",
            selector: row => row.register,
            sortable: true
        }
    ];

    const data = [
        {
            id: 1,
            name: "Christhian Rezende Vieira",
            email: "christhian@gmail.com",
            register: "08/07/2019"
        },
        {
            id: 1,
            name: "Valter Fellype Ferreira Netto",
            email: "fellype@gmail.com",
            register: "29/01/2014"
        },
        {
            id: 1,
            name: "Gabriel Duro da Silva",
            email: "gabriel@outlook.com",
            register: "11/01/2022"
        },
        {
            id: 1,
            name: "Natan Lyra",
            email: "natan@hotmail.com",
            register: "08/07/2019"
        },
        {
            id: 1,
            name: "Vinicius Dias Martins",
            email: "vinicius@hotmail.com",
            register: "08/07/2019"
        },
        {
            id: 1,
            name: "Rafael Godoi",
            email: "rafinha@hotmail.com",
            register: "01/01/2001"
        }
    ];

    const paginationComponentOptions = {
        rowsPerPageText: "Resultados por página",
        rangeSeparatorText: "de",
        selectAllRowsItem: true,
        selectAllRowsItemText: "Todos"
    };
    return (
        <div className="users-list-admin">
            <DataTable
                columns={columns}
                data={data}
                pagination
                noDataComponent={
                    <p style={{ padding: "1.5em 0", fontSize: "1.1em" }}>
                        Nenhum resultado encontrado
                    </p>
                }
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
        </div>
    );
};

export default ListUsers;
