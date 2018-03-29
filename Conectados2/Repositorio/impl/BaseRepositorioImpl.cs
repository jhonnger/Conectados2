using Conectados2.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Repositorio.impl
{
    public class BaseRepositorioImpl<Entidad, key> : BaseRepositorio<Entidad, key> where Entidad : class
    {
        private readonly DemoDbContext _context;

        
        public BaseRepositorioImpl(DemoDbContext context)
        {
            _context = context;
        }

        public void actualizar(Entidad entidad)
        {
            throw new NotImplementedException();
        }

        public void crear(Entidad entidad)
        {
            _context.Add(entidad);
        }

        public void grabarTodos(List<Entidad> list)
        {
            throw new NotImplementedException();
        }

        public Entidad obtener(key id)
        {
            throw new NotImplementedException();
        }

        public List<Entidad> obtenerTodos()
        {

            var a= _context.Set<Entidad> ();

            return a.ToList<Entidad>();
        }
    }
}
