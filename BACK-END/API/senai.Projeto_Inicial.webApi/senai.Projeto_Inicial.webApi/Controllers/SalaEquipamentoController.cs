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
    public class SalaEquipamentoController : ControllerBase
    {
        private ISalaEquipamentoRepository _salaEquipamentoRepository { get; set; }

        public SalaEquipamentoController()
        {
            _salaEquipamentoRepository = new SalaEquipamentoRepository();
        }

        //[Authorize]
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_salaEquipamentoRepository.Listar().OrderBy(c => c.IdSalaEquipamento));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        //[Authorize]
        [HttpPost]
        public IActionResult Post(SalasEquipamento salaEquipamento)
        {
            try
            {
                _salaEquipamentoRepository.Atualizar(salaEquipamento);

                _salaEquipamentoRepository.Cadastrar(salaEquipamento);

                return StatusCode(201);
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            };
        }

        //[Authorize]
        [HttpGet("{id}")]
        public IActionResult GetByIdSala(int id)
        {
            try
            {
                return Ok(_salaEquipamentoRepository.ListarEquipamentosNaSala(id).OrderBy(c => c.IdEquipamento));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        //[Authorize]
        [HttpGet("/Equipamentos")]
        public IActionResult GetEquipamentos()
        {
            try
            {
                return Ok(_salaEquipamentoRepository.ListarEquipamentos().OrderBy(e => e.IdEquipamento));
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

        //[Authorize]
        [HttpGet("/Equipamentos/{id}")]
        public IActionResult GetByIdEquipamentos(int id)
        {
            try
            {
                return Ok(_salaEquipamentoRepository.BuscarPorIdEquipamento(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex);
            }
        }
    }
}
