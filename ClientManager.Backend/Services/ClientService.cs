using ClientManager.Backend.Entities;
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

        public async Task<Client> GetById(int id)
        {
            return await _clientRepository.GetById(id);
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
            if (await _clientRepository.EmailExists(client.Email) != null)
            {
                if ((await _clientRepository.EmailExists(client.Email)).Id != client.Id)
                {
                    throw new ArgumentException("O e-mail já está vinculado a outro cliente.");
                }                
            }

            if (await _clientRepository.CpfCnpjExists(client.CpfCnpj) != null)
            {
                if((await _clientRepository.CpfCnpjExists(client.CpfCnpj)).Id != client.Id)
                {
                    throw new ArgumentException("O CPF/CNPJ já está vinculado a outro cliente.");
                }
            }

            if (!client.IsStateRegistrationExempt && !string.IsNullOrEmpty(client.StateRegistration) &&
                 await _clientRepository.StateRegistrationExists(client.StateRegistration) != null)
            {
                if((await _clientRepository.StateRegistrationExists(client.StateRegistration)).Id != client.Id)
                {
                    throw new ArgumentException("O Registro Estadual já está vinculado a outro cliente.");
                }                
            }
        }

    }
}
