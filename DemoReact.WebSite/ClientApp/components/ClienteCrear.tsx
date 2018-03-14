import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import * as ReactDOM from 'react-dom';
import 'isomorphic-fetch';
import axios from 'axios';
import InlineOk from "./message/InlineOk";
import InlineError from "./message/InlineError";
import $ from 'jquery';


interface ClienteState {
    id: number;
    nombre: string;
    apellido: string;
    loading: boolean;
    titulo: string;
    mensajeOk: string;
    mensajeError: string; 
    
}

export class ClienteCrear extends React.Component<RouteComponentProps<{}>, ClienteState> {
    
    constructor(props) {
        super(props);
        this.state = {
            id: 0, nombre: '', apellido: '',
            loading: false,
            titulo: 'Crear',
            mensajeError: '',
            mensajeOk: '',
        };
     
        this.handleInputChange = this.handleInputChange.bind(this);   
    }       

    componentWillMount() {
      

        if (this.props.match.params["id"] !== undefined) {
            var id = this.props.match.params["id"];

            axios.get(`api/cliente/${id}`).
                then(response => {
                    this.setState({
                        titulo: 'Editar',
                        id: response.data.id,
                        nombre: response.data.nombre,
                        apellido: response.data.apellido,
                        loading: false
                    })
                }).catch((error) => {
                    console.log("error", error)
            });
        }       
    }

    handleInputChange(event) {

        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    
    onClick = (e) => {     

        if (this.state.id === 0) {

            axios.post("/api/cliente", {                          
                nombre: this.state.nombre,
                apellido: this.state.apellido 
            })
            .then(response => {
              
                if (response.data.status === "ok") {
                    
                    this.setState({
                        titulo: "Editar",
                        id: response.data.id,
                        mensajeError: "",
                        mensajeOk: response.data.message
                    });
                } else {
                    this.setState({
                        mensajeError: response.data.message,
                        mensajeOk: ""
                    });
                }           

                $("#nombre").focus();

            }).catch(error => {
                if (error.response.data.status === "error") {
                    this.setState({
                        mensajeError: error.response.data.message,
                        mensajeOk: ''
                    });                      
                }
            });

        } else {

            axios.put(`api/cliente/${this.state.id}`, {               
                nombre: this.state.nombre,
                apellido: this.state.apellido
            })
                .then(response => {

                    if (response.data.status === "ok") {

                        this.setState({                            
                            mensajeError: "",
                            mensajeOk: response.data.message
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
            <h3>Cliente {this.state.titulo}</h3>
            <hr />

            <form>
                {this.state.mensajeOk && <InlineOk text={this.state.mensajeOk} />}
                {this.state.mensajeError && <InlineError text={this.state.mensajeError} />}

                {this.state.id ? 
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Código:</label>
                    <div className="col-sm-10">
                       <input label="Código" type="text" className="form-control"  name="codigo" value={this.state.id} readOnly={true} />
                    </div>
                </div> 
                    : null}

                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Nombre:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="nombre" name="nombre" autoFocus value={this.state.nombre} onChange={this.handleInputChange} />
                    </div>
                </div> 

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Apellido:</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="apellido"   name="apellido" value={this.state.apellido} onChange={this.handleInputChange} />
                    </div>
                </div> 

                <div className="form-group row">
                    <div className="col-sm-6 offset-md-2">
                        <button type="button" className="btn btn-primary" onClick={this.onClick}>Guardar</button>
                        {" "}
                        <Link to={`/clientes`} className="btn btn-light">
                          Volver
                        </Link>
                   </div>
                </div>
            </form>
            </div>;
    }
}