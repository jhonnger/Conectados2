
using System.Collections.Generic;

namespace Conectados2.Models
{
    public partial class OrigenDenuncia
    {
        public OrigenDenuncia(){
            Denuncia = new HashSet<Denuncia>();
        }
        public int IdOrigenDenuncia { get; set; }
        public string Nombre { get; set; }

        public ICollection<Denuncia> Denuncia { get; set; }
    }
}