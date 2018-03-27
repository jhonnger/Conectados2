using System;
using System.Collections.Generic;

namespace Conectados2.Seguridad
{
    public partial class Usuario
    {
        public Usuario()
        {
           
            RolUsuario = new HashSet<RolUsuario>();
        }

        public long IdUsuario { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FotoPerfil { get; set; }
        public DateTime FecCreacion { get; set; }
        public DateTime FecModificacion { get; set; }
        public string PasswordSalt { get; set; }
        public string UsuarioMod { get; set; }
        public bool Estado { get; set; }
        public string Username { get; set; }

        public Persona Persona { get; set; }
        public ICollection<RolUsuario> RolUsuario { get; set; }

    }
}
