using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

public partial class _DbContextInversionesMontiel : DbContext
{
    public _DbContextInversionesMontiel()
    {
    }

    public _DbContextInversionesMontiel(DbContextOptions<_DbContextInversionesMontiel> options)
        : base(options)
    {
    }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Egreso> Egresos { get; set; }

    public virtual DbSet<Ingreso> Ingresos { get; set; }

    public virtual DbSet<Perfil> Perfils { get; set; }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<Proveedor> Proveedors { get; set; }

    public virtual DbSet<TipoComprobante> TipoComprobantes { get; set; }

    public virtual DbSet<TipoDocumento> TipoDocumentos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    public virtual DbSet<VistaCliente> VistaClientes { get; set; }

    public virtual DbSet<VistaEgreso> VistaEgresos { get; set; }

    public virtual DbSet<VistaIngreso> VistaIngresos { get; set; }

    public virtual DbSet<VistaProveedor> VistaProveedors { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Data Source=localhost;Initial Catalog=InversionesMontiel;Integrated Security=True; TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.ClienteId).HasName("PK__Cliente__3213E83F2C161382");

            entity.HasOne(d => d.Documento).WithMany(p => p.Clientes).HasConstraintName("FK_cliente_tipoDocumento1");
        });

        modelBuilder.Entity<Egreso>(entity =>
        {
            entity.HasKey(e => e.SalidaId).HasName("PK__salidaPr__F2FD5252AB7A91BF");

            entity.HasOne(d => d.Cliente).WithMany(p => p.Egresos).HasConstraintName("FK_egreso_cliente");

            entity.HasOne(d => d.Comprobante).WithMany(p => p.Egresos).HasConstraintName("FK_egreso_tipoComprobante");

            entity.HasOne(d => d.Producto).WithMany(p => p.Egresos).HasConstraintName("FK_egreso_producto");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Egresos).HasConstraintName("FK_egreso_usuario");
        });

        modelBuilder.Entity<Ingreso>(entity =>
        {
            entity.HasKey(e => e.IngresoId).HasName("PK__ingresoP__4E42CFD9EAE02214");

            entity.HasOne(d => d.Producto).WithMany(p => p.Ingresos).HasConstraintName("FK__ingresoPr__produ__02FC7413");

            entity.HasOne(d => d.Proveedor).WithMany(p => p.Ingresos).HasConstraintName("FK__ingresoPr__prove__02084FDA");

            entity.HasOne(d => d.TipoComprobanteNavigation).WithMany(p => p.Ingresos).HasConstraintName("FK_ingreso_tipoComprobante");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Ingresos).HasConstraintName("FK__ingresoPr__usuar__03F0984C");
        });

        modelBuilder.Entity<Perfil>(entity =>
        {
            entity.HasKey(e => e.PerfilId).HasName("PK__perfil__638DD32C67C894B2");
        });

        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.ProductoId).HasName("PK__producto__3213E83F52CB826C");
        });

        modelBuilder.Entity<Proveedor>(entity =>
        {
            entity.HasKey(e => e.ProveedorId).HasName("PK__proveedo__3213E83F65479696");

            entity.HasOne(d => d.TipoDocumentoNavigation).WithMany(p => p.Proveedors).HasConstraintName("FK_proveedor_tipoDocumento");
        });

        modelBuilder.Entity<TipoComprobante>(entity =>
        {
            entity.HasKey(e => e.ComprobanteId).HasName("PK__tipoComp__F0206326ABDDEA83");
        });

        modelBuilder.Entity<TipoDocumento>(entity =>
        {
            entity.HasKey(e => e.DocumentoId).HasName("PK__tipoDocu__426F79E1A2DF4643");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.UsuarioId).HasName("PK__usuario__3213E83F5F211B94");

            entity.HasOne(d => d.Perfil).WithMany(p => p.Usuarios).HasConstraintName("FK_usuario_perfil");
        });

        modelBuilder.Entity<VistaCliente>(entity =>
        {
            entity.ToView("VISTA_CLIENTE");
        });

        modelBuilder.Entity<VistaEgreso>(entity =>
        {
            entity.ToView("VISTA_EGRESO");
        });

        modelBuilder.Entity<VistaIngreso>(entity =>
        {
            entity.ToView("VISTA_INGRESO");
        });

        modelBuilder.Entity<VistaProveedor>(entity =>
        {
            entity.ToView("VISTA_PROVEEDOR");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
