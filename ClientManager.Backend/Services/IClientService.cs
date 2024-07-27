using ClientManager.Backend.Entities;

namespace ClientManager.Backend.Services
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetAllClients();
        Task UpsertClient(Client client);
        Task DeleteClient(int id);

    }
}
