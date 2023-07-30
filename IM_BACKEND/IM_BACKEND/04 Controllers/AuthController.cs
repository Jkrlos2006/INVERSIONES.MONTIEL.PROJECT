using IM_BACKEND._02_Logica;
using IM_BACKEND._05_Model;
using IM_BACKEND._06_Util;
using IM_BACKEND.DBInversionesMontiel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.Xml;
using System.Text;

namespace IM_BACKEND._04_Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        UsuarioLogica _logica = new UsuarioLogica();

        [HttpPost]
        public IActionResult Filtrar([FromBody] LoginRequest request)
        {
            LoginResponse res = new LoginResponse();
            res.mensaje = "usuario y/o password incorrecto";
            //01 encontrando el usuario
            Usuario user = _logica.ObtenerUsuarioPorUsername(request.Username);

            //02 validar contraseño
            if (user != null)
            {
                //pregunta 
                if (user.Password == UtilCripto.Encriptar_AES(request.Password))
                {
                    //es correcto
                    res.mensaje = "Login Correcto";
                    res.refreshToken = "";
                    res.user = new UsuarioResponse();
                    res.user.Username = user.Username;
                    res.user.ChangedPassword = true;
                    res.user.Password = "";
                    res.user.Estado = true;
                    res.user.Id = user.UsuarioId;
                    //03 la implementación del token
                    res.token = CreateToken(res.user);
                }
            }
            return Ok(res);
        }

        #region metodos privados
        private static string CreateToken(UsuarioResponse user)
        {
            //create claims details based on the user information
            IConfigurationBuilder configurationBuild = new ConfigurationBuilder();
            configurationBuild = configurationBuild.AddJsonFile("appsettings.json");
            IConfiguration configurationFile = configurationBuild.Build();
            // Leemos el archivo de configuración.
            int TimpoVidaToken = int.Parse(configurationFile["Jwt:TimeJWTMin"]);
            var claims = new[] {
                        new Claim(JwtRegisteredClaimNames.Sub, configurationFile["Jwt:Subject"]),
                        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                        new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                        new Claim("UserId", user.Id.ToString()),
                        new Claim("DisplayName", $"nombre completo"),
                        new Claim("UserName", user.Username),
                        new Claim(ClaimTypes.Role, "administrador"),
                        new Claim("Email", "i20202020qcontinental.edu.pe")
                    };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configurationFile["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                configurationFile["Jwt:Issuer"],
                configurationFile["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(TimpoVidaToken),
                signingCredentials: signIn);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        #endregion




    }
}
