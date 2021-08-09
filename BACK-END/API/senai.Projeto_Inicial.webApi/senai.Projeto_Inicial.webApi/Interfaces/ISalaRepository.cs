using senai.Projeto_Inicial.webApi.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Projeto_Inicial.webApi.Interfaces
{
    public interface ISalaRepository
    {
        /// <summary>
        /// Cria Sala
        /// </summary>
        /// <param name="sala">Sala a ser criada</param>
        void Criar(Sala sala);

        /// <summary>
        /// Lista salas
        /// </summary>
        /// <returns>Lista de Salas</returns>
        List<Sala> Listar();

        List<Sala> ListarAndares();

        Sala BuscarPorId(int id);

        /// <summary>
        /// Atualiza sala
        /// </summary>
        /// <param name="sala">sala a ser atualizada</param>
        void Atualizar(int id, Sala sala);

        /// <summary>
        /// Exclui sala
        /// </summary>
        /// <param name="id">id do sala a ser excluida</param>
        void Excluir(int id);
    }
}
