using ClientManager.Backend.Entities;

namespace ClientManager.Backend.Services
{
    public interface IClientService
    {
        Task<Client> GetById(int id);
        Task<IEnumerable<Client>> GetAllClients();
        Task UpsertClient(Client client);
        Task DeleteClient(int id);

    }
}
