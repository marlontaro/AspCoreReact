using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Entidad.Api
{
    public class PersonaInput
    {
        public int id { get; set; }
        public DateTime fecha { get; set; }
        public string nombre { get; set; }
        public string imagenOriginal { get; set; }
        public string imagen { get; set; }
        public string imagenMiniatura { get; set; }
        public bool validaImagen { get; set; }

    }
}
