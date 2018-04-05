using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Usuario
    {
        public Usuario()
        {
            Denuncia = new HashSet<Denuncia>();
            Mensaje = new HashSet<Mensaje>();
            Participantes = new HashSet<Participantes>();
            RolUsuario = new HashSet<RolUsuario>();
        }

        public int IdUsuario { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string FotoPerfil { get; set; }
        public DateTime FecModificacion { get; set; }
        public DateTime FecCreacion { get; set; }
        public string UsuarioMod { get; set; }
        public bool Estado { get; set; }
        public string PasswordSalt { get; set; }
        public string Username { get; set; }

        public Persona IdUsuarioNavigation { get; set; }
        public UsuarioMuni UsuarioMuni { get; set; }
        public ICollection<Denuncia> Denuncia { get; set; }
        public ICollection<Mensaje> Mensaje { get; set; }
        public ICollection<Participantes> Participantes { get; set; }
        public ICollection<RolUsuario> RolUsuario { get; set; }
    }
}
