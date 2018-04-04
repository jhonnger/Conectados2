using Conectados2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Repositorio.impl
{
    public class ChatRepositorioImpl : BaseRepositorioImpl<Conversacion, int>, ChatRepositorio
    {
        public ChatRepositorioImpl(conectaDBContext context) : base(context)
        {
        }
    }
}
