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
        [HttpGet("contactos/{id_usuario}/{id_contacto}/{username}")]
        public IActionResult ConversacionContacto([FromRoute] int id_usuario,[FromRoute] int id_contacto,[FromRoute] string user_contacto){
             // ======================================
             // Inicio Buscar conversacion entre dos usuarios
             // ======================================
             var id1 = _context.Participantes.Select( (x) => new {x.IdConversacion, x.IdUsuario} ).Where( y => y.IdUsuario == id_usuario);
             var id2 = _context.Participantes.Select( (x) => new {x.IdConversacion, x.IdUsuario} ).Where( y => y.IdUsuario == id_contacto);
             int res = -1;
             string username = user_contacto;
             foreach (var item1 in id1)
             {
                 foreach (var item2 in id2)
                 {
                     if (item1.IdConversacion == item2.IdConversacion)
                     {
                         var id_conv = item2.IdConversacion;
                         var cont = _context.Participantes.Where( x=>x.IdConversacion==id_conv).Count();
                         if (cont == 2)
                         {
                             res = id_conv;
                             break;
                         }
                     }
                 }
             }
             // ======================================
             // Fin Buscar conversacion entre dos usuarios
             // ======================================

             // ======================================
             // Inicio Crear Conversacion o Abrir la que existe
             // ======================================
             // si es menos a 0 no existe conversacion
             if (res<=0)
             {
                 return CrearConversacion(id_usuario,id_contacto,username);
             }else{
                 return CrearConversacion(id_usuario,id_contacto,username);
             }
             // ======================================
             // Fin Crear Conversacion o Abrir la que existe
             // ======================================

        }

        public IActionResult CrearConversacion( int id_usuario, int id_contacto, string username){
            //  var datos =  _context.UsuarioMuni.Join(_context.Usuario, us_mun =>us_mun.IdUsuario,
            //  us => us.IdUsuario, (us_mun, us) => new { us_mun.IdMuni, us.Email , us.FotoPerfil , us.Estado , us.IdUsuario, us.Username})
            //  .Where( x => x.IdMuni == id_muni );
            var _convesacion = new Conversacion();
            _convesacion.Descripcion ="usuario1";
            var datos = _context.Conversacion.Add(_convesacion);
            _context.SaveChanges();
                        
            
            return Ok(datos);
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