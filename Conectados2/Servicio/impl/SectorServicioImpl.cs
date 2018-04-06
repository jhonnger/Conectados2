using System.Collections.Generic;
using Conectados2.Helpers;
using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;

namespace Conectados2.Servicio.impl
{
    public class SectorServicioImpl: BaseServicioImpl<Sector, int>, SectorServicio
    {
        TipoSectorRepositorio tipoSectorRepositorio;
        PuntoSectorRepositorio puntoSectorRepositorio;
         public SectorServicioImpl(SectorRepositorio sectorRepositorio,
                                    TipoSectorRepositorio tipoSectorRepositorio,
                                    PuntoSectorRepositorio puntoSectorRepositorio) 
            : base(sectorRepositorio)
        {
            this.tipoSectorRepositorio = tipoSectorRepositorio;
            this.puntoSectorRepositorio = puntoSectorRepositorio;
        }

        public override RespuestaControlador actualizar(Sector sector){
            
            bool puntosNuevos = false;
            Sector sectorDB;

            if(sector.PuntoSector == null || sector.PuntoSector.Count == 0){
                return RespuestaControlador.respuetaError("Debe dibujar el perimetro del sector");
            }
            foreach(PuntoSector puntoSector in sector.PuntoSector){
                if(puntoSector.IdPuntoSector == 0){
                    puntosNuevos = true;
                    break;
                }
            }
            if(puntosNuevos){
                sectorDB = this.baseRepositorio.obtener(sector.IdSector);

                foreach(PuntoSector puntoSector in sectorDB.PuntoSector){
                    this.puntoSectorRepositorio.eliminar(puntoSector);               
                }
            }
            return base.actualizar(sector);
        }

    
    }
}
