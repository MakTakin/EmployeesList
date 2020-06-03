import React, {Component} from "react";
import Button from '@material-ui/core/Button';
import './btn-table-change.css'

class BtnTableChange extends Component {
    render() {
        return (
            <div className='btnChange'>
                <Button variant="contained" color="primary"
                        onClick={
                            this.props.openTable}>
                    Добавить
                </Button>
                <Button variant="contained" color="primary"
                        onClick={this.props.changeTable}>
                    Редактировать
                </Button>
                <Button variant="contained" color="primary"
                        onClick={() => this.props.onDelete()}>
                    Удалить
                </Button>
            </div>


        )
    }
}

export default BtnTableChange;