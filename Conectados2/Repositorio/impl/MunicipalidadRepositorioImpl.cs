using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace Conectados2.Repositorio.impl
{
    public class MunicipalidadRepositorioImpl : BaseRepositorioImpl<ComiMuni, int>, MunicipalidadRepositorio
    {
        public MunicipalidadRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override ComiMuni obtener(int id)
        {
            throw new System.NotImplementedException();
        }

        public override  List<ComiMuni> obtenerTodos(){
            
            List<ComiMuni> munis = this._context.ComiMuni
                .Include(muni => muni.IdTipoComiMuni)
                .ToList();

            return munis;
            
        }
    }
}
