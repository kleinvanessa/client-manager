using ClientManager.Backend.Entities;

namespace ClientManager.Backend.Repositories
{
    public interface IClientRepository
    {
        Task<bool> EmailExists(string email);
        Task<bool> CpfCnpjExists(string cpfCnpj);
        Task<bool> StateRegistrationExists(string stateRegistration);
        Task<IEnumerable<Client>> GetAll();
        Task Add(Client client);
        Task Update(Client client);
        Task Delete(int id);
    }
}
