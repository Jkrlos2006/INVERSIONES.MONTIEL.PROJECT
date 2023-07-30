using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Table("ingreso")]
public partial class Ingreso
{
    [Key]
    [Column("ingreso_id")]
    public int IngresoId { get; set; }

    [Column("tipo_comprobante")]
    public int? TipoComprobante { get; set; }

    [Column("num_comprobante")]
    [StringLength(50)]
    [Unicode(false)]
    public string? NumComprobante { get; set; }

    [Column("fecha_recepcion", TypeName = "date")]
    public DateTime? FechaRecepcion { get; set; }

    [Column("num_lote")]
    [StringLength(50)]
    [Unicode(false)]
    public string? NumLote { get; set; }

    [Column("cantidad", TypeName = "numeric(18, 0)")]
    public decimal? Cantidad { get; set; }

    [Column("costo_unitario")]
    public int? CostoUnitario { get; set; }

    [Column("costo_total")]
    public int? CostoTotal { get; set; }

    [Column("proveedor_id")]
    public int? ProveedorId { get; set; }

    [Column("producto_id")]
    public int ProductoId { get; set; }

    [Column("usuario_id")]
    public int? UsuarioId { get; set; }

    [ForeignKey("ProductoId")]
    [InverseProperty("Ingresos")]
    public virtual Producto? Producto { get; set; }

    [ForeignKey("ProveedorId")]
    [InverseProperty("Ingresos")]
    public virtual Proveedor? Proveedor { get; set; }

    [ForeignKey("TipoComprobante")]
    [InverseProperty("Ingresos")]
    public virtual TipoComprobante? TipoComprobanteNavigation { get; set; }

    [ForeignKey("UsuarioId")]
    [InverseProperty("Ingresos")]
    public virtual Usuario? Usuario { get; set; }
}
