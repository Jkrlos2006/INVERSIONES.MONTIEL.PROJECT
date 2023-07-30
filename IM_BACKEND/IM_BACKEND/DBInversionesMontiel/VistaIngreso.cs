using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Keyless]
public partial class VistaIngreso
{
    [Column("ingreso_id")]
    public int IngresoId { get; set; }

    [Column("tipo_comprobante")]
    public int? TipoComprobante { get; set; }

    [Column("TipoComprobante")]
    [StringLength(50)]
    [Unicode(false)]
    public string? TipoComprobante1 { get; set; }

    [Column("num_comprobante")]
    [StringLength(50)]
    [Unicode(false)]
    public string? NumComprobante { get; set; }

    [Column("fecha_recepcion", TypeName = "date")]
    public DateTime? FechaRecepcion { get; set; }

    [Column("cantidad", TypeName = "numeric(18, 0)")]
    public decimal? Cantidad { get; set; }

    [Column("costo_unitario")]
    public int? CostoUnitario { get; set; }

    [Column("costo_total")]
    public int? CostoTotal { get; set; }

    [Column("num_lote")]
    [StringLength(50)]
    [Unicode(false)]
    public string? NumLote { get; set; }

    [Column("proveedor_id")]
    public int? ProveedorId { get; set; }

    [StringLength(100)]
    [Unicode(false)]
    public string? Proveedor { get; set; }

    [Column("producto_id")]
    public int? ProductoId { get; set; }

    [StringLength(60)]
    [Unicode(false)]
    public string Producto { get; set; } = null!;

    [Column("usuario_id")]
    public int? UsuarioId { get; set; }

    [StringLength(152)]
    [Unicode(false)]
    public string Usuario { get; set; } = null!;
}
