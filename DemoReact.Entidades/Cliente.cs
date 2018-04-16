using NPoco;
using System;

namespace DemoReact.Entidad
{
    [TableName("Cliente")]
    [PrimaryKey("IdCliente")]
    public class Cliente
    {
        [Column("IdCliente")]
        public int IdCliente { get; set; }

        [Column("Nombre")]
        public string Nombre { get; set; }

        [Column("Apellido")]
        public string Apellido { get; set; }

        [Column("Eliminado")]
        public bool Eliminado { get; set; }
    }
}
