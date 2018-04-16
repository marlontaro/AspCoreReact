using DemoReact.DAO;
using DemoReact.Entidad.Api;
using DemoReact.Entidad;
using System;
using System.Collections.Generic;

namespace DemoReact.Servicio
{
    public class ClienteServicio
    {
        private readonly ClienteRepositorio productRepository;

        public ClienteServicio() {
            productRepository = new ClienteRepositorio();
        }

        public Data<ClienteQuery> GetAll() {
            Data<ClienteQuery> data = new Data<ClienteQuery>();
            IList<ClienteQuery> list = new List<ClienteQuery>();

            list = productRepository.GetAll();
            data.data = list;

            if (list.Count != 0)
            {
                data.message = "";
                data.status = Status.Ok;
            
            }
            else {
                data.message = "No hay clientes";
                data.status = Status.Error;
            }


            return data;
        }

        public ClienteIndOutput GetByID(int id) {

            ClienteIndOutput clienteId = new ClienteIndOutput();
            clienteId = productRepository.GetByID(id);

            if (clienteId != null) {
                clienteId.message = "";
                clienteId.status = Status.Ok;

            }
            else
            {
                clienteId = new ClienteIndOutput();
                clienteId.message = "No existe cliente";
                clienteId.status = Status.Error;
            }
            return clienteId;
        }


        public CheckStatus Add(ClienteInput input)
        {
            CheckStatus checkstatus = new CheckStatus();
            Cliente cliente = new Cliente();
            cliente.IdCliente = 0;
            cliente.Nombre = input.nombre;
            cliente.Apellido = input.apellido;
            cliente.Eliminado = false;

            checkstatus = Validate(input, 1);
            if (checkstatus.status.Equals(Status.Ok))
            {
                checkstatus = productRepository.Add(cliente);
            }
            return checkstatus;
        }

        public CheckStatus Update(ClienteInput input)
        {
            CheckStatus checkstatus = new CheckStatus();
            Cliente cliente = new Cliente();
            cliente = productRepository.GetSingleByID(input.id);

            if (cliente != null) {

                cliente.Nombre = input.nombre;
                cliente.Apellido = input.apellido;
                cliente.Eliminado = false;

                checkstatus = Validate(input, 2);
                if (checkstatus.status.Equals(Status.Ok))
                {
                    checkstatus = productRepository.Update(cliente);
                }
            }
            else{
                checkstatus.message = "No existe";
                checkstatus.status = Status.Error;
            }

            
            return checkstatus;
        }

        public CheckStatus Validate(ClienteInput input, int tipo)
        {
            CheckStatus checkstatus = new CheckStatus();
            checkstatus.status = Status.Ok;

            string mensaje = "";
            if (tipo == 2)
            {
                if (input.id == 0) {
                    mensaje += "Debe ingresar codigo.";
                }
            }

            if (string.IsNullOrWhiteSpace(input.nombre)) {
                mensaje += "Debe ingresar nombre.";
            }

            if (string.IsNullOrWhiteSpace(input.apellido)) {
                mensaje += "Debe ingresar apellido.";
            }

            if (mensaje.Trim().Length != 0)
            {
                checkstatus.status = Status.Error;
                checkstatus.message = mensaje;

            }

            return checkstatus;
        }


        public CheckStatus Delete(int id)
        {
            CheckStatus checkstatus = new CheckStatus();
            Cliente cliente = new Cliente();
            cliente = productRepository.GetSingleByID(id);

            if (cliente != null)
            {
                cliente.Eliminado = true;
                checkstatus = productRepository.Delete(cliente);
            }
            else
            {
                checkstatus.message = "No existe";
                checkstatus.status = Status.Error;
            }


            return checkstatus;
        }
    }
}
