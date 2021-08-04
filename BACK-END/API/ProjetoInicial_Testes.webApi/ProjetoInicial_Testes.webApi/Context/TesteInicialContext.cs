using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using ProjetoInicial_Testes.webApi.Domains;

#nullable disable

namespace ProjetoInicial_Testes.webApi.Context
{
    public partial class TesteInicialContext : DbContext
    {
        public TesteInicialContext()
        {
        }

        public TesteInicialContext(DbContextOptions<TesteInicialContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Equipamento> Equipamentos { get; set; }
        public virtual DbSet<Sala> Salas { get; set; }
        public virtual DbSet<SalasEquipamento> SalasEquipamentos { get; set; }
        public virtual DbSet<TiposEquipamento> TiposEquipamentos { get; set; }
        public virtual DbSet<TiposUsuario> TiposUsuarios { get; set; }
        public virtual DbSet<Usuario> Usuarios { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Data Source=DESKTOP-4A3IQMH\\SQLEXPRESS; Initial Catalog=INICIAL_3DT; user id=sa; pwd=senai@132;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Equipamento>(entity =>
            {
                entity.HasKey(e => e.IdEquipamento)
                    .HasName("PK__Equipame__75940D34AEB92428");

                entity.HasIndex(e => e.NumeroSerie, "UQ__Equipame__71472B4DB8FBBA5A")
                    .IsUnique();

                entity.HasIndex(e => e.NumeroPatrimonio, "UQ__Equipame__D46FDABA000C6552")
                    .IsUnique();

                entity.Property(e => e.IdEquipamento).HasColumnName("idEquipamento");

                entity.Property(e => e.Descricao)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("descricao");

                entity.Property(e => e.IdTipoEquipamento).HasColumnName("idTipoEquipamento");

                entity.Property(e => e.NomeEquipamento)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("nomeEquipamento");

                entity.Property(e => e.NomeMarca)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false)
                    .HasColumnName("nomeMarca");

                entity.Property(e => e.NumeroPatrimonio)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("numeroPatrimonio");

                entity.Property(e => e.NumeroSerie)
                    .IsRequired()
                    .HasMaxLength(15)
                    .IsUnicode(false)
                    .HasColumnName("numeroSerie");

                entity.Property(e => e.Situacao).HasColumnName("situacao");

                entity.HasOne(d => d.IdTipoEquipamentoNavigation)
                    .WithMany(p => p.Equipamentos)
                    .HasForeignKey(d => d.IdTipoEquipamento)
                    .HasConstraintName("FK__Equipamen__idTip__30F848ED");
            });

            modelBuilder.Entity<Sala>(entity =>
            {
                entity.HasKey(e => e.IdSala)
                    .HasName("PK__Salas__C4AEB19CAEB02B1A");

                entity.Property(e => e.IdSala).HasColumnName("idSala");

                entity.Property(e => e.Andar)
                    .HasColumnType("numeric(2, 0)")
                    .HasColumnName("andar");

                entity.Property(e => e.Metragem).HasColumnName("metragem");

                entity.Property(e => e.NomeSala)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("nomeSala");
            });

            modelBuilder.Entity<SalasEquipamento>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.DataEntrada)
                    .HasColumnType("date")
                    .HasColumnName("dataEntrada");

                entity.Property(e => e.DataSaida)
                    .HasColumnType("date")
                    .HasColumnName("dataSaida");

                entity.Property(e => e.IdEquipamento).HasColumnName("idEquipamento");

                entity.Property(e => e.IdSala).HasColumnName("idSala");

                entity.HasOne(d => d.IdEquipamentoNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdEquipamento)
                    .HasConstraintName("FK__SalasEqui__idEqu__33D4B598");

                entity.HasOne(d => d.IdSalaNavigation)
                    .WithMany()
                    .HasForeignKey(d => d.IdSala)
                    .HasConstraintName("FK__SalasEqui__idSal__32E0915F");
            });

            modelBuilder.Entity<TiposEquipamento>(entity =>
            {
                entity.HasKey(e => e.IdTipoEquipamento)
                    .HasName("PK__TiposEqu__38B9B7E3B61D8BC0");

                entity.Property(e => e.IdTipoEquipamento).HasColumnName("idTipoEquipamento");

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("titulo");
            });

            modelBuilder.Entity<TiposUsuario>(entity =>
            {
                entity.HasKey(e => e.IdTipoUsuario)
                    .HasName("PK__TiposUsu__03006BFF19D09552");

                entity.HasIndex(e => e.Permissao, "UQ__TiposUsu__58C97201D6A99E63")
                    .IsUnique();

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.Permissao)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("permissao");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario)
                    .HasName("PK__Usuarios__645723A6749B83F5");

                entity.HasIndex(e => e.Email, "UQ__Usuarios__AB6E61640BC7E853")
                    .IsUnique();

                entity.Property(e => e.IdUsuario).HasColumnName("idUsuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("email");

                entity.Property(e => e.IdTipoUsuario).HasColumnName("idTipoUsuario");

                entity.Property(e => e.Senha)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasColumnName("senha");

                entity.HasOne(d => d.IdTipoUsuarioNavigation)
                    .WithMany(p => p.Usuarios)
                    .HasForeignKey(d => d.IdTipoUsuario)
                    .HasConstraintName("FK__Usuarios__idTipo__286302EC");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
