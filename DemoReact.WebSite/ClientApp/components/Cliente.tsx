import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import 'isomorphic-fetch';
import axios from 'axios';
import InlineOk from "./message/InlineOk";
import InlineError from "./message/InlineError"; 

interface ClienteState {
    clientes: ClienteQuery[];
    loading: boolean;
    mensajeCarga: string;
    mensajeError: string;
    mensajeOk: string;
}

export class Cliente extends React.Component<RouteComponentProps<{}>, ClienteState> {
    constructor() {
        super();
        this.state = { clientes: [], loading: true, mensajeCarga: '', mensajeError: '', mensajeOk:'' };        
        this.deleteRow = this.deleteRow.bind(this); 
    }

    componentWillMount() {
        axios.get("api/cliente").
            then(response => {               
                this.setState({
                    clientes: response.data.data,
                    mensajeCarga: response.data.message,
                    loading: false
                })
            }).catch((error) => {
                console.log("error", error)
            });

    }

    deleteRow(valor:number) {
        if (window.confirm("¿Seguro que deseas eliminar este cliente?") === true) {
            
            axios.delete(`api/cliente/${valor}`)
                .then(response => {
                    if (response.data.status === "ok") {                      

                        this.setState({
                            mensajeError: "",
                            mensajeOk: response.data.message,
                            clientes: this.state.clientes.filter(item => item.id !== valor)
                        });
                    } else {
                        this.setState({
                            mensajeError: response.data.message,
                            mensajeOk: ""
                        });
                    }
                }).catch(error => {
                    if (error.response.data.status === "error") {
                        this.setState({
                            mensajeError: error.response.data.message,
                            mensajeOk: ''
                        });
                    }
                });
        }
    }

    public render() {
      
        return <div>

            <div className="clearfix">
                <div className="float-left">
                    <h3>Clientes</h3>
                </div>
                <div className="float-right">
                    <Link to={`/clientes/crear`} className="btn btn-primary">
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
                        <th scope="col" width="20px">Código</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellidos</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.clientes.length !== 0 ? (                            
                            this.state.clientes.map(cliente =>
                                <tr key={cliente.id}>
                                    <td>
                                        <Link to={`/clientes/editar/${cliente.id}`} className="btn btn-primary">
                                            <span className="fas fa-pencil-alt"></span>                                            
                                        </Link>{" "}
                                        <button onClick={() => this.deleteRow(cliente.id)} className="btn btn-danger">
                                            <span className="fas fa-times"></span>  
                                        </button>                                        
                                    </td>
                                    <td>{cliente.id}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                </tr>
                            )                            
                        ):(
                            <tr key="0">
                                <td colSpan={4} >
                                    <div  >
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

interface ClienteQuery {
    id: number;    
    nombre: string;
    apellido: string;
}
