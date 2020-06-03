import React, {Component} from "react";
import "./table.css"
import FormEmployee from "./form-window/form-empoyee";
import {Modal} from '@material-ui/core';


class Table extends Component {

    render() {
        const {open, openTable, getListOfEmployees, selected_row, employee} = this.props
        return (
            <div>
                <Modal
                    className='modals'
                    open={open}
                    closeTable={openTable}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    <FormEmployee
                        employee={employee}
                        selected_row={selected_row}
                        closeTable={openTable}
                        getListOfEmployees={getListOfEmployees}
                    />
                </Modal>
            </div>
        )
    }
}

export default Table;