import React, {Component} from 'react';
import './app.css';
import {Container} from '@material-ui/core';
import Search from "../search/search";
import BtnTableChange from "../btn-table-change/bth-table-change";
import ListEmployees from "../list-employees/list-employees";
import Table from "../table/table"
import {SERVER_URL} from "../../settings/constants"

export default class App extends Component {
    state = {
        open: false,
        selected_row: null,
        term: "",
        sort_row: true,
        employee: []
    }

    changeTable = () => {

        this.setState(({open}) => {
            return {
                open: !open
            }
        })
    }
    openTable = () => {

        this.setState(({open, selected_row}) => {
            return {
                open: !open,
                selected_row: null
            }
        })
    }
    searchChange = (term) => {
        this.setState({term})
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items
        }
        return items.filter((item) => {
            let status = false;
            Object.keys(item).forEach(key => {
                if (typeof (item[key]) == 'string' && key != 'photo' && item[key]
                    .toLowerCase().indexOf(term.toLowerCase()) > -1)
                    status = true;
                return;
            });
            return status;
        })
    }


    delete = () => {
        fetch(`${SERVER_URL}/employee/delete/`, {
            method: 'POST',
            body: JSON.stringify({id: this.state.selected_row})
        }).then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log("Сотрудник удален");

                this.setState(
                    {employee: this.state.employee.filter(item => item.id !== this.state.selected_row)}
                );
            } else {
                console.log("Произошла ошибка");
            }
        })
    }

    sort = (property) => {
        if (this.state.sort_row == true) {
            this.setState(({employee, sort_row}) => {
                return {
                    employee: employee.sort((a, b) => a[property] > b[property] ? 1 : -1),
                    sort_row: !this.state.sort_row
                }
            })
        } else {
            this.setState(({employee, sort_row}) => {
                return {
                    employee: employee.sort((a, b) => a[property] < b[property] ? 1 : -1),
                    sort_row: !this.state.sort_row
                }
            })
        }
    }


    getListOfEmployees = () => {
        fetch(`${SERVER_URL}/employee/get/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(response => {
            if (response.status === 200 || response.status === 201)
                return response.json();
            else {
                console.log("Произошла ошибка");
            }
        }).then(data => {
            this.setState(() => {
                    return {
                        employee: JSON.parse(data)
                    }
                }
            )
        });
    }

    setSelectedRow = (row_index) => {
        if (this.state.selected_row != row_index) {
            this.setState({selected_row: row_index});
        } else {
            this.setState({selected_row: null})
        }

    }

    componentDidMount() {
        this.getListOfEmployees();
    }

    render() {
        const {selected_row, employee, term, open} = this.state
        const visibleEmployee = this.search(employee, term)

        return (

            <Container maxWidth="md">

                <h1>Сотрудники компании</h1>
                <Search
                    searchChange={this.searchChange}
                />
                <BtnTableChange
                    selected_row={selected_row}
                    openTable={this.openTable}
                    changeTable={this.changeTable}
                    onDelete={this.delete}
                />
                <ListEmployees
                    sort={this.sort}
                    onDelete={this.delete}
                    employees={visibleEmployee}
                    setSelectedRow={this.setSelectedRow}
                    selected_row={selected_row}
                />
                <Table
                    employee={employee}
                    selected_row={selected_row}
                    openTable={this.openTable}
                    open={open}
                    getListOfEmployees={this.getListOfEmployees}
                />

            </Container>
        );
    }
}
