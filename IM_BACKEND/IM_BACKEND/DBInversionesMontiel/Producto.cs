using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Table("producto")]
public partial class Producto
{
    [Key]
    [Column("producto_id")]
    public int ProductoId { get; set; }

    [Column("categoria")]
    [StringLength(50)]
    [Unicode(false)]
    public string Categoria { get; set; } = null!;

    [Column("nombre")]
    [StringLength(60)]
    [Unicode(false)]
    public string Nombre { get; set; } = null!;

    [Column("descripcion", TypeName = "text")]
    public string? Descripcion { get; set; }

    [Column("stock", TypeName = "decimal(10, 3)")]
    public decimal Stock { get; set; }

    [Column("costo_sin_igv", TypeName = "decimal(10, 3)")]
    public decimal CostoSinIgv { get; set; }

    [Column("costo_con_igv", TypeName = "decimal(10, 3)")]
    public decimal CostoConIgv { get; set; }

    [InverseProperty("Producto")]
    public virtual ICollection<Egreso> Egresos { get; } = new List<Egreso>();

    [InverseProperty("Producto")]
    public virtual ICollection<Ingreso> Ingresos { get; } = new List<Ingreso>();
}
