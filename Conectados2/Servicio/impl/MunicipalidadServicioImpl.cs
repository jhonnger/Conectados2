using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Servicio.impl
{
    public class MunicipalidadServicioImpl: BaseServicioImpl<ComiMuni, int>, MunicipalidadServicio
    {
         public MunicipalidadServicioImpl(MunicipalidadRepositorio municipalidadRepositorio) 
            : base(municipalidadRepositorio)
        {
        }

        
    }
}
