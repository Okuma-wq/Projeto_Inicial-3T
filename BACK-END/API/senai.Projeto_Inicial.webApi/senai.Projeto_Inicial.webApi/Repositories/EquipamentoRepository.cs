using senai.Projeto_Inicial.webApi.Context;
using senai.Projeto_Inicial.webApi.Domains;
using senai.Projeto_Inicial.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Projeto_Inicial.webApi.Repositories
{
    public class EquipamentoRepository : IEquipamentoRepository
    {
        ProjetoInicialContext ctx = new ProjetoInicialContext();

        public void Atualizar(int id, Equipamento equipamentoAtualizado)
        {
            Equipamento equipamentoBuscado = ctx.Equipamentos.Find(id);

            if (equipamentoAtualizado.NomeEquipamento != null)
            {
                equipamentoBuscado.NomeEquipamento = equipamentoAtualizado.NomeEquipamento;
            }

            if (equipamentoAtualizado.NomeMarca != null)
            {
                equipamentoBuscado.NomeMarca = equipamentoAtualizado.NomeMarca;
            }

            if (equipamentoAtualizado.Descricao != null)
            {
                equipamentoBuscado.Descricao = equipamentoAtualizado.Descricao;
            }

            
                equipamentoBuscado.Situacao = equipamentoAtualizado.Situacao;

            ctx.Equipamentos.Update(equipamentoBuscado);

            ctx.SaveChanges();
        }


        public Equipamento BuscarPorId(int id)
        {
            return ctx.Equipamentos.FirstOrDefault(c => c.IdEquipamento == id);
        }

        public Equipamento Cadastrar(Equipamento novoEquipamento)
        {
            ctx.Equipamentos.Add(novoEquipamento);

            ctx.SaveChanges();

            return novoEquipamento;
        }

        public void Deletar(int id)
        {
            ctx.Equipamentos.Remove(BuscarPorId(id));

            ctx.SaveChanges();
        }

        public List<Equipamento> Listar()
        {
            return ctx.Equipamentos.ToList();
        }
    }
}
