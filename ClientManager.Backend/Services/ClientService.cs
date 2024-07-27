using ClientManager.Backend.Entities;
using ClientManager.Backend.Enums;
using ClientManager.Backend.Repositories;

namespace ClientManager.Backend.Services
{
    public class ClientService : IClientService
    {
        private readonly IClientRepository _clientRepository;
        public ClientService(IClientRepository clientRepository)
        {
            _clientRepository = clientRepository;
        }

        public async Task<IEnumerable<Client>> GetAllClients()
        {
            return await _clientRepository.GetAll();
        }

        public async Task UpsertClient(Client client)
        {
            await ValidateClientUniqueFieldsValues(client);

            if (client.Id == 0)
            {
                await _clientRepository.Add(client);
            }
            else
            {
                var existingClient = await _clientRepository.GetById(client.Id);
                if (existingClient == null)
                {
                    throw new ArgumentException("Client not found.");
                }
                await _clientRepository.Update(client);
            }
        }

        public async Task DeleteClient(int id)
        {
            await _clientRepository.Delete(id);
        }

        private async Task ValidateClientUniqueFieldsValues(Client client)
        {            

            if (await _clientRepository.EmailExists(client.Email) != client.Id)
            {
                throw new ArgumentException("The email is already linked to another client.");
            }

            if (await _clientRepository.CpfCnpjExists(client.CpfCnpj) != client.Id)
            {
                throw new ArgumentException("The CPF/CNPJ is already linked to another client.");
            }

            if (!client.IsStateRegistrationExempt && !string.IsNullOrEmpty(client.StateRegistration) &&
                await _clientRepository.StateRegistrationExists(client.StateRegistration) != client.Id)
            {
                throw new ArgumentException("The State Registration is already linked to another client.");
            }
        }

    }
}
