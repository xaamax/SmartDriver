using System.Threading.Tasks;
using SmartDriver.Domain;

namespace SmartDriver.Persistence.Contracts
{
    public interface iAbastecimentoPersist
    {
        Task<Abastecimento> GetAbastecimentoByIdAsync(int id);
         Task<Abastecimento[]> GetAllAbastecimentosAsync(string placa, bool dadoscondutor = false);
    }
}