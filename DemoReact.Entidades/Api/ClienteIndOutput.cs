using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Entidad.Api
{
    public class ClienteIndOutput
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public string apellido { get; set; }
        public string status { get; set; }
        public string message { get; set;
        }

        public ClienteIndOutput() {
            id = 0;
            nombre = String.Empty;
            apellido = String.Empty;
            message = String.Empty;
            status = Status.Ok;
        }
    }
}
