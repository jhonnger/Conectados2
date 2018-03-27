//using Conectados2.Entities;

using Conectados2.Seguridad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Conectados2.Helpers
{
    public interface IUserService
    {
        Usuario Authenticate(string username, string password);
        IEnumerable<Usuario> GetAll();
        Usuario GetById(int id);
        Usuario Create(Entities.UsuarioDTO user);
        void Update(Usuario user, string password = null);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
        private const string userDefault = "Sistema";
        private AuthContext _context;

        public UserService(AuthContext context)
        {
            _context = context;
        }

        public Usuario Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(password))
                return null;

            var user = _context.Usuario.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                return null;

            // check if password is correct
            if (!VerifyPasswordHash(password, Encoding.UTF8.GetBytes(user.Password), Encoding.UTF8.GetBytes(user.PasswordSalt)))
                return null;

            // authentication successful
            return user;
        }

        public IEnumerable<Usuario> GetAll()
        {
            return _context.Usuario;
        }

        public Usuario GetById(int id)
        {
            return _context.Usuario.Find(id);
        }

        public Usuario Create(Entities.UsuarioDTO userDto)
        {
            string passwordHash, passwordSalt;
            // validation
            if (string.IsNullOrWhiteSpace(userDto.password))
                throw new AppException("Password is required");

            if (_context.Persona.Any(x => x.NumDoc == userDto.numDocumento))
                throw new AppException("Numero de documento " + userDto.numDocumento + " ya está registrado");

            if (_context.Usuario.Any(x => x.Username == userDto.usuario))
                throw new AppException("Username " + userDto.usuario + " ya ha sido registrado");

            if (_context.Usuario.Any(x => x.Email == userDto.email))
                throw new AppException("Email " + userDto.email + " ya ha sido registrado");

            Usuario usuario = new Usuario();
            Persona persona = new Persona();

            persona.Nombre = userDto.nombre;
            persona.Apellido = userDto.apellidos;
            persona.NumDoc = userDto.numDocumento;
            persona.UsuarioMod = userDefault;
            persona.FecCreacion = DateTime.Now;
            persona.FecModificacion = DateTime.Now;
            
            CreatePasswordHash(userDto.password,out passwordHash,out passwordSalt);

            usuario.Email = userDto.email;
            usuario.Username = userDto.usuario;
            usuario.Password = passwordHash;
            usuario.PasswordSalt = passwordSalt;
            usuario.FotoPerfil = "default.jpg";
            usuario.Persona = persona;
            usuario.UsuarioMod = userDefault;
            _context.Usuario.Add(usuario);
            _context.SaveChanges();

            return usuario;
        }

        public void Update(Usuario userParam, string password = null)
        {
            var user = _context.Usuario.Find(userParam.IdUsuario);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.Username != user.Username)
            {
                // username has changed so check if the new username is already taken
                if (_context.Usuario.Any(x => x.Username == userParam.Username))
                    throw new AppException("Username " + userParam.Username + " is already taken");
            }

            // update user properties
            user.UsuarioMod = userParam.UsuarioMod;
            user.FotoPerfil = userParam.FotoPerfil;
            user.Username = userParam.Username;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                string passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.Password = passwordHash.ToString();
                //user.PasswordSalt = passwordSalt;
            }

            _context.Usuario.Update(user);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _context.Usuario.Find(id);
            if (user != null)
            {
                _context.Usuario.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods

        private static void CreatePasswordHash(string password, out string passwordHash, out string passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            passwordSalt = getSalt();
            using (var hmac = new System.Security.Cryptography.HMACSHA512(Encoding.UTF8.GetBytes(passwordSalt)))
            {
               
                passwordHash = BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(password))).Replace("-", "").ToLower();
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 128) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 32) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = Encoding.UTF8.GetBytes(BitConverter.ToString(hmac.ComputeHash(Encoding.UTF8.GetBytes(password))).Replace("-", "").ToLower());
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
        private static string getSalt()
        {
            byte[] bytes = new byte[128 / 8];
            using (var keyGenerator = RandomNumberGenerator.Create())
            {
                keyGenerator.GetBytes(bytes);
                return BitConverter.ToString(bytes).Replace("-", "").ToLower();
            }
        }
    }
}
