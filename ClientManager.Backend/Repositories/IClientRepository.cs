using ClientManager.Backend.Entities;

namespace ClientManager.Backend.Repositories
{
    public interface IClientRepository
    {
        Task<int> EmailExists(string email);
        Task<int> CpfCnpjExists(string cpfCnpj);
        Task<int> StateRegistrationExists(string stateRegistration);
        Task<Client> GetById(int id);
        Task<IEnumerable<Client>> GetAll();
        Task Add(Client client);
        Task Update(Client client);
        Task Delete(int id);
    }
}
