using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DemoReact.Entidad.Api;
using DemoReact.Servicio;
using DemoReact.WebSite.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DemoReact.WebSite.Controllers
{
    [Produces("application/json")]
    [Route("api/personas")]
    public class PersonaController : Controller
    {
        private readonly PersonaServicio personaRepository;
        private readonly IHostingEnvironment environment;

        public PersonaController(IHostingEnvironment environment)
        {
            this.environment = environment;

            personaRepository = new PersonaServicio();
        }

        // GET: api/Persona
        [HttpGet]
        public IActionResult Get()
        {
            Data<PersonaQuery> data = new Data<PersonaQuery>();
            data = personaRepository.GetAll();

            if (data.status.Equals(Status.Error))
            {
                return NotFound(data);
            }
            return Ok(data);
        }

        // GET: api/Persona/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            PersonaIndOutput data = new PersonaIndOutput();
            data = personaRepository.GetByID(id);

            if (data.status.Equals(Status.Error))
            {
                return NotFound(data);
            }
            return Ok(data);
        }

        // POST: api/Persona
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] PersonaFormInput input)
        {
            string url = "";
            string imagenOriginal = "";
            string imagen = "";
            string imagenMiniatura = "";
            bool actualiza = false;

            if (input.imagen != null)
            {
                if (input.imagen.Length != 0)
                {
                    DateTime fechaActual = new DateTime();
                    fechaActual = DateTime.Now;
                    imagenOriginal = input.imagen.FileName;
                    imagen = String.Format("{0}{1}{2}{3}{4}{5}-{6}"
                        , fechaActual.Year, fechaActual.Month, fechaActual.Day,
                        fechaActual.Hour, fechaActual.Minute, fechaActual.Second,
                        input.imagen.FileName);

                    var filePath = Path.Combine(environment.ContentRootPath, @"uploads/imagen/original", imagen);
                    url = HttpContext.Request.Host.Value;

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await input.imagen.CopyToAsync(stream);
                    }
                    actualiza = true;
                }
            }

            string urlImagen = "/uploads/imagen/original/original.png";

            if (actualiza == true) {
                urlImagen = "/uploads/imagen/original/"+ imagen;
            }
            CheckStatus checkStatus = new CheckStatus();
            PersonaInput personaInput = new PersonaInput();
            personaInput.id = 0;
            personaInput.nombre = input.nombre;
            personaInput.imagenOriginal = imagenOriginal;
            personaInput.imagen = imagen;
            personaInput.imagenMiniatura = imagenMiniatura;
            personaInput.validaImagen = actualiza;
            checkStatus = personaRepository.Add(personaInput);


            if (checkStatus.status.Equals(Status.Error))
            {
                return StatusCode(422, checkStatus);
            }
            else {
                checkStatus.codigo = urlImagen;
            }
            return Ok(checkStatus);

        }

        // PUT: api/Persona/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromForm] PersonaFormInput input)
        {
            string url = "";
            string imagenOriginal = "";
            string imagen = "";
            string imagenMiniatura = "";
            bool actualiza = false;

            if (input.imagen != null)
            {
                if (input.imagen.Length != 0)
                {
                    DateTime fechaActual = new DateTime();
                    fechaActual = DateTime.Now;
                    imagenOriginal = input.imagen.FileName;
                    imagen = String.Format("{0}{1}{2}{3}{4}{5}-{6}"
                        , fechaActual.Year, fechaActual.Month, fechaActual.Day,
                        fechaActual.Hour, fechaActual.Minute, fechaActual.Second,
                        input.imagen.FileName);

                    var filePath = Path.Combine(environment.ContentRootPath, @"uploads/imagen/original", imagen);
                    url = HttpContext.Request.Host.Value;

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await input.imagen.CopyToAsync(stream);
                    }
                    actualiza = true;
                }
            }

            string urlImagen = "/uploads/imagen/original/original.png";

            if (actualiza == true)
            {
                urlImagen = "/uploads/imagen/original/" + imagen;
            }


            CheckStatus checkStatus = new CheckStatus();
            PersonaInput personaInput = new PersonaInput();
            personaInput.id = id;
            personaInput.nombre = input.nombre;
            personaInput.imagenOriginal = imagenOriginal;
            personaInput.imagen = imagen;
            personaInput.imagenMiniatura = imagenMiniatura;
            personaInput.validaImagen = actualiza;
         
            checkStatus = personaRepository.Update(personaInput);

            if (checkStatus.status.Equals(Status.Error))
            {
                return StatusCode(422, checkStatus);
            }
            else
            {
                checkStatus.codigo = urlImagen;
            }

            return Ok(checkStatus);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            CheckStatus checkStatus = new CheckStatus();
            checkStatus = personaRepository.Delete(id);

            return Ok(checkStatus);
        }
    }
}