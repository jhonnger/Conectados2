using Conectados2.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Repositorio.impl
{
    public abstract class BaseRepositorioImpl<Entidad, key> : BaseRepositorio<Entidad, key> where Entidad : class
    {
        public readonly conectaDBContext _context;

        
        public BaseRepositorioImpl(conectaDBContext context)
        {
            _context = context;
        }

        public virtual void actualizar(Entidad entidad)
        {
            _context.Entry(entidad).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void removeTracking(Entidad entidad){
            _context.Remove(entidad);
        }

        public void crear(Entidad entidad)
        {
            _context.Add(entidad);
            _context.SaveChanges();
        }

        public void grabarTodos(List<Entidad> list)
        {
            throw new NotImplementedException();
        }

         public abstract Entidad obtener(key id);
        

        public virtual List<Entidad> obtenerTodos()
        {

            var a= _context.Set<Entidad> ();
           

            return a.ToList<Entidad>();
        }

        public virtual List<Entidad> obtenerPaginados(int? pagina, int cant)
        {
            throw new NotImplementedException();
        }
    }
}
