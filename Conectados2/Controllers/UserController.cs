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
using Conectados2.Seguridad;
using Conectados2.Servicio;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Conectados2.Controllers
{
    [Authorize]
    [Route("api/usuario/")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        private readonly AuthServicio _authServicio;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            AuthServicio authServicio,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
            _authServicio = authServicio;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody]LoginModel userDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }
            var user = await _authServicio.login(userDto.usuario, userDto.password);

        
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("registro")]

        public IActionResult Register([FromBody]UsuarioDTO userDto)
        {
            // map dto to entity
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
           // var user = _mapper.Map<Seguridad.Usuario>(userDto);
              

            try
            {
                // save 
                _userService.Create(userDto);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = _userService.GetAll();
            var userDtos = _mapper.Map<IList<UsuarioDTO>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            var userDto = _mapper.Map<UsuarioDTO>(user);
            return Ok(userDto);
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]UsuarioDTO userDto)
        {
            // map dto to entity and set id
            var user = _mapper.Map<Seguridad.Usuario>(userDto);
            user.IdUsuario = id;

            try
            {
                // save 
                _userService.Update(user, userDto.password);
                return Ok();
            }
            catch (AppException ex)
            {
                // return error message if there was an exception
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userService.Delete(id);
            return Ok();
        }
        
       

    }
}