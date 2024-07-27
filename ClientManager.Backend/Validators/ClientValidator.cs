using FluentValidation;
using ClientManager.Backend.Entities;
using ClientManager.Backend.Enums;
using System.Text.RegularExpressions;

namespace ClientManager.Backend.Validators
{
    public class ClientValidator : AbstractValidator<Client>
    {
        public ClientValidator()
        {
            // Validação da área principal
            RuleFor(client => client.Name)
                .NotEmpty().WithMessage("Nome do Cliente/Razão Social é obrigatório.")
                .MaximumLength(150).WithMessage("Nome do Cliente/Razão Social deve ter no máximo 150 caracteres.");

            RuleFor(client => client.Email)
                .NotEmpty().WithMessage("E-Mail é obrigatório.")
                .EmailAddress().WithMessage("E-Mail inválido.")
                .MaximumLength(150).WithMessage("E-Mail deve ter no máximo 150 caracteres.");

            RuleFor(client => client.Phone)
                .NotEmpty().WithMessage("Telefone é obrigatório.")
                .Matches(@"^\d{1,11}$").WithMessage("Telefone deve conter apenas números e ter no máximo 11 dígitos.");

            // Validação da área de Informações Pessoais
            RuleFor(client => client.ClientType)
                .IsInEnum().WithMessage("Tipo de Pessoa é obrigatório e deve ser Física ou Jurídica.");

            RuleFor(client => client.CpfCnpj)
                .NotEmpty().WithMessage("CPF/CNPJ é obrigatório.")
                .Must((client, cpfCnpj) => BeValidCpfOrCnpj(cpfCnpj, client.ClientType))
                .WithMessage("CPF/CNPJ inválido.");

            RuleFor(client => client.StateRegistration)
                .NotEmpty().WithMessage("Inscrição Estadual é obrigatória.")
                .When(client => client.ClientType == ClientType.Corporate ||
                                (client.ClientType == ClientType.Individual && !client.IsStateRegistrationExempt))
                .Matches(@"^\d{3}\.\d{3}\.\d{3}\-\d{3}$").WithMessage("Inscrição Estadual deve seguir o formato ###.###.###-###.")
                .When(client => !client.IsStateRegistrationExempt);

            RuleFor(client => client.Gender)
                .NotNull().WithMessage("Gênero é obrigatório para Pessoa Física.")
                .When(client => client.ClientType == ClientType.Individual);

            RuleFor(client => client.BirthDate)
                .NotNull().WithMessage("Data de Nascimento é obrigatória para Pessoa Física.")
                .When(client => client.ClientType == ClientType.Individual);

            // Validação da área de Senha de Acesso
            RuleFor(client => client.Password)
                .NotEmpty().WithMessage("Senha é obrigatória.")
                .MinimumLength(8).WithMessage("Senha deve ter no mínimo 8 caracteres.")
                .MaximumLength(15).WithMessage("Senha deve ter no máximo 15 caracteres.");

            // Validação da situação do cliente
            RuleFor(client => client.IsBlocked)
                .NotNull().WithMessage("Situação do Cliente é obrigatória.");
        }

        private bool BeValidCpfOrCnpj(string cpfCnpj, ClientType clientType)
        {
            if (string.IsNullOrEmpty(cpfCnpj))
            {
                return false;
            }

            string cleanCpfCnpj = Regex.Replace(cpfCnpj, @"[^\d]", "");

            if (clientType == ClientType.Individual)
            {
                return cleanCpfCnpj.Length == 11 && IsValidCpf(cleanCpfCnpj);
            }
            else if (clientType == ClientType.Corporate)
            {
                return cleanCpfCnpj.Length == 14 && IsValidCnpj(cleanCpfCnpj);
            }

            return false;
        }

        private bool IsValidCpf(string cpf)
        {
            // Verifica o formato do CPF com máscara ###.###.###-##
            string cpfWithMask = Regex.Replace(cpf, @"(\d{3})(\d{3})(\d{3})(\d{2})", "$1.$2.$3-$4");
            return Regex.IsMatch(cpfWithMask, @"^\d{3}\.\d{3}\.\d{3}\-\d{2}$");
        }

        private bool IsValidCnpj(string cnpj)
        {
            // Verifica o formato do CNPJ com máscara ##.###.###/####-##
            string cnpjWithMask = Regex.Replace(cnpj, @"(\d{2})(\d{3})(\d{3})/(\d{4})(\d{2})", "$1.$2.$3/$4-$5");
            return Regex.IsMatch(cnpjWithMask, @"^\d{2}\.\d{3}\.\d{3}/\d{4}\-\d{2}$");
        }
    }
}


