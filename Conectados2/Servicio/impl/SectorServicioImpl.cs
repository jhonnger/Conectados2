using System.Collections.Generic;
using Conectados2.Helpers;
using Conectados2.Models;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;
using System.Linq;

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

            if(sector.PuntoSector == null || sector.PuntoSector.Count == 0){
                return RespuestaControlador.respuetaError("Debe dibujar el perimetro del sector");
            }
            
            return base.actualizar(sector);
        }
        public override Sector obtener(int id)
        {
            var sector = this.baseRepositorio.obtener(id);
            sector.PuntoSector = sector.PuntoSector.OrderBy(p => p.Orden).ToList();
            return sector;
        }

        public Sector obtenerJurisdiccion(int id)
        {
            return ((SectorRepositorio)this.baseRepositorio).ObtenerJurisdiccion(id);
        }

        public BusquedaPaginada<Sector> obtenerPaginadosJurisdiccion(int? pagina, int cant)
        {
            return ((SectorRepositorio)this.baseRepositorio).obtenerPaginadosJurisdiccion(pagina, cant);
        }
    }
}
