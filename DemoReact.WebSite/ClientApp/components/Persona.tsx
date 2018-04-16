import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import 'isomorphic-fetch';
import axios from 'axios';
import InlineOk from "./message/InlineOk";
import InlineError from "./message/InlineError";

interface PersonaState {
    Personas: PersonaQuery[];
    loading: boolean;
    mensajeCarga: string;
    mensajeError: string;
    mensajeOk: string;
}

export class Persona extends React.Component<RouteComponentProps<{}>, PersonaState> {
    constructor() {
        super();
        this.state = { Personas: [], loading: true, mensajeCarga: 'No hay personas.', mensajeError: '', mensajeOk: '' };
        this.deleteRow = this.deleteRow.bind(this);
    }

    componentWillMount() {
        axios.get("api/personas").
            then(response => {
                this.setState({
                    Personas: response.data.data,
                    mensajeCarga: response.data.message,
                    loading: false
                })
            }).catch((error) => {

                if (error.response.status === 404) {

                    this.setState({
                        mensajeCarga: error.response.data.message,
                        mensajeOk: '',
                        mensajeError:''
                    });
                }

                
            });

    }

    deleteRow(valor: number) {
        if (window.confirm("¿Seguro que deseas eliminar esta persona?") === true) {

            axios.delete(`api/personas/${valor}`)
                .then(response => {
                    if (response.data.status === "ok") {
                        let personas = Array();
                        personas = this.state.Personas.filter(item => item.id !== valor);
                        let mensaje = '';
                        if (personas.length === 0) {
                            mensaje = 'No hay personas';
                        }

                        this.setState({
                            mensajeError: "",
                            mensajeOk: response.data.message,
                            Personas: personas,
                            mensajeCarga: mensaje,
                        });
                    } else {
                        this.setState({
                            mensajeError: response.data.message,
                            mensajeOk: ""
                        });
                    }
                }).catch(error => {

                    
                    

                });
        }
    }

    public render() {

        return <div>

            <div className="clearfix">
                <div className="float-left">
                    <h3>Personas</h3>
                </div>
                <div className="float-right">
                    <Link to={`/Personas/crear`} className="btn btn-primary">
                        <span className="fas fa-plus"></span> Crear
                    </Link>
                </div>
            </div>
            <hr />

            {this.state.mensajeOk && <InlineOk text={this.state.mensajeOk} />}
            {this.state.mensajeError && <InlineError text={this.state.mensajeError} />}

            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>                        
                        <th scope="col" width="120px">Sel</th>
                        <th scope="col" width="20px">Imagen</th>
                        <th scope="col" width="20px">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.Personas.length !== 0 ? (
                            this.state.Personas.map(Persona =>
                                <tr key={Persona.id}>
                                    <td>
                                        <Link to={`/Personas/editar/${Persona.id}`} className="btn btn-primary">
                                            <span className="fas fa-pencil-alt"></span>
                                        </Link>{" "}
                                        <button onClick={() => this.deleteRow(Persona.id)} className="btn btn-danger">
                                            <span className="fas fa-times"></span>
                                        </button>
                                    </td>
                                    <td>
                                        <img src={Persona.imagen} alt="..."
                                            className="img-thumbnail" style={{ width: '50px' }} />
                                    </td>
                                    <td>{Persona.id}</td>
                                    <td>{Persona.nombre}</td>
                                    <td>{Persona.fecha}</td>
                                </tr>
                            )
                        ) : (
                                <tr key="0">
                                    <td colSpan={5} >
                                        <div>
                                            {this.state.mensajeCarga}
                                        </div>
                                    </td>
                                </tr>
                            )
                    }
                </tbody>
            </table>
        </div>;
    }

}

interface PersonaQuery {
    id: number;
    nombre: string;
    fecha: string;
    imagen: string;
}
