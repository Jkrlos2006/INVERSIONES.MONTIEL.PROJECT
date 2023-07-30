using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Table("tipoDocumento")]
public partial class TipoDocumento
{
    [Key]
    [Column("documento_id")]
    public int DocumentoId { get; set; }

    [Column("codigo_documento")]
    [StringLength(10)]
    [Unicode(false)]
    public string? CodigoDocumento { get; set; }

    [Column("nombre_documento")]
    [StringLength(50)]
    [Unicode(false)]
    public string? NombreDocumento { get; set; }

    [InverseProperty("Documento")]
    public virtual ICollection<Cliente> Clientes { get; } = new List<Cliente>();

    [InverseProperty("TipoDocumentoNavigation")]
    public virtual ICollection<Proveedor> Proveedors { get; } = new List<Proveedor>();
}
