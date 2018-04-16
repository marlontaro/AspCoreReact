using NPoco;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Entidad
{
    [TableName("Persona")]
    [PrimaryKey("IdPersona")]
    public class Persona
    {
        [Column("IdPersona")]
        public int IdPersona { get; set; }

        [Column("Nombre")]
        public string Nombre { get; set; }

        [Column("Fecha")]
        public DateTime Fecha { get; set; }

        [Column("Imagen")]
        public string Imagen { get; set; }

        [Column("ImagenOriginal")]
        public string ImagenOriginal { get; set; }

        [Column("ImagenMiniatura")]
        public string ImagenMiniatura { get; set; }

        [Column("Eliminado")]
        public bool Eliminado { get; set; }
    }
}
