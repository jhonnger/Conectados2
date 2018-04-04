using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Conectados2.Helpers;
using Conectados2.Repositorio;
using Conectados2.Repositorio.impl;

namespace Conectados2.Servicio.impl
{
    public class BaseServicioImpl<Entidad, key> : BaseServicio<Entidad, key> where Entidad : class
    {
        BaseRepositorio<Entidad, key> baseRepositorio;

        public  BaseServicioImpl(BaseRepositorio<Entidad,key> baseRepositorio)
        {
            this.baseRepositorio = baseRepositorio;
        }

        public RespuestaControlador actualizar(Entidad entidad)
        {
            throw new NotImplementedException();
        }

        public RespuestaControlador crear(Entidad entidad)
        {
            throw new NotImplementedException();
        }

        public RespuestaControlador eliminar(key entidadId)
        {
            throw new NotImplementedException();
        }

        public void grabarTodos(List<Entidad> list)
        {
            throw new NotImplementedException();
        }

        public Entidad obtener(key id)
        {
            return this.baseRepositorio.obtener(id);
        }

        public List<Entidad> obtenerTodos()
        {
            return this.baseRepositorio.obtenerTodos();
        }
    }
}
