using ClientManager.Backend.Data;
using ClientManager.Backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace ClientManager.Backend.Repositories
{
    public class ClientRepository : IClientRepository
    {
        private readonly AppDbContext _context;

        public ClientRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> EmailExists(string email)
        {
            return await _context.Clients
            .AnyAsync(c => c.Email == email);
        }

        public async Task<bool> CpfCnpjExists(string cpfCnpj)
        {
            return await _context.Clients
            .AnyAsync(c => c.CpfCnpj == cpfCnpj);
        }

        public async Task<bool> StateRegistrationExists(string stateRegistration)
        {
            return await _context.Clients
                .AnyAsync(c => c.StateRegistration == stateRegistration);
        }

        public async Task<IEnumerable<Client>> GetAll()
        {
            return await _context.Clients.ToListAsync();
        }

        public async Task Add(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
        }

        public async Task Update(Client client)
        {
            _context.Clients.Update(client);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var client = await _context.Clients.FindAsync(id);
            if (client != null)
            {
                _context.Clients.Remove(client);
                await _context.SaveChangesAsync();
            }
        }
    }
}
