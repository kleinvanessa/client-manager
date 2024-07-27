﻿using ClientManager.Backend.Data;
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

        public async Task<int> EmailExists(string email)
        {
            return await _context.Clients
            .Where(c => c.Email == email)
            .Select(c => c.Id)
            .FirstOrDefaultAsync();
        }

        public async Task<int> CpfCnpjExists(string cpfCnpj)
        {
            return await _context.Clients
            .Where(c => c.CpfCnpj == cpfCnpj)
            .Select(c => c.Id)
            .FirstOrDefaultAsync();
        }

        public async Task<int> StateRegistrationExists(string stateRegistration)
        {
            return await _context.Clients
            .Where(c => c.StateRegistration == stateRegistration)
            .Select(c => c.Id)
            .FirstOrDefaultAsync();
        }

        public async Task<Client> GetById(int id)
        {
            return await _context.Clients.FindAsync(id);
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
