using ClientManager.Backend.Entities;

namespace ClientManager.Backend.Repositories
{
    public interface IClientRepository
    {
        Task<Client?> EmailExists(string email);
        Task<Client?> CpfCnpjExists(string cpfCnpj);
        Task<Client?> StateRegistrationExists(string stateRegistration);
        Task<Client> GetById(int id);
        Task<IEnumerable<Client>> GetAll();
        Task Add(Client client);
        Task Update(Client client);
        Task Delete(int id);
    }
}
