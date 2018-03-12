using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Entidad.Api
{
    public class Data<T>
    {
        public string status { get; set; }
        public string message { get; set; }
        public IList<T> data { get; set; }

        public Data()
        {
            this.status = Status.Ok;
            this.message = String.Empty;
        }
    }
}
