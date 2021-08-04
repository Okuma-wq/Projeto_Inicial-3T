using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetoInicial_Testes.webApi.Domains
{
    public partial class SalasEquipamento
    {
        public int? IdSala { get; set; }
        public int? IdEquipamento { get; set; }
        public DateTime DataEntrada { get; set; }
        public DateTime? DataSaida { get; set; }

        public virtual Equipamento IdEquipamentoNavigation { get; set; }
        public virtual Sala IdSalaNavigation { get; set; }
    }
}
