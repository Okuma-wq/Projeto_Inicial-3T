using System;
using System.Collections.Generic;

#nullable disable

namespace ProjetoInicial_Testes.webApi.Domains
{
    public partial class TiposEquipamento
    {
        public TiposEquipamento()
        {
            Equipamentos = new HashSet<Equipamento>();
        }

        public int IdTipoEquipamento { get; set; }
        public string Titulo { get; set; }

        public virtual ICollection<Equipamento> Equipamentos { get; set; }
    }
}
