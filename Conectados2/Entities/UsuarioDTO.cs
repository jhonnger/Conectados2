using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Entities
{
    public class UsuarioDTO
    {
        [Required]
        public string nombre { get; set; }

        [Required]
        public string apellidos { get; set; }

        [Required]
        public string email { get; set; }

        [Required]
        public string numDocumento { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Compare("password", ErrorMessage = "La contraseña y la confirmacion no coinciden")]
        public string confirmPassword { get; set; }

        [Required]
        public string fotoPerfil { get; set; }

        [Required]
        public string usuario { get; set; }
    }
}
