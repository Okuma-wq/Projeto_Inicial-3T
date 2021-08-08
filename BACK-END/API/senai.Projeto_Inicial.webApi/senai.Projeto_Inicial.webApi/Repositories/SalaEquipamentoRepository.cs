using Microsoft.EntityFrameworkCore;
using senai.Projeto_Inicial.webApi.Context;
using senai.Projeto_Inicial.webApi.Domains;
using senai.Projeto_Inicial.webApi.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai.Projeto_Inicial.webApi.Repositories
{
    public class SalaEquipamentoRepository : ISalaEquipamentoRepository
    {
        ProjetoInicialContext ctx = new ProjetoInicialContext();

        public void Atualizar(SalasEquipamento salasEquipamentoAtualizado)
        {
            SalasEquipamento equipamentoBuscado = ctx.SalasEquipamentos.FirstOrDefault(c => c.IdEquipamento == salasEquipamentoAtualizado.IdEquipamento && c.DataSaida == null);

            equipamentoBuscado.DataSaida = DateTime.Now;

            ctx.SalasEquipamentos.Update(equipamentoBuscado);

            ctx.SaveChanges();
        }

        public void Cadastrar(SalasEquipamento novaTransferencia)
        {
            novaTransferencia.DataEntrada = DateTime.Now;

            SalasEquipamento a = new SalasEquipamento();

            ctx.SalasEquipamentos.Add(novaTransferencia);

            ctx.SaveChanges();
        }

        public List<SalasEquipamento> Listar()
        {
            return ctx.SalasEquipamentos.ToList();
        }

        public IEnumerable<SalasEquipamento> ListarEquipamentosNaSala(int idSala)
        {
            return ctx.SalasEquipamentos
                .Where(e => e.IdSala == idSala && e.DataSaida == null)
                .Select(e => new SalasEquipamento() 
                { 
                    DataEntrada = e.DataEntrada,
                    IdEquipamento = e.IdEquipamento,

                    IdEquipamentoNavigation = new Equipamento()
                    {
                        IdEquipamento = e.IdEquipamentoNavigation.IdEquipamento,
                        NomeEquipamento = e.IdEquipamentoNavigation.NomeEquipamento,
                        NomeMarca = e.IdEquipamentoNavigation.NomeMarca,
                        Descricao = e.IdEquipamentoNavigation.Descricao,
                        NumeroPatrimonio = e.IdEquipamentoNavigation.NumeroPatrimonio,
                        NumeroSerie = e.IdEquipamentoNavigation.NumeroSerie,
                        Situacao = e.IdEquipamentoNavigation.Situacao,

                        IdTipoEquipamentoNavigation = new TiposEquipamento()
                        {
                            Titulo = e.IdEquipamentoNavigation.IdTipoEquipamentoNavigation.Titulo
                        }
                    }
                });
        }

        public List<SalasEquipamento> ListarEquipamentos()
        {
            return ctx.SalasEquipamentos
                .Include(x => x.IdEquipamentoNavigation)
                .Include(x => x.IdSalaNavigation)
                .Where(e => e.DataSaida == null)
                .Select(e => new SalasEquipamento()
                {
                    DataEntrada = e.DataEntrada,

                    IdEquipamentoNavigation = new Equipamento()
                    {
                        IdEquipamento = e.IdEquipamentoNavigation.IdEquipamento,
                        NomeEquipamento = e.IdEquipamentoNavigation.NomeEquipamento,
                        NomeMarca = e.IdEquipamentoNavigation.NomeMarca,
                        Descricao= e.IdEquipamentoNavigation.Descricao,
                        NumeroPatrimonio = e.IdEquipamentoNavigation.NumeroPatrimonio,
                        NumeroSerie = e.IdEquipamentoNavigation.NumeroSerie,
                        Situacao = e.IdEquipamentoNavigation.Situacao,

                        IdTipoEquipamentoNavigation = new TiposEquipamento()
                        {
                            Titulo = e.IdEquipamentoNavigation.IdTipoEquipamentoNavigation.Titulo
                        }
                    },

                    IdSalaNavigation = new Sala()
                    {
                        IdSala = e.IdSalaNavigation.IdSala,
                        NomeSala = e.IdSalaNavigation.NomeSala,
                        Andar = e.IdSalaNavigation.Andar,
                        Metragem = e.IdSalaNavigation.Metragem
                    }
                })
                .ToList();
        }

        public void DeletarEquipamento(int id)
        {
            bool item = true;
            while (item == true)
            {
                SalasEquipamento salasEquipamento = ctx.SalasEquipamentos.FirstOrDefault(x => x.IdEquipamento == id);
                if (salasEquipamento == null)
                {
                    item = false;
                }
                else 
                {
                    ctx.SalasEquipamentos.Remove(salasEquipamento);
                    ctx.SaveChanges();
                }
            }

        }

        public void Deletar(int id)
        {
            SalasEquipamento salasEquipamento = ctx.SalasEquipamentos.Find(id);

            ctx.SalasEquipamentos.Remove(salasEquipamento);

            ctx.SaveChanges();
        }

        public SalasEquipamento BuscarPorIdEquipamento(int idEquipamento)
        {
            return ctx.SalasEquipamentos
                .Select(e => new SalasEquipamento()
                {
                    DataSaida = e.DataSaida,

                    IdEquipamentoNavigation = new Equipamento()
                    {
                        IdEquipamento = e.IdEquipamentoNavigation.IdEquipamento,
                        NomeEquipamento = e.IdEquipamentoNavigation.NomeEquipamento,
                        NomeMarca = e.IdEquipamentoNavigation.NomeMarca,
                        Descricao = e.IdEquipamentoNavigation.Descricao,
                        NumeroPatrimonio = e.IdEquipamentoNavigation.NumeroPatrimonio,
                        NumeroSerie = e.IdEquipamentoNavigation.NumeroSerie,
                        Situacao = e.IdEquipamentoNavigation.Situacao,

                        IdTipoEquipamentoNavigation = new TiposEquipamento()
                        {
                            Titulo = e.IdEquipamentoNavigation.IdTipoEquipamentoNavigation.Titulo
                        }
                    },

                    IdSalaNavigation = new Sala()
                    {
                        NomeSala = e.IdSalaNavigation.NomeSala
                    }
                })
                .FirstOrDefault(c => c.IdEquipamentoNavigation.IdEquipamento == idEquipamento && c.DataSaida == null);
        }
    }
}
