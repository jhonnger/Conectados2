using System;
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class Participantes
    {
        public int IdParticipantes { get; set; }
        public int IdUsuario { get; set; }
        public int IdConversacion { get; set; }

        public Conversacion IdConversacionNavigation { get; set; }
        public Usuario IdUsuarioNavigation { get; set; }
    }
}
