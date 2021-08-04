using ProjetoInicial_Testes.webApi.Context;
using ProjetoInicial_Testes.webApi.Domains;
using ProjetoInicial_Testes.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoInicial_Testes.webApi.Repositories
{
    public class SalaRepository : ISalaRepository
    {
        TesteInicialContext ctx = new TesteInicialContext();
        public void Atualizar(int id, Sala salaAtualizada)
        {
            throw new NotImplementedException();
        }

        public Sala BuscarPorId(int id)
        {
            throw new NotImplementedException();
        }

        public void Cadastrar(Sala novaSala)
        {
            throw new NotImplementedException();
        }

        public void Deletar(int id)
        {
            throw new NotImplementedException();
        }

        public List<Sala> Listar()
        {
            return ctx.Salas.ToList();
        }
    }
}
