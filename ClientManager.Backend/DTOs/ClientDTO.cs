using ClientManager.Backend.Enums;
using Microsoft.VisualBasic;
using System.ComponentModel.DataAnnotations;

namespace ClientManager.Backend.DTOs
{
    public class ClientDTO
    {
        public string Name { get; set; } // Nome do Cliente/Razão Social

        [EmailAddress]
        public string Email { get; set; }

        public string Phone { get; set; }

        public bool IsBlocked { get; set; } = false;

        public ClientType ClientType { get; set; }

        public string CpfCnpj { get; set; }

        public string? StateRegistration { get; set; } = null;

        public bool IsStateRegistrationExempt { get; set; } = false;

        public Gender? Gender { get; set; } = null;

        public DateTime? BirthDate { get; set; } = null;

        [MinLength(8)]
        public string Password { get; set; }
    }
}
