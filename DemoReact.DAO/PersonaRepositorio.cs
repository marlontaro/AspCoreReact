using DemoReact.Entidad.Api;
using DemoReact.Entidad;
using NPoco;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace DemoReact.DAO
{
    public class PersonaRepositorio
    {
        private string connectionString;

        public PersonaRepositorio()
        {
            connectionString = @"Data Source=SQL5033.site4now.net;Initial Catalog=DB_A0969B_demoreact;User Id=DB_A0969B_demoreact_admin;Password=Arenales1;Min Pool Size = 10; Max Pool Size = 100";
        }

        public IDatabase Connection
        {
            get
            {
                return new Database(connectionString, DatabaseType.SqlServer2008, SqlClientFactory.Instance);
            }
        }

        public IList<PersonaQuery> GetAll()
        {
            using (IDatabase db = Connection)
            {
                return db.Fetch<PersonaQuery>("SELECT IdPersona as id, Nombre as nombre,convert(varchar, fecha, 103)+ ' ' + convert(varchar, fecha, 108) as Fecha, isnull(imagenMiniatura,'') as Imagen  FROM Persona where eliminado = 0");
            }
        }

        public PersonaIndOutput GetByID(int id)
        {
            using (IDatabase db = Connection)
            {
                return db.SingleOrDefault<PersonaIndOutput>("SELECT IdPersona as id, Nombre as nombre, fecha as Fecha,  isnull(imagen,'') as Imagen FROM Persona where eliminado =0 and IdPersona=@0", id);
            }
        }

        public Persona GetSingleByID(int id)
        {
            using (IDatabase db = Connection)
            {
                return db.SingleById<Persona>(id);
            }
        }

        public CheckStatus Add(Persona prod)
        {
            CheckStatus checkstatus = new CheckStatus();
            using (IDatabase db = Connection)
            {

                db.Insert<Persona>(prod);

                checkstatus.status = Status.Ok;
                checkstatus.id = prod.IdPersona.ToString();
                checkstatus.message = "Se guardo persona satisfactoriamente.";
            }

            return checkstatus;
        }

        public CheckStatus Update(Persona prod)
        {
            CheckStatus checkstatus = new CheckStatus();
            using (IDatabase db = Connection)
            {
                db.Update(prod);
                checkstatus.message = "Se guardo persona satisfactoriamente.";
                checkstatus.status = Status.Ok;
            }

            return checkstatus;
        }

        public CheckStatus Delete(Persona prod)
        {
            CheckStatus checkstatus = new CheckStatus();
            using (IDatabase db = Connection)
            {
                db.Update(prod);
                checkstatus.message = "Se elimino este persona satisfactoriamente";
                checkstatus.status = Status.Ok;
            }

            return checkstatus;
        }
    }
}
