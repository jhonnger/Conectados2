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
using SocketIo;
using SocketIo.SocketTypes;

namespace Conectados2.Controllers
{
    
    [Route("api/chat")]
    public class ChatController : Controller
    {
        private readonly conectaDBContext _context;
        //private readonly ChatServicio chatServicioImpl;


        public ChatController(conectaDBContext conectaDBContext) => _context = conectaDBContext;

        

        // GET: api/chat/contactos/2
        [HttpGet("contactos/{id_usuario}/{id_contacto}/{username}")]
        public IActionResult ConversacionContacto([FromRoute] int id_usuario,[FromRoute] int id_contacto,[FromRoute] string username){
             // ======================================
             // Inicio Buscar conversacion entre dos usuarios
             // ======================================
             var id1 = _context.Participantes.Select( (x) => new {x.IdConversacion, x.IdUsuario} ).Where( y => y.IdUsuario == id_usuario);
             var id2 = _context.Participantes.Select( (x) => new {x.IdConversacion, x.IdUsuario} ).Where( y => y.IdUsuario == id_contacto);
             int res = -1;
             string user_name = username;
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
                 return CrearConversacion(id_usuario,id_contacto,user_name);
             }else{
                 return Getconversacion(res);
             }
             // ======================================
             // Fin Crear Conversacion o Abrir la que existe
             // ======================================

        }

        public IActionResult CrearConversacion( int id_usuario, int id_contacto, string username){
            
            var Con = new Conversacion();
            var _convesacion = new Conversacion();
            var _particantes = new Participantes();
            var _particantes1 = new Participantes();
            _convesacion.Descripcion =username;
            
            var datos = _context.Conversacion.Add(_convesacion);
            _context.SaveChanges();
            if (datos != null){
                Con = _context.Conversacion.OrderByDescending( x => x.IdConversacion).FirstOrDefault();
                if ( Con != null)
                {
                    _particantes.IdUsuario = id_usuario;
                    _particantes.IdConversacion = Con.IdConversacion;
                    var datos1 = _context.Participantes.Add(_particantes);
                    _particantes1.IdUsuario = id_contacto;
                    _particantes1.IdConversacion = Con.IdConversacion;
                    var datos2 = _context.Participantes.Add(_particantes1);
                    _context.SaveChanges();
                }
            }else{
                return NotFound();
            }

            return Ok(Con);
        }

        // GET: api/chat/contactos/2
        [HttpGet("contactos/{id_usuario}")]
        public IActionResult Getcontactos([FromRoute] int id_usuario){

            var muni = _context.UsuarioMuni.FirstOrDefault(x=> x.IdUsuario == id_usuario);

             var datos =  _context.UsuarioMuni.Join(_context.Usuario, us_mun =>us_mun.IdUsuario,
             us => us.IdUsuario, (us_mun, us) => new { us_mun.IdMuni,us_mun.IdUsuario,us.Email, us.FotoPerfil, us.Estado,us.Username})
             .Where( x => x.IdMuni == muni.IdMuni );

                        
            if (datos == null)
            {
                return NotFound();
            }
            return Ok(datos);
        }

        public IActionResult Getconversacion(int id_conversacion)
        {

            var datos = _context.Conversacion
                .GroupJoin(_context.Participantes, dt => dt.IdConversacion, dt1 => dt1.IdConversacion, 
                    (dt ,dt1) => new{dt,dt1})
                .GroupJoin(_context.Mensaje, dt => dt.dt.IdConversacion, dt2 => dt2.IdConversacion, 
                    ( dt,dt2) => new{dt,dt2})    
                .Where( x => x.dt.dt.IdConversacion ==id_conversacion);

            if (datos == null)
            {
                return NotFound();
            }
            return Ok(datos);
        }


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