using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IM_BACKEND._05_Model
{
    public class LoginResponse
    {

        public string mensaje { get; set; }
        public string token { get; set; }
        //public UserModel user { get; set; }
        public string refreshToken { get; set; }

        public UsuarioResponse user { get; set; }

    }
}
