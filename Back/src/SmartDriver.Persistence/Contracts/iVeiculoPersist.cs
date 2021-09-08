using System.Threading.Tasks;
using SmartDriver.Domain;

namespace SmartDriver.Persistence.Contracts
{
    public interface iVeiculoPersist
    {   
         Task<Veiculo> GetVeiculoByPlacaAsync(string placa);
         Task<Veiculo[]> GetAllVeiculosByModeloAsync(string modelo);
         Task<Veiculo[]> GetAllVeiculosAsync(string dpto, string uf);

    }
}