using NUnit.Framework;
using ProjetoInicial_Testes.webApi.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjetoInicial_Teste.Unidade.Controllers
{
    class SalaControllerTestes
    {
        [Test]
        public async void GetDeveRetornarStatusCode200OK()
        {
            var salaController = new SalaController();

            var resultadoRetornado = salaController.Get();

             
        }
    }
}
