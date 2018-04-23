using System.Collections.Generic;
using Conectados2.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Conectados2.Helpers;
using System;

namespace Conectados2.Repositorio.impl
{
    public class DenunciaRepositorioImpl : BaseRepositorioImpl<Denuncia, int>, DenunciaRepositorio
    {
        public DenunciaRepositorioImpl(conectaDBContext context) : base(context)
        {
        }

        public  override Denuncia obtener(int id)
        {
            Denuncia denuncia = this._context.Denuncia
                .Include(p => p.PosicionDenuncia)
                .SingleOrDefault(s => s.IdDenuncia == id);
            
            return denuncia;
        }
        

        public override  List<Denuncia> obtenerTodos(){
            
            List<Denuncia> denuncia = this._context.Denuncia
                .Include(p => p.PosicionDenuncia)
                .Include(p => p.IdTipoDenunciaNavigation)
                .Include(p => p.OrigenDenuncia )
                .ToList();

            return denuncia;
            
        }

       
        public override BusquedaPaginada<Denuncia> obtenerPaginados(int? pagina, int cant)
        {
            var denuncia = this._context.Denuncia
                .OrderByDescending(s => s.FecModificacion);


            var results = PaginatedList<Denuncia>.Create(denuncia.AsNoTracking(), pagina ?? 1, cant);
            var response = BusquedaPaginada<Denuncia>.Create(results);

            return response;
        }

    }
}
