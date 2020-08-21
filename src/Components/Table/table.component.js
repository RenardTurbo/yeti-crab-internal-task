import React, {useEffect, useState} from 'react';
import "./table.style.scss"
import MaterialTable from 'material-table';
import {fakeFetch} from "../../Requests/fakeFetch";
import InputMask from 'react-input-mask';


function PhoneNumber(props) {
    const [state, setState] = React.useState(props.value);
    const handlerChange = (value) => {
        setState(value);
        props.onChange(value);
    }
    return (
        <div>
            <InputMask className={props.helperText ? "input-mask error" : "input-mask"} mask="8(999)999-99-99"
                       maskchar={null} value={state}
                       onChange={(e) => handlerChange(e.target.value)}/>
            <div className="helper-text">{props.helperText}</div>
        </div>
    )
}

function TextArea(props) {
    const [state, setState] = React.useState(props.value);
    const handlerChange = (value) => {
        setState(value);
        props.onChange(value);
    }
    return (
        <textarea name="comment" cols="30" rows="5" value={state} onChange={(e) => handlerChange(e.target.value)}/>
    )
}

function PhoneValidate(value) {
    return value ? value.replace(/_/g, "").length === 15 : false
}

function InputValidate(value) {
    return value ? value === "" : true
}

//
export default function MaterialTableDemo() {

    const [state, setState] = React.useState({
        columns: [
            {title: 'Номер заявки', field: 'requestId', type: "numeric", editable: false},
            {title: 'Дата и время получения ', field: 'dateTime', type: 'datetime',
                validate: rowData => InputValidate(rowData.dateTime) ?  {
                    isValid: false,
                    helperText: 'Поле заполнено не правильно'
                } : true},
            {
                title: 'Название фирмы ',
                field: 'companyName',
                validate: rowData => InputValidate(rowData.companyName) ?  {
                    isValid: false,
                    helperText: 'Поле заполнено не правильно'
                } : true
            },
            {
                title: 'Перевозчик',
                field: 'carrier',
                lookup: {},
                validate: rowData => InputValidate(rowData.carrier) ?  {
                    isValid: false,
                    helperText: 'Поле заполнено не правильно'
                } : true
            },
            {
                title: 'Контактный телефон перевозчика',
                field: 'carrierPhoneNumber',
                editComponent: PhoneNumber,
                validate: rowData => PhoneValidate(rowData.carrierPhoneNumber) ? true : {
                    isValid: false,
                    helperText: 'Поле заполнено не правильно'
                }
            },
            {title: 'Комментарии', field: 'comment', editComponent: TextArea},
            {
                title: 'ATI код ',
                field: 'atiCode',
                validate: rowData => InputValidate(rowData.atiCode) ?  {
                    isValid: false,
                    helperText: 'Поле заполнено не правильно'
                } : true,
                render: rowData => <a href={`https://ati.su/firms/${rowData.atiCode}/info`}>{rowData.atiCode}</a>
            },
        ],
        data: [],
    });

    const [carriers, setCarriers] = useState({})

    useEffect(() => {
        fakeFetch("/api/requests", {
            method: "GET"
        }).then((res) => JSON.parse(res))
            .then((res) => setState((prevState) => {
                let newColumns = [...prevState.columns];
                newColumns[3].lookup = carriers;
                return {...prevState, data: res, columns: newColumns};
            }))
    }, [carriers])

    useEffect(() => {
        fakeFetch("/api/carriers", {
            method: "GET"
        }).then((res) => JSON.parse(res))
            .then((res) => setCarriers(res))
    }, [])

    return (
        <MaterialTable
            title="Списко заявок для грузоперевозок"
            columns={state.columns}
            data={state.data}
            editable={{
                onRowAdd: (newData) =>
                    fakeFetch("/api/request", {
                        method: "POST",
                        body: newData
                    }).then((res) => JSON.parse(res))
                        .then((res) => {
                            setState((prevState) => {
                                const data = res;
                                return {...prevState, data};
                            });
                        }),
                onRowUpdate: (newData, oldData) =>
                    fakeFetch(`/api/request?id=${state.data.indexOf(oldData)}`, {
                        method: "PUT",
                        body: newData
                    }).then((res) => JSON.parse(res))
                        .then((res) => {
                            setState((prevState) => {
                                    const data = res;
                                    return {...prevState, data};
                                }
                            );
                        }),
                onRowDelete: (oldData) =>
                    fakeFetch(`/api/request?id=${state.data.indexOf(oldData)}`, {
                        method: "DELETE",
                    }).then((res) => JSON.parse(res))
                        .then((res) => {
                            setState((prevState) => {
                                const data = res;
                                return {...prevState, data};
                            });
                        }),
            }}
            localization={{
                body: {
                    emptyDataSourceMessage: "Нет записей для отображения",
                    addTooltip: 'Добавить',
                    deleteTooltip: 'Удалить',
                    editTooltip: 'Изменить',
                    filterRow: {
                        filterTooltip: 'Фильтр'
                    },
                    editRow: {
                        deleteText: 'Вы хотите удалить эту строку?',
                        cancelTooltip: 'Отменить',
                        saveTooltip: 'Записать'
                    }
                },
                header: {
                    actions: 'Действия'
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} из {count}',
                    labelRowsSelect: 'строк',
                    labelRowsPerPage: 'строк на странице:',
                    firstAriaLabel: 'Первая страница',
                    firstTooltip: 'Первая страница',
                    previousAriaLabel: 'Предыдущая страница',
                    previousTooltip: 'Предыдущая страница',
                    nextAriaLabel: 'Следующая страница',
                    nextTooltip: 'Следующая страница',
                    lastAriaLabel: 'Последняя страница',
                    lastTooltip: 'Последняя страница'
                },
                toolbar: {
                    addRemoveColumns: 'Добавить или удалить столбцы',
                    searchTooltip: 'Поиск',
                    searchPlaceholder: 'Поиск'
                }
            }}
        />
    );
}
