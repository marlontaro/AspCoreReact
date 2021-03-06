﻿import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import axios from 'axios';
import InlineOk from "./message/InlineOk";
import InlineError from "./message/InlineError";
import $ from 'jquery';
import * as moment from 'moment';
import * as es from 'moment/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';


interface PersonaState {
    id: number;
    nombre: string;  
    fecha: any;
    imagen: Blob;
    urlImagen: string; 
    loading: boolean;
    titulo: string;
    mensajeOk: string;
    mensajeError: string;
}

export class PersonaCrear extends React.Component<RouteComponentProps<{}>, PersonaState> {

    constructor(props) {
        super(props);
        moment.locale('es');

        this.state = {
            id: 0,
            nombre: '',
            imagen: new Blob(),
            urlImagen:'/uploads/imagen/original/original.png',
            loading: false,
            titulo: 'Crear',
            mensajeError: '',
            mensajeOk: '',
            fecha: moment()
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleFechaEntrega = this.handleFechaEntrega.bind(this);
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleFechaEntrega(result) {

        this.setState({
            fecha: result
        });

    }

    componentWillMount() {

        if (this.props.match.params["id"] !== undefined) {
            var id = this.props.match.params["id"];

            axios.get(`api/personas/${id}`).
                then(response => {
                    let fecha = moment();
                    if (response.data.fecha !== undefined) {
                        fecha = moment(response.data.fecha,'YYYY-MM-DD');
                    }
                    console.log('fecha');
                    console.log(response.data.fecha);
                    console.log('fecha');
                    console.log(fecha.date());

                    this.setState({
                        titulo: 'Editar',
                        id: response.data.id,
                        fecha: fecha,
                        nombre: response.data.nombre,
                        urlImagen: response.data.imagen,
                        loading: false
                    });

                    //console.log(JSON.stringify(response.data));

                }).catch((error) => {
                    console.log("error", error)
                });
        }       
    }

    handleImagenChange(e) {

        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        if (file != null) {
            //validar extension 

            reader.onloadend = () => {

                this.setState({
                    imagen: file,
                    urlImagen: reader.result
                });
            }

            reader.readAsDataURL(file);

        } else {
            this.setState({
                imagen: new Blob(),
                urlImagen: '/uploads/imagen/original/original.png'
            });
        }
    }

    onClick = (e) => {
        this.setState({
            mensajeOk: '',
            mensajeError: '',
            loading: true
        });

        let url = 'api/personas';
        let metodo = 'POST';
        let id = 0;

        if (this.state.id !== 0) {
            url += '/' + this.state.id;
            metodo = 'PUT';
            id = this.state.id;
        }

        let fecha = '';
        fecha = moment(this.state.fecha).format('DD/MM/YYYY').toString();   
        console.log(url);
        console.log(metodo);
        console.log(this.state.fecha);
        let data = new FormData();        
        data.append('id', String(this.state.id));
        data.append('nombre', this.state.nombre);
        data.append('fecha', fecha);
        data.append('imagen', this.state.imagen);        

        axios({
            method: metodo,
            url: url,
            data: data
        }).then(response => {
            if (response.data.status === 'ok') {
 
                this.setState({
                    id: response.data.id,
                    mensajeError: '',
                    mensajeOk: response.data.message,
                    urlImagen: response.data.codigo,
                    titulo: 'Editar'
                });
            }
            console.log(JSON.stringify(response.data));

        }).catch((error) => {
            if (error.response.status === 422) {

                this.setState({
                    mensajeOk: '',
                    mensajeError: error.response.data.message,
                    loading: false
                });
            }
        });
    }

    public render() {
        return <div>
            <h3>Persona {this.state.titulo}</h3>
            <hr />
            <form>
                {this.state.mensajeOk && <InlineOk text={this.state.mensajeOk} />}
                {this.state.mensajeError && <InlineError text={this.state.mensajeError} />}

                <div className="form-group row">
                    <div className="col-sm-3">
                        <div className="text-center">
                            <img src={this.state.urlImagen} alt="..."
                                className="img-thumbnail" style={{ width: '200px', height: '200px' }} />
                        </div>
                        <div>
                            <input className="fileInput"
                                type="file" accept="image/x-png,image/jpeg"
                                onChange={(e) => this.handleImagenChange(e)}
                            />
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Nombre:</label>
                            <div className="col-sm-10">
                                <input type="text" className="form-control" id="nombre" name="nombre" autoFocus value={this.state.nombre} onChange={this.handleInputChange} />
                            </div>
                        </div> 

                        <div className="form-group row">
                            <label className="col-sm-2 col-form-label">Fecha:</label>
                            <div className="col-sm-10">
                                <DatePicker
                                    selected={this.state.fecha ? moment(this.state.fecha, 'DD-MM-YYYY') : moment()}
                                    todayButton={"Hoy"}
                                    dateFormat="DD/MM/YYYY"
                                    readOnly
                                    onChange={this.handleFechaEntrega}
                                    style={{ width: '100%' }}
                                    className="date-picker-input"
                                />        
                            </div>
                        </div> 

                    </div> 

                </div> 

                <div className="form-group row">
                    <div className="col-sm-6 offset-md-2">
                        <button type="button" className="btn btn-primary" onClick={this.onClick}>Guardar</button>
                        {" "}
                        <Link to={`/personas`} className="btn btn-light">
                            Volver
                        </Link>
                    </div>
                </div>

            </form>
        </div>;
    }
}