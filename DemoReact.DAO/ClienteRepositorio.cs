using DemoReact.Entidad.Api;
using DemoReact.Entidad;
using NPoco;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace DemoReact.DAO
{
    
    public class ClienteRepositorio
    {
        private string connectionString;
        public ClienteRepositorio()
        {
            connectionString = @"Data Source=SQL5033.site4now.net;Initial Catalog=DB_A0969B_demoreact;User Id=DB_A0969B_demoreact_admin;Password=Arenales1;Min Pool Size = 10; Max Pool Size = 100";
        }

        public IDatabase Connection
        {
            get
            {
                return new Database(connectionString, DatabaseType.SqlServer2012, SqlClientFactory.Instance);
            }
        }

     

        public IList<ClienteQuery> GetAll()
        {
            using (IDatabase db = Connection)
            {                
                return db.Fetch<ClienteQuery>("SELECT IdCliente as id, Nombre as nombre, Apellido as apellido FROM Cliente where eliminado = 0");
            }
        }

        public ClienteIndOutput GetByID(int id)
        {
            using (IDatabase db = Connection)
            {
                return db.SingleOrDefault<ClienteIndOutput>("SELECT IdCliente as id, Nombre as nombre, Apellido as apellido FROM Cliente where eliminado =0 and IdCliente=@0", id);
            }
        }

        public Cliente GetSingleByID(int id)
        {
            using (IDatabase db = Connection)
            {
                return db.SingleById<Cliente>(id);
            }
        }

        public CheckStatus Add(Cliente prod)
        {
            CheckStatus checkstatus = new CheckStatus();
            using (IDatabase db = Connection)
            {

                db.Insert<Cliente>(prod);

                checkstatus.status = Status.Ok;
                checkstatus.id = prod.IdCliente.ToString();
                checkstatus.message = "Se guardo cliente satisfactoriamente.";
            }

            return checkstatus;
        }

        public CheckStatus Update(Cliente prod)
        {
            CheckStatus checkstatus = new CheckStatus();
            using (IDatabase db = Connection)
            {
                db.Update(prod);
                checkstatus.message = "Se guardo cliente satisfactoriamente.";
                checkstatus.status = Status.Ok;
            }

            return checkstatus;
        }

        public CheckStatus Delete(Cliente prod)
        {
            CheckStatus checkstatus = new CheckStatus();
            using (IDatabase db = Connection)
            {
                db.Update(prod);
                checkstatus.message = "Se elimino este cliente satisfactoriamente";
                checkstatus.status = Status.Ok;
            }

            return checkstatus;
        }

      
    }
   
}
