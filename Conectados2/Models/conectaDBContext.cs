﻿using System;
using Conectados2.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Options;

namespace Conectados2.Models
{
    public partial class conectaDBContext : DbContext
    {
        private readonly AppSettings _appSettings;
        public conectaDBContext(DbContextOptions<conectaDBContext> options,
                                IOptions<AppSettings> appSettings) : base(options) {
            _appSettings = appSettings.Value;
        }
        public virtual DbSet<ComiMuni> ComiMuni { get; set; }
        public virtual DbSet<ComiMuniMembresia> ComiMuniMembresia { get; set; }
        public virtual DbSet<Configuracion> Configuracion { get; set; }
        public virtual DbSet<Conversacion> Conversacion { get; set; }
        public virtual DbSet<Denuncia> Denuncia { get; set; }
        public virtual DbSet<OrigenDenuncia> OrigenDenuncia {get; set;}
        public virtual DbSet<EstadoDenuncia> EstadoDenuncia { get; set; }
        public virtual DbSet<Sector> Sector { get; set; }
        public virtual DbSet<Membresia> Membresia { get; set; }
        public virtual DbSet<Mensaje> Mensaje { get; set; }
        public virtual DbSet<Pago> Pago { get; set; }
        public virtual DbSet<Participantes> Participantes { get; set; }
        public virtual DbSet<Patrullero> Patrullero { get; set; }
        public virtual DbSet<Permiso> Permiso { get; set; }
        public virtual DbSet<Persona> Persona { get; set; }
        public virtual DbSet<PuntoSector> PuntoSector { get; set; }
        public virtual DbSet<Rol> Rol { get; set; }
        public virtual DbSet<RolPermiso> RolPermiso { get; set; }
        public virtual DbSet<RolUsuario> RolUsuario { get; set; }
        public virtual DbSet<TipoSector> TipoSector { get; set; }
        public virtual DbSet<TipoDenuncia> TipoDenuncia { get; set; }
        public virtual DbSet<TipoMuni> TipoMuni { get; set; }
        public virtual DbSet<Ubicacion> Ubicacion { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }
        public virtual DbSet<UsuarioMuni> UsuarioMuni { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {

                optionsBuilder.UseSqlServer(@""+_appSettings.ConexionJohhny);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ComiMuni>(entity =>
            {
                entity.HasKey(e => e.IdComiMuni);

                entity.ToTable("comi_muni");

                entity.Property(e => e.IdComiMuni).HasColumnName("id_comi_muni");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(80)
                    .IsUnicode(false);

                entity.Property(e => e.IdSector).HasColumnName("id_sector");

                

                entity.Property(e => e.IdTipoComiMuni).HasColumnName("id_tipo_comi_muni");

                entity.Property(e => e.IdUbicacion).HasColumnName("id_ubicacion");

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Ubicacion)
                    .WithMany(p => p.ComiMuni)
                    .HasForeignKey(d => d.IdUbicacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comi_muni_ubicacion");

                entity.HasOne(d => d.IdSectorNavigation)
                    .WithMany(p => p.ComiMuni)
                    .HasForeignKey(d => d.IdSector)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comi_muni_jurisdiccion");

                entity.HasOne(d => d.TipoComiMuni)
                    .WithMany(p => p.ComiMuni)
                    .HasForeignKey(d => d.IdTipoComiMuni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comi_muni_tipo_muni");
            });

            modelBuilder.Entity<ComiMuniMembresia>(entity =>
            {
                entity.HasKey(e => e.IdComiMuniMembresia);

                entity.ToTable("comi_muni_membresia");

                entity.Property(e => e.IdComiMuniMembresia).HasColumnName("id_comi_muni_membresia");

                entity.Property(e => e.CantMeses).HasColumnName("cant_meses");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdComiMuni).HasColumnName("id_comi_muni");

                entity.Property(e => e.IdMembresia).HasColumnName("id_membresia");

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdComiMuniNavigation)
                    .WithMany(p => p.ComiMuniMembresia)
                    .HasForeignKey(d => d.IdComiMuni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comi_muni_membresia_comi_muni");

                entity.HasOne(d => d.IdMembresiaNavigation)
                    .WithMany(p => p.ComiMuniMembresia)
                    .HasForeignKey(d => d.IdMembresia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_comi_muni_membresia_membresia");
            });

            modelBuilder.Entity<Configuracion>(entity =>
            {
                entity.HasKey(e => e.IdConfiguracion);

                entity.ToTable("configuracion");

                entity.Property(e => e.IdConfiguracion)
                    .HasColumnName("id_configuracion")
                    .ValueGeneratedNever();

                entity.Property(e => e.CamposReporte).HasColumnName("campos_reporte");

                entity.Property(e => e.ColorPrimario)
                    .IsRequired()
                    .HasColumnName("color_primario")
                    .HasMaxLength(7)
                    .IsUnicode(false);

                entity.Property(e => e.IdComiMuni).HasColumnName("id_comi_muni");

                entity.HasOne(d => d.IdComiMuniNavigation)
                    .WithMany(p => p.Configuracion)
                    .HasForeignKey(d => d.IdComiMuni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_configuracion_comi_muni");
            });

            modelBuilder.Entity<Conversacion>(entity =>
            {
                entity.HasKey(e => e.IdConversacion);

                entity.ToTable("conversacion");

                entity.Property(e => e.IdConversacion)
                    .HasColumnName("id_conversacion");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(20);
            });

            modelBuilder.Entity<Denuncia>(entity =>
            {
                entity.HasKey(e => e.IdDenuncia);

                entity.ToTable("denuncia");

                entity.Property(e => e.IdDenuncia)
                    .HasColumnName("id_denuncia")
                    .ValueGeneratedNever();

                entity.Property(e => e.Descripcion)
                    .HasColumnName("descripcion")
                    .HasMaxLength(250)
                    .IsUnicode(false);

                entity.Property(e => e.Dispositivo)
                    .IsRequired()
                    .HasColumnName("dispositivo")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .IsRequired()
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecDenuncia)
                    .HasColumnName("fec_denuncia")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .IsRequired()
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdEstadoDenuncia).HasColumnName("id_estado_denuncia");

                entity.Property(e => e.IdPosicionDenuncia).HasColumnName("id_posicion_denuncia");

                entity.Property(e => e.IdPosicionUsuario).HasColumnName("id_posicion_usuario");
                entity.Property(e => e.IdOrigenDenuncia).HasColumnName("id_origen_denuncia");

                entity.Property(e => e.IdTipoDenuncia).HasColumnName("id_tipo_denuncia");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.Navegador)
                    .IsRequired()
                    .HasColumnName("navegador")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdEstadoDenunciaNavigation)
                    .WithMany(p => p.Denuncia)
                    .HasForeignKey(d => d.IdEstadoDenuncia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_denuncia_estado_denuncia");

                entity.HasOne(d => d.OrigenDenuncia)
                    .WithMany(p => p.Denuncia)
                    .HasForeignKey(d => d.IdOrigenDenuncia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_denuncia_origen_denuncia");

                entity.HasOne(d => d.PosicionDenuncia)
                    .WithMany(p => p.DenunciaIdPosicionDenunciaNavigation)
                    .HasForeignKey(d => d.IdPosicionDenuncia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_denuncia_ubicacion");

                entity.HasOne(d => d.PosicionUsuario)
                    .WithMany(p => p.DenunciaIdPosicionUsuarioNavigation)
                    .HasForeignKey(d => d.IdPosicionUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_denuncia_ubicacion1");

                entity.HasOne(d => d.IdTipoDenunciaNavigation)
                    .WithMany(p => p.Denuncia)
                    .HasForeignKey(d => d.IdTipoDenuncia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_denuncia_tipo_denuncia");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Denuncia)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_denuncia_usuario");
            });

            modelBuilder.Entity<OrigenDenuncia>(entity =>
            {
                entity.HasKey(e => e.IdOrigenDenuncia);

                entity.ToTable("origen_denuncia");

                entity.Property(e => e.IdOrigenDenuncia).HasColumnName("id_origen_denuncia");

                entity.Property(e => e.Nombre).HasColumnName("nombre");

            });


            modelBuilder.Entity<EstadoDenuncia>(entity =>
            {
                entity.HasKey(e => e.IdEstadoDenuncia);

                entity.ToTable("estado_denuncia");

                entity.Property(e => e.IdEstadoDenuncia).HasColumnName("id_estado_denuncia");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

             modelBuilder.Entity<Sector>(entity =>
            {
                entity.HasKey(e => e.IdSector);

                entity.ToTable("sector");

                entity.Property(e => e.IdSector)
                    .HasColumnName("id_sector");

                entity.Property(e => e.IdSectorPadre).HasColumnName("id_sector_padre");

                entity.Property(e => e.IdTipoSector).HasColumnName("id_tipo_sector");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(70)
                    .IsUnicode(false);

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");
                entity.Ignore(s => s.Sectores);
               /** entity.HasOne(d => d.IdSectorPadreNavigation)
                    .WithMany(p => p.InverseIdSectorPadreNavigation)
                    .HasForeignKey(d => d.IdSectorPadre)
                    .HasConstraintName("FK_sector_sector");**/

                entity.HasOne(d => d.TipoSector)
                    .WithMany(p => p.Sector)
                    .HasForeignKey(d => d.IdTipoSector)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_sector_tipo_sector");
            });

            modelBuilder.Entity<Membresia>(entity =>
            {
                entity.HasKey(e => e.IdMembresia);

                entity.ToTable("membresia");

                entity.Property(e => e.IdMembresia).HasColumnName("id_membresia");

                entity.Property(e => e.CantUsuarios).HasColumnName("cant_usuarios");

                entity.Property(e => e.Costo)
                    .HasColumnName("costo")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.DiasDuracion).HasColumnName("dias_duracion");

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.LimiteReportesDia).HasColumnName("limite_reportes_dia");

                entity.Property(e => e.LimiteUsuarios).HasColumnName("limite_usuarios");

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Mensaje>(entity =>
            {
                entity.HasKey(e => e.IdMensaje);

                entity.ToTable("mensaje");

                entity.Property(e => e.IdMensaje)
                    .HasColumnName("id_mensaje");

                entity.Property(e => e.Hora)
                    .HasColumnName("hora")
                    .HasColumnType("datetime");

                entity.Property(e => e.IdConversacion).HasColumnName("id_conversacion");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.Texto)
                    .IsRequired()
                    .HasColumnName("texto")
                    .HasMaxLength(50);

                entity.HasOne(d => d.IdConversacionNavigation)
                    .WithMany(p => p.Mensaje)
                    .HasForeignKey(d => d.IdConversacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_mensaje_conversacion");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Mensaje)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_mensaje_usuario");
            });

            modelBuilder.Entity<Pago>(entity =>
            {
                entity.HasKey(e => e.IdPago);

                entity.ToTable("pago");

                entity.Property(e => e.IdPago).HasColumnName("id_pago");

                entity.Property(e => e.CodTransaccion)
                    .IsRequired()
                    .HasColumnName("cod_transaccion")
                    .HasMaxLength(50);

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.IdComiMuniMembresia).HasColumnName("id_comi_muni_membresia");

                entity.Property(e => e.Monto)
                    .HasColumnName("monto")
                    .HasColumnType("decimal(10, 2)");

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdComiMuniMembresiaNavigation)
                    .WithMany(p => p.Pago)
                    .HasForeignKey(d => d.IdComiMuniMembresia)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_pago_comi_muni_membresia");
            });

            modelBuilder.Entity<Participantes>(entity =>
            {
                entity.HasKey(e => e.IdParticipantes);

                entity.ToTable("participantes");

                entity.Property(e => e.IdParticipantes)
                    .HasColumnName("id_participantes");

                entity.Property(e => e.IdConversacion).HasColumnName("id_conversacion");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.HasOne(d => d.IdConversacionNavigation)
                    .WithMany(p => p.Participantes)
                    .HasForeignKey(d => d.IdConversacion)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_participantes_conversacion");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.Participantes)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_participantes_usuario");
            });

            modelBuilder.Entity<Patrullero>(entity =>
            {
                entity.HasKey(e => e.IdPatrullero);

                entity.ToTable("patrullero");

                entity.Property(e => e.IdPatrullero).HasColumnName("id_patrullero");

                entity.Property(e => e.IdComiMuni).HasColumnName("id_comi_muni");

                entity.Property(e => e.IdPersona).HasColumnName("id_persona");

                entity.Property(e => e.Placa)
                    .IsRequired()
                    .HasColumnName("placa")
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.IdComiMuniNavigation)
                    .WithMany(p => p.Patrullero)
                    .HasForeignKey(d => d.IdComiMuni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_patrullero_comi_muni");

                entity.HasOne(d => d.IdPersonaNavigation)
                    .WithMany(p => p.Patrullero)
                    .HasForeignKey(d => d.IdPersona)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_patrullero_persona");
            });

            modelBuilder.Entity<Permiso>(entity =>
            {
                entity.HasKey(e => e.IdPermiso);

                entity.ToTable("permiso");

                entity.Property(e => e.IdPermiso).HasColumnName("id_permiso");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Persona>(entity =>
            {
                entity.HasKey(e => e.IdPersona);

                entity.ToTable("persona");

                entity.Property(e => e.IdPersona).HasColumnName("id_persona");

                entity.Property(e => e.Apellido)
                    .IsRequired()
                    .HasColumnName("apellido")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.NumDoc)
                    .IsRequired()
                    .HasColumnName("num_doc")
                    .HasMaxLength(11)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<PuntoSector>(entity =>
            {
                entity.HasKey(e => e.IdPuntoSector);

                entity.ToTable("punto_sector");

                entity.Property(e => e.IdPuntoSector)
                    .HasColumnName("id_punto_sector");

                entity.Property(e => e.IdSector).HasColumnName("id_sector");

                entity.Property(e => e.lat)
                    .HasColumnName("latitud")
                    .HasColumnType("decimal(12, 8)");

                entity.Property(e => e.lng)
                    .HasColumnName("longitud")
                    .HasColumnType("decimal(12, 8)");

                entity.Property(e => e.Orden).HasColumnName("orden");

                entity.HasOne(d => d.IdSectorNavigation)
                    .WithMany(p => p.PuntoSector)
                    .HasForeignKey(d => d.IdSector)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_punto_sector_jurisdiccion");
            });

            modelBuilder.Entity<Rol>(entity =>
            {
                entity.HasKey(e => e.IdRol);

                entity.ToTable("rol");

                entity.Property(e => e.IdRol).HasColumnName("id_rol");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(60)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<RolPermiso>(entity =>
            {
                entity.HasKey(e => e.IdRolPermiso);

                entity.ToTable("rol_permiso");

                entity.Property(e => e.IdRolPermiso)
                    .HasColumnName("id_rol_permiso")
                    .ValueGeneratedNever();

                entity.Property(e => e.IdPermiso).HasColumnName("id_permiso");

                entity.Property(e => e.IdRol).HasColumnName("id_rol");

                entity.HasOne(d => d.IdPermisoNavigation)
                    .WithMany(p => p.RolPermiso)
                    .HasForeignKey(d => d.IdPermiso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_rol_permiso_permiso");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.RolPermiso)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_rol_permiso_rol");
            });

            modelBuilder.Entity<RolUsuario>(entity =>
            {
                entity.HasKey(e => e.IdRolUsuario);

                entity.ToTable("rol_usuario");

                entity.Property(e => e.IdRolUsuario).HasColumnName("id_rol_usuario");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(60)
                    .IsUnicode(false);

                entity.Property(e => e.IdRol).HasColumnName("id_rol");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.HasOne(d => d.IdRolNavigation)
                    .WithMany(p => p.RolUsuario)
                    .HasForeignKey(d => d.IdRol)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_tipo_usuario_rol");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithMany(p => p.RolUsuario)
                    .HasForeignKey(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_rol_usuario_usuario");
            });

        

            modelBuilder.Entity<TipoSector>(entity =>
                {
                    entity.HasKey(e => e.IdTipoSector);

                    entity.ToTable("tipo_sector");

                    entity.Property(e => e.IdTipoSector).HasColumnName("id_tipo_sector");

                    entity.Property(e => e.Nombre)
                        .IsRequired()
                        .HasColumnName("nombre")
                        .HasMaxLength(50)
                        .IsUnicode(false);
            });
            
            modelBuilder.Entity<TipoDenuncia>(entity =>
            {
                entity.HasKey(e => e.IdTipoDenuncia);

                entity.ToTable("tipo_denuncia");

                entity.Property(e => e.IdTipoDenuncia).HasColumnName("id_tipo_denuncia");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FechaModificacion)
                    .HasColumnName("fecha_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(100)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoMuni>(entity =>
            {
                entity.HasKey(e => e.IdTipoMuni);

                entity.ToTable("tipo_muni");

                entity.Property(e => e.IdTipoMuni).HasColumnName("id_tipo_muni");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasColumnName("nombre")
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<TipoMuni>()
                .HasMany(c => c.ComiMuni)
                .WithOne(e => e.TipoComiMuni)
                .IsRequired();

            modelBuilder.Entity<Ubicacion>(entity =>
            {
                entity.HasKey(e => e.IdUbicacion);

                entity.ToTable("ubicacion");

                entity.Property(e => e.IdUbicacion).HasColumnName("id_ubicacion");

                entity.Property(e => e.Descripcion)
                    .IsRequired()
                    .HasColumnName("descripcion")
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Latitud)
                    .HasColumnName("latitud")
                    .HasColumnType("decimal(10, 6)");

                entity.Property(e => e.Longitud)
                    .HasColumnName("longitud")
                    .HasColumnType("decimal(10, 6)");
            });

            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.HasKey(e => e.IdUsuario);

                entity.ToTable("usuario");

               // entity.HasIndex(e => e.IdPersona)
                 //   .HasName("IX_usuario")
                   // .IsUnique();

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Estado).HasColumnName("estado");

                entity.Property(e => e.FecCreacion)
                    .HasColumnName("fec_creacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FecModificacion)
                    .HasColumnName("fec_modificacion")
                    .HasColumnType("datetime")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.FotoPerfil)
                    .IsRequired()
                    .HasColumnName("foto_perfil")
                    .HasMaxLength(50)
                    .IsUnicode(false);

              //  entity.Property(e => e.IdPersona).HasColumnName("id_persona");

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasColumnName("password")
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordSalt)
                    .IsRequired()
                    .HasColumnName("password_salt")
                    .HasMaxLength(200)
                    .IsUnicode(false)
                    .HasDefaultValueSql("('--')");

                entity.Property(e => e.UsuarioMod)
                    .IsRequired()
                    .HasColumnName("usuario_mod")
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Persona)
                    .WithOne(p => p.Usuario)
                    .HasForeignKey<Usuario>(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_usuario_persona");
            });

            modelBuilder.Entity<UsuarioMuni>(entity =>
            {
                entity.HasKey(e => e.IdUsuarioMuni);

                entity.ToTable("usuario_muni");

                entity.HasIndex(e => e.IdUsuario)
                    .HasName("IX_usuario_muni")
                    .IsUnique();

                entity.Property(e => e.IdUsuarioMuni).HasColumnName("id_usuario_muni");

                entity.Property(e => e.IdMuni).HasColumnName("id_muni");

                entity.Property(e => e.IdUsuario).HasColumnName("id_usuario");

                entity.HasOne(d => d.IdMuniNavigation)
                    .WithMany(p => p.UsuarioMuni)
                    .HasForeignKey(d => d.IdMuni)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_usuario_muni_comi_muni");

                entity.HasOne(d => d.IdUsuarioNavigation)
                    .WithOne(p => p.UsuarioMuni)
                    .HasForeignKey<UsuarioMuni>(d => d.IdUsuario)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_usuario_muni_usuario");
            });
        }
    }
}
