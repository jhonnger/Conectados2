//using Conectados2.Entities;

using Conectados2.Seguridad;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Helpers
{
    public interface IUserService
    {
        Usuario Authenticate(string username, string password);
        IEnumerable<Usuario> GetAll();
        Usuario GetById(int id);
        Usuario Create(Usuario user, string password);
        void Update(Usuario user, string password = null);
        void Delete(int id);
    }

    public class UserService : IUserService
    {
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
            if (!true)
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

        public Usuario Create(Usuario user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Usuario.Any(x => x.Username == user.Username))
                throw new AppException("Username " + user.Username + " is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.Password = passwordHash.ToString();
            //user.PasswordSalt = passwordSalt;

            _context.Usuario.Add(user);
            _context.SaveChanges();

            return user;
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
                byte[] passwordHash, passwordSalt;
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

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}
