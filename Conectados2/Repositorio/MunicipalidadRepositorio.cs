using System.Threading.Tasks;
using Conectados2.Models;

namespace Conectados2.Repositorio
{
    public interface MunicipalidadRepositorio : BaseRepositorio<ComiMuni, int>
    {
         Task<ComiMuni> ObtenerPorIdUsuario(int i);
    }
}