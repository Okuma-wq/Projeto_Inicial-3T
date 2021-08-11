using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai.Projeto_Inicial.webApi.Domains;
using senai.Projeto_Inicial.webApi.Interfaces;
using senai.Projeto_Inicial.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Projeto_Inicial.webApi.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class SalasController : ControllerBase
    {
        private ISalaRepository _salaRepository { get; set; }

        public SalasController()
        {
            _salaRepository = new SalaRepository();
        }

        /// <summary>
        /// Lista salas
        /// </summary>
        /// <returns>Lista de salas</returns>
        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_salaRepository.Listar());
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("andares")]
        public IActionResult GetAndar()
        {
            try
            {
                return Ok(_salaRepository.ListarAndares());
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        [HttpGet("buscar/{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                Sala salaBuscada = _salaRepository.BuscarPorId(id);

                if (salaBuscada == null)
                {
                    return NotFound("Nenhuma sala encontrada!");
                }

                return Ok(salaBuscada);
            }
            catch (Exception codErro)
            {
                return BadRequest(codErro);
            }
        }

        /// <summary>
        /// Cria sala
        /// </summary>
        /// <param name="sala">sala a ser criada</param>
        /// <returns>Statuscode 201 - Created</returns>
        //[Authorize(Roles = "1")]
        [HttpPost]
        public IActionResult Post(Sala sala)
        {
            try
            {
                _salaRepository.Criar(sala);

                return StatusCode(201);
            }

            catch (Exception codErro)
            {
                return BadRequest(codErro);

            }
        }

        /// <summary>
        /// Atualiza sala
        /// </summary>
        /// <param name="sala">sala com dados a serem atualizados</param>
        /// <returns>StatusCode 204 - NoContent</returns>
        //[Authorize(Roles = "1")]
        [HttpPut("{id}")]
        public IActionResult Put(int id, Sala sala)
        {
            try
            {
                _salaRepository.Atualizar(id, sala);

                return StatusCode(204);

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        /// <summary>
        /// Exclui sala
        /// </summary>
        /// <param name="sala">id do sala a ser excluída</param>
        /// <returns>StatusCode 204 - NoContent</returns>
        //[Authorize(Roles = "1")]
        [HttpDelete]
        public IActionResult Delete(Sala sala)
        {
            try
            {
                _salaRepository.Excluir(sala.IdSala);

                return StatusCode(204);

            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }
    }
}
