using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Conectados2.Helpers
{
    public class BusquedaPaginada<T>
    {
        
        public int PaginaActual { get; set; }
        public int TotalPaginas { get; set; }
        public List<T> items { get; set; }

        public BusquedaPaginada(List<T> items,  int paginaActual, int totalPaginas){
            
            this.PaginaActual = paginaActual;
            this.TotalPaginas = totalPaginas; ;
            this.items = items;
        }
        public static BusquedaPaginada<T> Create(PaginatedList<T> items)
        {
            int paginaActual = items.PageIndex;
            int total = items.TotalPages;
            return new BusquedaPaginada<T>(items, paginaActual, total);
        }
    }
}
