import React, {Component} from "react";
import "./form-employee.css"
import {TextField, Button, FormControlLabel, Switch} from '@material-ui/core/';
import {SERVER_DEFAULT, SERVER_URL} from '../../../settings/constants'
import moment from 'moment'


class FormEmployee extends Component {
    state = {
        photo: null,
        name: "",
        lastname: "",
        position: "",
        birthday: "",
        remote: false,
        city: "",
        street: "",
        house: "",
        flat: "",

    }

    onPropertyChange = (value, property_name) => {
        this.setState(() => {
            return {[property_name]: value}
        })

    }
    onPropertyToggle = (property_name) => {
        this.setState(() => {
                return {[property_name]: !this.state[property_name]}
            }
        )
    }

    fileChanged = (event) => {
        this.setState({photo: event.target.files[0]})

    }
    onSave = () => {
        const formData = new FormData()
        for (let [key, value] of Object.entries(this.state)) {
            formData.append(`${key}`, value)
        }

        fetch(`${SERVER_URL}/employee/save/`, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status === 200 || response.status === 201) {
                console.log("Сохранено успешно");
                this.props.getListOfEmployees();
            } else {
                console.log("Произошла ошибка");
            }
            this.props.closeTable()
        })

    }

    componentDidMount() {
        if (this.props.selected_row != null) {
            const newItem = this.props.employee.filter(item => item.id == this.props.selected_row)[0]
            this.setState(newItem)
        }
    }

    render() {
        let imageSrc = SERVER_DEFAULT
        if (this.props.selected_row != null) {
            imageSrc = `${SERVER_URL}${this.state.photo}`
        }

        return (
            <div className='form-employee'>
                <h2>Добавить/редактировать сотрудника</h2>
                <div className='form'>
                    <div className='form__photo'>
                        <img src={imageSrc} alt="Фото" className='form-image'/>
                        <TextField
                            className='form__colums-item'
                            id="outlined-basic"
                            type="file" onChange={this.fileChanged}

                        />
                    </div>
                    <form className='form__colums' noValidate autoComplete="off">
                        <div className='form__items-input'>
                            <div className="form__colum1">

                                <TextField
                                    className='form__colums-item'
                                    id="outlined-basic" label="Имя" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'name')}
                                    value={this.state.name}
                                />
                                <TextField
                                    className='form__colums-item'
                                    id="outlined-basic" label="Фамилия" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'lastname')}
                                    value={this.state.lastname}
                                />
                                <TextField
                                    className='form__colums-item birthday'
                                    id="date"
                                    label="Birthday"
                                    type="date"
                                    defaultValue="24.05.2020"
                                    formatDate={(date) => moment(date).format('DD.MM.YYYY')}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(e) => this.onPropertyChange(e.target.value, 'birthday')}
                                    value={this.state.birthday}
                                />
                                <TextField
                                    className='form__colums-item'
                                    d="outlined-basic" label="Должность" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'position')}
                                    value={this.state.position}
                                />
                                <FormControlLabel
                                    className='form__colums-item'
                                    control={
                                        <Switch
                                            onChange={() => this.onPropertyToggle('remote')}
                                            color="primary"
                                            checked={this.state.remote}
                                        />
                                    }
                                    label="Удаленная работа"

                                />
                            </div>

                            <div className="form__colum2">
                                <TextField
                                    className='form__colums-item'
                                    id="outlined-basic" label="Город" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'city')}
                                    value={this.state.city}
                                />
                                <TextField
                                    className='form__colums-item'
                                    d="outlined-basic" label="Улица" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'street')}
                                    value={this.state.street}
                                />
                                <TextField
                                    className='form__colums-item'
                                    id="outlined-basic" label="Дом" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'house')}
                                    value={this.state.house}
                                />
                                <TextField
                                    className='form__colums-item'
                                    d="outlined-basic" label="Квартира" variant="outlined"
                                    type="text" onChange={(e) => this.onPropertyChange(e.target.value, 'flat')}
                                    value={this.state.flat}
                                />
                            </div>
                        </div>
                    </form>
                </div>
                <Button className="form__button" variant="contained" color="primary"
                        onClick={this.props.closeTable}
                >
                    Закрыть
                </Button>
                <Button className="form__button" variant="contained" color="primary"
                        onClick={this.onSave}
                >
                    Сохранить
                </Button>

            </div>

        )
    }
}

export default FormEmployee;