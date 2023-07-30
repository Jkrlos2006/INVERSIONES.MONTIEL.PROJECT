using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Keyless]
public partial class VistaProveedor
{
    [Column("proveedor_id")]
    public int ProveedorId { get; set; }

    [Column("nombre")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Nombre { get; set; }

    [Column("tipo_documento")]
    public int? TipoDocumento { get; set; }

    [Column("tipoDocumento")]
    [StringLength(10)]
    [Unicode(false)]
    public string? TipoDocumento1 { get; set; }

    [Column("Numero_documento")]
    [StringLength(12)]
    [Unicode(false)]
    public string? NumeroDocumento { get; set; }

    [Column("direccion")]
    [StringLength(100)]
    [Unicode(false)]
    public string? Direccion { get; set; }

    [Column("telefono")]
    [StringLength(20)]
    [Unicode(false)]
    public string? Telefono { get; set; }

    [Column("email")]
    [StringLength(50)]
    [Unicode(false)]
    public string? Email { get; set; }
}
