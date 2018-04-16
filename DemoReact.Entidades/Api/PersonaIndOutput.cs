using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Entidad.Api
{
    public class PersonaIndOutput
    {
        public int id { get; set; }
        public string nombre { get; set; }
        public DateTime fecha { get; set; }
        public string imagen { get; set; }

        public string status { get; set; }
        public string message
        {
            get; set;
        }


        public PersonaIndOutput()
        {
            id = 0;
            nombre = String.Empty;
            imagen = String.Empty;
            fecha = DateTime.Now;
            message = String.Empty;
            status = Status.Ok;
        }
    }
}
