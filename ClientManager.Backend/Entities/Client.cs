using ClientManager.Backend.Enums;
using System.ComponentModel.DataAnnotations;

namespace ClientManager.Backend.Entities
{
    public class Client
    {
        public int Id { get; set; }
        public string Name { get; set; } // Nome do Cliente/Razão Social

        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        public DateTime RegistrationDate { get; set; }

        public bool IsBlocked { get; set; } = false;

        public ClientType ClientType { get; set; }

        public string CpfCnpj { get; set; }

        public string? StateRegistration { get; set; }

        public bool IsStateRegistrationExempt { get; set; }

        public Gender? Gender { get; set; }

        public DateTime? BirthDate { get; set; }

        [MinLength(8)]
        public string Password { get; set; }
    }
}
