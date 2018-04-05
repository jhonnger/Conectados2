using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Conectados2.Entities;
using Conectados2.Helpers;
using Conectados2.Models;
using Conectados2.Seguridad;
using Conectados2.Servicio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Conectados2.Controllers
{
    
    [Route("api/chat")]
    public class ChatController : Controller
    {
        private readonly conectaDBContext _context;
        //private readonly ChatServicio chatServicioImpl;

        public ChatController( conectaDBContext conectaDBContext
           // ChatServicio chatServicioImpl
            )
        {
            _context = conectaDBContext;
            // this.chatServicioImpl = chatServicioImpl;
        }


        // GET: api/chat/contactos/2
        [HttpGet("contactos/{id_muni}")]
        public IActionResult Getcontactos([FromRoute] int id_muni){
             var datos =  _context.UsuarioMuni.Join(_context.Usuario, us_mun =>us_mun.IdUsuario,
             us => us.IdUsuario, (us_mun, us) => new { us_mun.IdMuni, us.Email , us.FotoPerfil , us.Estado , us.IdUsuario, us.Username})
             .Where( x => x.IdMuni == id_muni );

                        
            if (datos == null)
            {
                return NotFound();
            }
            return Ok(datos);
        }

        [HttpGet("conversacion/{id_us}")]
        public IActionResult Getconversacion([FromRoute] int id_us){
             var datos =  _context.Mensaje.Join(_context.Conversacion, msj =>msj.IdConversacion,
             conv => conv.IdConversacion, (msj, conv) => new { msj.IdUsuario , conv.IdConversacion, conv.Descripcion})
             .Where( x => x.IdUsuario == id_us );

                        
            if (datos == null)
            {
                return NotFound();
            }
            return Ok(datos);
        }

        [HttpGet("mensajes/{id_conv}")]
        public IActionResult GetMensajes([FromRoute] int id_conv){
             var datos =  _context.Conversacion.Join(_context.Mensaje, conv =>conv.IdConversacion,
             msj => msj.IdConversacion, (conv, msj) => new {conv.IdConversacion, msj.IdUsuario, msj.Texto, msj.Hora })
             .Where( x => x.IdConversacion == id_conv );

                        
            if (datos == null)
            {
                return NotFound();
            }
            return Ok(datos);
        }

    }
}