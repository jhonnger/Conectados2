using Conectados2.Helpers;
using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Servicio.impl
{
    public class DenunciaServicioImpl: BaseServicioImpl<Denuncia, int>, DenunciaServicio
    {
         public DenunciaServicioImpl(DenunciaRepositorio denunciaRepositorio) 
            : base(denunciaRepositorio)
        {
        }

        public override RespuestaControlador actualizar(Denuncia entidad)
        {
            entidad.FecModificacion = DateTime.Now;
            return base.actualizar(entidad);
        }

    }
}
