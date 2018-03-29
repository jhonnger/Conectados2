using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Helpers
{
    public class RespuestaControlador
    {
        public bool success { get; set; }
        public object data { get; set; }
        public string mensaje { get; set; }

        public RespuestaControlador(bool success, object data)
        {
            this.success = success;
            this.data = data;
        }
        public static RespuestaControlador respuestaExito(object data)
        {
            return new RespuestaControlador(true, data) ;
        } 
        public static RespuestaControlador respuetaError(string mensaje)
        {
            return new RespuestaControlador(false, null);
        }
    }
}
