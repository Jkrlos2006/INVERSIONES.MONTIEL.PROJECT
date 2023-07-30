using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace IM_BACKEND.DBInversionesMontiel;

[Table("perfil")]
public partial class Perfil
{
    [Key]
    [Column("perfil_id")]
    public int PerfilId { get; set; }

    [Column("codigo_perfil")]
    [StringLength(10)]
    [Unicode(false)]
    public string CodigoPerfil { get; set; } = null!;

    [Column("nombre_perfil")]
    [StringLength(50)]
    [Unicode(false)]
    public string NombrePerfil { get; set; } = null!;

    [InverseProperty("Perfil")]
    public virtual ICollection<Usuario> Usuarios { get; } = new List<Usuario>();
}
