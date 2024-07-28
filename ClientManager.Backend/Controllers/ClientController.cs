using AutoMapper;
using ClientManager.Backend.DTOs;
using ClientManager.Backend.Entities;
using ClientManager.Backend.Services;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace ClientManager.Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IValidator<ClientDTO> _clientValidator;
        private readonly IClientService _clientService;
        private readonly IMapper _mapper;

        public ClientController(IValidator<ClientDTO> clientValidator, IClientService clientService, IMapper mapper)
        {
            _clientValidator = clientValidator;
            _clientService = clientService;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("GetAllClients")]
        public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
        {
            try
            {
                var clients = await _clientService.GetAllClients();

                return Ok(clients);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("CreateClient")]
        public async Task<IActionResult> CreateClient([FromBody] ClientDTO clientDto)
        {
            try
            {
                var validationResult = await _clientValidator.ValidateAsync(clientDto);

                if (!validationResult.IsValid)
                {
                    return BadRequest(validationResult.Errors);
                }

                Client client = _mapper.Map<Client>(clientDto);

                await _clientService.UpsertClient(client);

                return Ok("Cliente criado com sucesso");

            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }            
        }

        [HttpPut]
        [Route("UpdateClient/{id}")]
        public async Task<IActionResult> UpdateClient([FromBody] ClientDTO clientDto, int id)
        {
            try
            {
                var validationResult = await _clientValidator.ValidateAsync(clientDto);

                if (!validationResult.IsValid)
                {
                    return BadRequest(validationResult.Errors);
                }

                var client = await _clientService.GetById(id);

                if (client == null)
                {
                    return NotFound("Cliente não encontrado.");
                }

                _mapper.Map(clientDto, client);

                await _clientService.UpsertClient(client);

                return Ok("Cliente atualizado com sucesso");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("DeleteClient/{id}")]
        public async Task<IActionResult> DeleteClient(int id)
        {
            try
            {
                var client = await _clientService.GetById(id);

                if (client == null)
                {
                    return NotFound();
                }

                await _clientService.DeleteClient(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
