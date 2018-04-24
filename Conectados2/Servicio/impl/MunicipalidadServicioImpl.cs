using Conectados2.Helpers;
using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Conectados2.Servicio.impl
{
    public class MunicipalidadServicioImpl: BaseServicioImpl<ComiMuni, int>, MunicipalidadServicio
    {
         public MunicipalidadServicioImpl(MunicipalidadRepositorio municipalidadRepositorio) 
            : base(municipalidadRepositorio)
        {
        }

        public override RespuestaControlador actualizar(ComiMuni entidad)
        {
            entidad.FecModificacion = DateTime.Now;
            return base.actualizar(entidad);
        }
        public override ComiMuni obtener(int id)
        {
            var muni = this.baseRepositorio.obtener(id);
            if(muni.IdSectorNavigation != null){
                muni.IdSectorNavigation.PuntoSector = muni.IdSectorNavigation.PuntoSector.OrderBy(p => p.Orden).ToList();
            }
            
            return muni;
        }


    }
}
