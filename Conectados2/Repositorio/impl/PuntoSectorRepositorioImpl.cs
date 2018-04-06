using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Conectados2.Repositorio.impl
{
    public class PuntoSectorRepositorioImpl : BaseRepositorioImpl<PuntoSector, int>, PuntoSectorRepositorio
    {
        public PuntoSectorRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override PuntoSector obtener(int id)
        {
            throw new System.NotImplementedException();
        }

        public  void eliminar(PuntoSector puntoSector){
            
            this._context.PuntoSector.Remove(puntoSector);
            this._context.SaveChanges();
        }
    }
}
