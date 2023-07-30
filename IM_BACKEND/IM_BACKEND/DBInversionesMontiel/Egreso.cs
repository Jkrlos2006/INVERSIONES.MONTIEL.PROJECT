using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Table("egreso")]
public partial class Egreso
{
    [Key]
    [Column("salida_id")]
    public int SalidaId { get; set; }

    [Column("cliente_id")]
    public int? ClienteId { get; set; }

    [Column("producto_id")]
    public int ProductoId { get; set; }

    [Column("comprobante_id")]
    public int? ComprobanteId { get; set; }

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

    [Column("usuario_id")]
    public int? UsuarioId { get; set; }

    [ForeignKey("ClienteId")]
    [InverseProperty("Egresos")]
    public virtual Cliente? Cliente { get; set; }

    [ForeignKey("ComprobanteId")]
    [InverseProperty("Egresos")]
    public virtual TipoComprobante? Comprobante { get; set; }

    [ForeignKey("ProductoId")]
    [InverseProperty("Egresos")]
    public virtual Producto? Producto { get; set; }

    [ForeignKey("UsuarioId")]
    [InverseProperty("Egresos")]
    public virtual Usuario? Usuario { get; set; }
}
