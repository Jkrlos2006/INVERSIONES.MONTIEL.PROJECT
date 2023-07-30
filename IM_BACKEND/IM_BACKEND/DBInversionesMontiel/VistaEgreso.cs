using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Keyless]
public partial class VistaEgreso
{
    [Column("salida_id")]
    public int SalidaId { get; set; }

    [Column("comprobante_id")]
    public int? ComprobanteId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? TipoComprobante { get; set; }

    [Column("num_comprobante")]
    [StringLength(30)]
    [Unicode(false)]
    public string? NumComprobante { get; set; }

    [Column("fecha_salida", TypeName = "date")]
    public DateTime? FechaSalida { get; set; }

    [Column("cantidad", TypeName = "decimal(18, 0)")]
    public decimal? Cantidad { get; set; }

    [Column("precio")]
    public int? Precio { get; set; }

    [Column("precio_igv")]
    public int? PrecioIgv { get; set; }

    [Column("total")]
    public int? Total { get; set; }

    [Column("cliente_id")]
    public int? ClienteId { get; set; }

    [StringLength(50)]
    [Unicode(false)]
    public string? Cliente { get; set; }

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
