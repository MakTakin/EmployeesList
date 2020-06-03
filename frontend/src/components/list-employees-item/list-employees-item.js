import React, {Component} from "react";
import "./list-employees-item.css"
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import CheckIcon from '@material-ui/icons/Check';
import {SERVER_URL} from "../../settings/constants";

export default class ListEmployeesItem extends Component {

    onBtnClick = (id) => {
        this.props.setSelectedRow(id)
    }

    render() {
        const {item} = this.props
        let birthday = ""
        if (item.birthday != null) {
            birthday = item.birthday.split('-').reverse().join('-')
        }
        let icon = <RemoveCircleOutlineIcon/>
        if (item.remote === false) {
            icon = icon
        } else {
            icon = <CheckIcon/>
        }

        return (

            <TableRow className={this.props.selected_row == item.id ? `selected` : ` `}
                      onClick={() => this.onBtnClick(item.id)}>
                <TableCell>
                    <img src={`${SERVER_URL}${item.photo}`} alt="Фото" className='employee-image'/>
                </TableCell>
                <TableCell align="right">{item.name}</TableCell>
                <TableCell align="right">{item.lastname}</TableCell>
                <TableCell align="right">{birthday}</TableCell>
                <TableCell align="right">{item.position}</TableCell>
                <TableCell align="center">{icon}</TableCell>
                <TableCell align="right">
                    {item.city}{item.street != '' && ','} {item.street} {item.house} {item.flat}
                </TableCell>
            </TableRow>
        )
    }
}