using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using DemoReact.Entidad.Api;
using DemoReact.Entidad;
using DemoReact.Servicio;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace DemoReact.WebSite.Controllers
{
    [Produces("application/json")]
    [Route("api/cliente")]
    public class ClienteController : Controller
    {
        private readonly ClienteServicio productRepository;

       
        public ClienteController() {
            productRepository = new ClienteServicio();
         
        }

        // GET: api/Cliente
        [HttpGet]
        public IActionResult Get()
        {
            Data<ClienteQuery> data = new Data<ClienteQuery>();
            data = productRepository.GetAll();
           
            if (data.status.Equals(Status.Error))
            {
                return NotFound(data);
            }
            return Ok(data);

           
        }

        // GET: api/Cliente/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            ClienteIndOutput data = new ClienteIndOutput();
            data = productRepository.GetByID(id);

            if (data.status.Equals(Status.Error))
            {
                return NotFound(data);
            }
            return Ok(data);

        }

        // POST: api/Cliente
        [HttpPost]
        public IActionResult Post([FromBody]ClienteInput input)
        {
            CheckStatus checkStatus = new CheckStatus();
            checkStatus = productRepository.Add(input);

            return Ok(checkStatus);

        }

        // PUT: api/Cliente/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]ClienteInput input)
        {
            CheckStatus checkStatus = new CheckStatus();
            input.id = id;
            checkStatus = productRepository.Update(input);

            return Ok(checkStatus);
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CheckStatus checkStatus = new CheckStatus();          
            checkStatus = productRepository.Delete(id);

            return Ok(checkStatus);
        }
    }
}
