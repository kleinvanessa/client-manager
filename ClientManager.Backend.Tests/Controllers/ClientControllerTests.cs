using AutoMapper;
using ClientManager.Backend.Controllers;
using ClientManager.Backend.DTOs;
using ClientManager.Backend.Entities;
using ClientManager.Backend.Services;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace ClientManager.Tests
{
    public class ClientControllerTests
    {
        private readonly Mock<IValidator<ClientDTO>> _mockValidator;
        private readonly Mock<IClientService> _mockClientService;
        private readonly Mock<IMapper> _mockMapper;
        private readonly ClientController _clientController;

        public ClientControllerTests()
        {
            _mockValidator = new Mock<IValidator<ClientDTO>>();
            _mockClientService = new Mock<IClientService>();
            _mockMapper = new Mock<IMapper>();
            _clientController = new ClientController(_mockValidator.Object, _mockClientService.Object, _mockMapper.Object);
        }

        [Fact]
        public async Task GetAllClients_ReturnsOkResult_WithListOfClients()
        {
            // Arrange
            var clients = new List<Client> { new Client() };
            _mockClientService.Setup(service => service.GetAllClients()).ReturnsAsync(clients);

            // Act
            var result = await _clientController.GetAllClients();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(clients, okResult.Value);
        }

        [Fact]
        public async Task GetAllClients_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            _mockClientService
                .Setup(service => service.GetAllClients())
                .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _clientController.GetAllClients();

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result.Result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        [Fact]
        public async Task CreateClient_ReturnsOkResult_WhenClientIsCreated()
        {
            // Arrange
            var clientDto = new ClientDTO();
            var client = new Client();
            var validationResult = new ValidationResult();

            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ReturnsAsync(validationResult);
            _mockMapper
                .Setup(m => m.Map<Client>(clientDto))
                .Returns(client);
            _mockClientService
                .Setup(service => service.UpsertClient(client))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _clientController.CreateClient(clientDto);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Cliente criado com sucesso", okResult.Value);
        }

        [Fact]
        public async Task CreateClient_ReturnsBadRequest_WhenValidationFails()
        {
            // Arrange
            var clientDto = new ClientDTO();
            var validationResult = new ValidationResult(new List<ValidationFailure> { new ValidationFailure("Field", "Error") });

            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ReturnsAsync(validationResult);

            // Act
            var result = await _clientController.CreateClient(clientDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(validationResult.Errors, badRequestResult.Value);
        }

        [Fact]
        public async Task CreateClient_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            var clientDto = new ClientDTO();
            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _clientController.CreateClient(clientDto);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        [Fact]
        public async Task UpdateClient_ReturnsOkResult_WhenClientIsUpdated()
        {
            // Arrange
            var clientDto = new ClientDTO();
            var client = new Client { Id = 1 };
            var validationResult = new ValidationResult();

            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ReturnsAsync(validationResult);
            _mockClientService
                .Setup(service => service.GetById(client.Id))
                .ReturnsAsync(client);
            _mockClientService
                .Setup(service => service.UpsertClient(client))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _clientController.UpdateClient(clientDto, client.Id);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Cliente atualizado com sucesso", okResult.Value);
        }

        [Fact]
        public async Task UpdateClient_ReturnsBadRequest_WhenValidationFails()
        {
            // Arrange
            var clientDto = new ClientDTO();
            var validationResult = new ValidationResult(new List<ValidationFailure> { new ValidationFailure("Field", "Error") });

            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ReturnsAsync(validationResult);

            // Act
            var result = await _clientController.UpdateClient(clientDto, 1);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal(validationResult.Errors, badRequestResult.Value);
        }

        [Fact]
        public async Task UpdateClient_ReturnsNotFound_WhenClientDoesNotExist()
        {
            // Arrange
            var clientDto = new ClientDTO();
            var validationResult = new ValidationResult();

            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ReturnsAsync(validationResult);
            _mockClientService
                .Setup(service => service.GetById(1))
                .ReturnsAsync((Client)null);

            // Act
            var result = await _clientController.UpdateClient(clientDto, 1);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
            Assert.Equal("Cliente não encontrado.", notFoundResult.Value);
        }

        [Fact]
        public async Task UpdateClient_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            var clientDto = new ClientDTO();
            _mockValidator
                .Setup(v => v.ValidateAsync(clientDto, default))
                .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _clientController.UpdateClient(clientDto, 1);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }

        [Fact]
        public async Task DeleteClient_ReturnsOkResult_WhenClientIsDeleted()
        {
            // Arrange
            var client = new Client { Id = 1 };
            _mockClientService
                .Setup(service => service.GetById(client.Id))
                .ReturnsAsync(client);
            _mockClientService
                .Setup(service => service.DeleteClient(client.Id))
                .Returns(Task.CompletedTask);

            // Act
            var result = await _clientController.DeleteClient(client.Id);

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
        }

        [Fact]
        public async Task DeleteClient_ReturnsNotFound_WhenClientDoesNotExist()
        {
            // Arrange
            _mockClientService
                .Setup(service => service.GetById(1))
                .ReturnsAsync((Client)null);

            // Act
            var result = await _clientController.DeleteClient(1);

            // Assert
            var notFoundResult = Assert.IsType<NotFoundResult>(result);
        }

        [Fact]
        public async Task DeleteClient_ReturnsBadRequest_WhenExceptionIsThrown()
        {
            // Arrange
            _mockClientService
                .Setup(service => service.GetById(1))
                .ThrowsAsync(new Exception("Test exception"));

            // Act
            var result = await _clientController.DeleteClient(1);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Test exception", badRequestResult.Value);
        }
    }
}
