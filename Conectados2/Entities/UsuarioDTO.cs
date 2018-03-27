using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Entities
{
    public class UsuarioDTO
    {
        public long IdUsuario { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FotoPerfil { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FecModificacion { get; set; }
        public string UsuarioMod { get; set; }
        public bool Estado { get; set; }
        public string SecurityStamp { get; set; }
        public string Username { get; set; }
    }
}
