using ProjetoInicial_Testes.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjetoInicial_Testes.webApi.Interfaces
{
    interface ISalaRepository
    {
        List<Sala> Listar();

        Sala BuscarPorId(int id);

        void Cadastrar(Sala novaSala);

        void Deletar(int id);

        void Atualizar(int id, Sala salaAtualizada);
    }
}
