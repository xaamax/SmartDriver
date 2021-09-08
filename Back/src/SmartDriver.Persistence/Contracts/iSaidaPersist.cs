using System.Threading.Tasks;
using SmartDriver.Domain;

namespace SmartDriver.Persistence.Contracts
{
    public interface iSaidaPersist
    {   
         Task<Saida> GetSaidaByIdAsync(int id, bool dadosCondutorVeiculo = false);
         Task<Saida[]> GetAllSaidasAsync(string dpto, string uf);

    }
}