import React, {useEffect} from 'react';
import MaterialTable from 'material-table';
import {fakeFetch} from "../../Requests/fakeFetch";

export default function MaterialTableDemo() {
    const [state, setState] = React.useState({
        columns: [
            { title: 'Номер заявки', field: 'requestId' },
            { title: 'Дата и время получения ', field: 'dateTime', type: 'date' },
            { title: 'Название фирмы ', field: 'companyName' },
            {
                title: 'Перевозчик',
                field: 'Carrier',
                lookup: { 34: 'İstanbul', 63: 'Şanlıurfa', 39: "aaaaa", 2: "31232", 33: "2231" },
            },
            { title: 'Контактный телефон перевозчика', field: 'carrierPhoneNumber' },
            { title: 'Комментарии', field: 'Comment' },
            { title: 'ATI код ', field: 'atiCode' },
        ],
        data: [],
    });

    useEffect(()=>{
        fakeFetch("/api/requests", {
            method: "GET"
        }).then((res) => setState((prevState) => {
            return { ...prevState, data: res };
        }))
    },[])

    return (
        <MaterialTable
            title="Editable Example"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    fakeFetch("/api/request", {
                        method: "POST",
                        body: newData
                    }).then(() => {
                        setState((prevState) => {
                            const data = [...prevState.data];
                            data.push(newData);
                            return { ...prevState, data };
                        });
                    }),
                onRowUpdate: (newData, oldData) =>
                    fakeFetch(`/api/request?id=${state.data.indexOf(oldData)}`, {
                        method: "PUT",
                        body: newData
                    }).then(() => {
                        if (oldData) {
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data[data.indexOf(oldData)] = newData;
                                return { ...prevState, data };
                            });
                        }
                    }),
                onRowDelete: (oldData) =>
                    fakeFetch(`/api/request?id=${state.data.indexOf(oldData)}`, {
                        method: "DELETE",
                    }).then(() => {
                        if (oldData) {
                            setState((prevState) => {
                                const data = [...prevState.data];
                                data.splice(data.indexOf(oldData), 1);
                                return { ...prevState, data };
                            });
                        }
                    }),
            }}
        />
    );
}
