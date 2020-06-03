import React from "react";
import "./list-employees.css";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListEmployeesItem from "../list-employees-item/list-employees-item";


const ListEmployees = ({onDelete, employees, setSelectedRow, selected_row, sort}) => {

    const ListEmployee = employees.map((item, index) =>
        <ListEmployeesItem key={index}
                           item={item}
                           onDelete={onDelete}
                           setSelectedRow={setSelectedRow}
                           selected_row={selected_row}

        />
    )

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead className="table-item">
                    <TableRow>
                        <TableCell>Превью</TableCell>
                        <TableCell align="right"
                                   className="table_item"
                                   onClick={() => sort(`name`)}>Имя</TableCell>
                        <TableCell align="right"
                                   className="table_item"
                                   onClick={() => sort(`lastname`)}>Фамилия</TableCell>
                        <TableCell align="right"
                                   className="table_item"
                                   onClick={() => sort(`birthday`)}>Дата рождения</TableCell>
                        <TableCell align="right"
                                   className="table_item"
                                   onClick={() => sort(`position`)}>Должность</TableCell>
                        <TableCell align="right"
                                   className="table_item"
                                   onClick={() => sort(`remote`)}>Удаленная работа</TableCell>
                        <TableCell align="right"
                                   className="table_item"
                                   onClick={() => sort(`city`)}>Адрес</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        ListEmployee
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default ListEmployees