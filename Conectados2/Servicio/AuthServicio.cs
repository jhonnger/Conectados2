using Conectados2.Helpers;
using Conectados2.Models;


namespace Conectados2.Servicio
{
   public interface AuthServicio 
    {
        RespuestaControlador login(string username, string password);
    }
}
