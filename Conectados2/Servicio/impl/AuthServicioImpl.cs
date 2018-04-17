using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Conectados2.Helpers;
using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Conectados2.Servicio.impl
{
    public class AuthServicioImpl : AuthServicio
    {
        private IUserService _userService;
        private readonly AppSettings _appSettings;

        private readonly UsuarioRepositorio _usuarioRepositorio;

        private readonly MunicipalidadRepositorio _municipalidadRepositorio;
         public AuthServicioImpl(
             IUserService userService, 
             IOptions<AppSettings> appSettings,
             MunicipalidadRepositorio municipalidadRepositorio,
             UsuarioRepositorio usuarioRepositorio)
        {
            _userService = userService;
            _appSettings = appSettings.Value;
            _usuarioRepositorio = usuarioRepositorio;
            _municipalidadRepositorio = municipalidadRepositorio;
        }

        public async Task<RespuestaControlador> login(string username, string password)
        {
            var user = _userService.Authenticate(username, password);

            if (user == null)
                return RespuestaControlador.respuetaError("Email o contraseña incorrectos"); ;
            Claim[] claims = this.obtenerClaims(user);

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);
            
            // return basic user info (without password) and token to store client side
            return RespuestaControlador.respuestaExito(new
            {
                Id = user.IdUsuario,
                Username = user.Username,
                FirstName = user.FotoPerfil,
                LastName = user.UsuarioMod,
                Token = tokenString,
                municipalidad = await _municipalidadRepositorio.ObtenerPorIdUsuario(user.IdUsuario)
            });
            
        }
        public Claim[] obtenerClaims(Conectados2.Seguridad.Usuario user){

            List<Rol> roles = this._usuarioRepositorio.obtenerRoles(user.IdUsuario);

            int nClaims =roles.Count + 1;
            int i = 0;

            Claim[] claims = new Claim[nClaims];

            foreach(Rol rol in roles){
                claims[i] = new Claim(ClaimTypes.Role, rol.Descripcion);   
                i++; 
            }
            claims[i] = new Claim(ClaimTypes.Name, user.IdUsuario.ToString());
            
            return claims;

        }
    }
}
