using DemoReact.DAO;
using DemoReact.Entidad;
using DemoReact.Entidad.Api;
using System;
using System.Collections.Generic;
using System.Text;

namespace DemoReact.Servicio
{
    public class PersonaServicio
    {
        private readonly PersonaRepositorio personaRepository;

        public PersonaServicio()
        {
            personaRepository = new PersonaRepositorio();
        }

        public Data<PersonaQuery> GetAll()
        {
            Data<PersonaQuery> data = new Data<PersonaQuery>();
            IList<PersonaQuery> list = new List<PersonaQuery>();

            list = personaRepository.GetAll();
            data.data = list;

            if (list.Count != 0)
            {
                data.message = "";
                data.status = Status.Ok;

                foreach(PersonaQuery persona in list)
                {

                    if (persona.imagen.Trim().Length == 0)
                    {
                        persona.imagen = "/uploads/imagen/miniatura/miniatura.png";
                    }
                    else {
                        persona.imagen = "/uploads/imagen/miniatura/"+ persona.imagen;
                    }

                }

            }
            else
            {
                data.message = "No hay Personas";
                data.status = Status.Error;
            }


            return data;
        }

        public PersonaIndOutput GetByID(int id)
        {
            PersonaIndOutput PersonaId = new PersonaIndOutput();
            PersonaId = personaRepository.GetByID(id);

            if (PersonaId != null)
            {
                if (PersonaId.imagen.Trim().Length == 0)
                {
                    PersonaId.imagen = "/uploads/imagen/original/original.png";
                }
                else {
                    PersonaId.imagen = "/uploads/imagen/original/"+ PersonaId.imagen;
                }
                PersonaId.message = "";
                PersonaId.status = Status.Ok;

            }
            else
            {
                PersonaId = new PersonaIndOutput();
                PersonaId.message = "No existe Persona";
                PersonaId.status = Status.Error;
            }
            return PersonaId;
        }


        public CheckStatus Add(PersonaInput input)
        {
            CheckStatus checkstatus = new CheckStatus();            
            Persona persona = new Persona();
            persona.IdPersona = 0;
            persona.Nombre = input.nombre;
            persona.Fecha = DateTime.Now;         
            persona.Imagen = input.imagen;
            persona.ImagenOriginal = input.imagenOriginal;
            persona.ImagenMiniatura = input.imagenMiniatura;

            persona.Eliminado = false;

            checkstatus = Validate(input, 1);
            if (checkstatus.status.Equals(Status.Ok))
            {
                checkstatus = personaRepository.Add(persona);
            }
            return checkstatus;
        }

        public CheckStatus Update(PersonaInput input)
        {
            CheckStatus checkstatus = new CheckStatus();
            Persona persona = new Persona();
            persona = personaRepository.GetSingleByID(input.id);

            if (persona != null)
            {
                persona.Nombre = input.nombre;

                if (input.validaImagen == true)
                {
                    persona.Imagen = input.imagen;
                    persona.ImagenOriginal = input.imagenOriginal;
                    persona.ImagenMiniatura = input.imagenMiniatura;
                }

                persona.Eliminado = false;

                checkstatus = Validate(input, 2);
                if (checkstatus.status.Equals(Status.Ok))
                {
                    checkstatus = personaRepository.Update(persona);
                }
            }
            else
            {
                checkstatus.message = "No existe";
                checkstatus.status = Status.Error;
            }


            return checkstatus;
        }

        public CheckStatus Validate(PersonaInput input, int tipo)
        {
            CheckStatus checkstatus = new CheckStatus();
            checkstatus.status = Status.Ok;

            string mensaje = "";
            if (tipo == 2)
            {
                if (input.id == 0)
                {
                    mensaje += "Debe ingresar codigo.";
                }
            }

            if (string.IsNullOrWhiteSpace(input.nombre))
            {
                mensaje += "Debe ingresar nombre.";
            }

            

            if (mensaje.Trim().Length != 0)
            {
                checkstatus.status = Status.Error;
                checkstatus.message = mensaje;

            }

            return checkstatus;
        }


        public CheckStatus Delete(int id)
        {
            CheckStatus checkstatus = new CheckStatus();
            Persona Persona = new Persona();
            Persona = personaRepository.GetSingleByID(id);

            if (Persona != null)
            {
                Persona.Eliminado = true;
                checkstatus = personaRepository.Delete(Persona);
            }
            else
            {
                checkstatus.message = "No existe";
                checkstatus.status = Status.Error;
            }


            return checkstatus;
        }
    }
}
