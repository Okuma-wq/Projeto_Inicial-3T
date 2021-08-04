using NUnit.Framework;
using ProjetoInicial_Testes.webApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoInicial_Teste.Unidade.Repositories
{
    class SalaRepositoryTestes
    {
        SalaRepository salaRepository;
        [SetUp]
        public void Setup()
        {
            salaRepository = new SalaRepository();

        }

        [Test]
        public void ListarDeveRetornarUmaListaDeSalas()
        {
            var listaDeSalas = salaRepository.Listar();

            Assert.IsNotEmpty(listaDeSalas);
        }
    }
}
