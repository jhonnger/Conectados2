﻿using Conectados2.Models;
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

         public abstract Entidad obtener(key id);
        

        public virtual List<Entidad> obtenerTodos()
        {

            var a= _context.Set<Entidad> ();

            return a.ToList<Entidad>();
        }
    }
}
