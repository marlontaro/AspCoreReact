using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Entidad.Api
{
    public class CheckStatus
    {
        public string id { set; get; }
        public string codigo { get; set; }
        public string status { get; set; }
        public string message { get; set; }

        public CheckStatus()
        {
            id = "0";
            codigo = "";
            status = Status.Error;
            message = string.Empty;
        }
    }
}
