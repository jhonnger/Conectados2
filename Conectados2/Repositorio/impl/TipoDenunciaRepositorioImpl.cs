using Conectados2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Repositorio.impl
{
    public class TipoDenunciaRepositorioImpl : BaseRepositorioImpl<TipoDenuncia, int>, TipoDenunciaRepositorio
    {
        public TipoDenunciaRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public override TipoDenuncia obtener(int id)
        {
            throw new NotImplementedException();
        }
    }
}
