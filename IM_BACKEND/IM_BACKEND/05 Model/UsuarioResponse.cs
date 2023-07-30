using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IM_BACKEND._05_Model
{
    public class UsuarioResponse
    {
        public int Id { get; set; }
        [Unicode(false)]
        public string Username { get; set; } = null!;

        //[StringLength(200)]
        //[Unicode(false)]
        public string Password { get; set; } = null!;
        public bool? Estado { get; set; }
        public bool? ChangedPassword { get; set; }

    }
}
