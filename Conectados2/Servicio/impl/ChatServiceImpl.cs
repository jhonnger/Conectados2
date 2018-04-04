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
    public class ChatServicioImpl: BaseServicioImpl<Conversacion, int>, ChatServicio
    {
         public ChatServicioImpl(ChatRepositorio ChatRepositorioImpl) 
            : base(ChatRepositorioImpl)
        {
        }

        public RespuestaControlador actualizar(Conversacion entidad)
        {
            throw new NotImplementedException();
        }

        public RespuestaControlador crear(Conversacion entidad)
        {
            throw new NotImplementedException();
        }

        public void grabarTodos(List<Conversacion> list)
        {
            throw new NotImplementedException();
        }

        Conversacion BaseServicio<Conversacion, int>.obtener(int id)
        {
            throw new NotImplementedException();
        }

        List<Conversacion> BaseServicio<Conversacion, int>.obtenerTodos()
        {
            throw new NotImplementedException();
        }
    }
}
