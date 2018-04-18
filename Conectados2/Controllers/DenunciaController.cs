using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Conectados2.Models;
using Conectados2.Helpers;
using Conectados2.Servicio.impl;
using Conectados2.Servicio;

namespace Conectados2.Controllers
{
    [Produces("application/json")]
    [Route("api/Denuncia")]
    public class DenunciaController : Controller
    {

        private readonly DenunciaServicio denunciaServicio;

         public DenunciaController(DenunciaServicio denunciaServicio)
        {
            this.denunciaServicio = denunciaServicio;
        }

        // GET: api/tipoMuni
        [HttpGet]
        public RespuestaControlador GetDenuncia()
        {
            return RespuestaControlador.respuestaExito( denunciaServicio.obtenerTodos());
        }    
    }
}