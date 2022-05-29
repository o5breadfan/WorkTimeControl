using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorkTime.Data.Models;
using WorkTime.Services;
using WorkTime.ViewModel.Request;

namespace WorkTime.Controllers
{
    [ApiController]
    [Route("request")]
    public class RequestController : Controller
    {
        private readonly Lazy<IMapper> _mapper;
        private readonly Lazy<IRequestService> _requestService;

        public RequestController(Lazy<IMapper> mapper,
            Lazy<IRequestService> requestService)
        {
            _mapper = mapper;
            _requestService = requestService;
        }

        [HttpGet("getRequests")]
        public IActionResult GetRequests()
        {
            return new JsonResult(_requestService.Value.GetAll());
        }

        [HttpGet("getRequest/{requestId}")]
        public async Task<IActionResult> GetRequest([FromRoute] long? requestId, CancellationToken cancellationToken)
        {
            return new JsonResult(await _requestService.Value.GetRequestByIdAsync(requestId, cancellationToken));
        }
        
        [HttpPost("addRequest")]
        public async Task<IActionResult> AddRequest([FromBody]RequestEditViewModel viewModel, CancellationToken cancellationToken)
        {
            viewModel.EndDate ??= viewModel.StartDate;

            var model = _mapper.Value.Map<Request>(viewModel);

            return Ok(await _requestService.Value.CreateAsync(model, cancellationToken));
        }
        
        [HttpPost("update/{requestId}")]
        public async Task<IActionResult> Update(long? requestId, [FromBody]RequestEditViewModel viewModel, CancellationToken cancellationToken)
        {
            viewModel.EndDate ??= viewModel.StartDate;
            
            var model = _mapper.Value.Map<Request>(viewModel);

            return Ok(await _requestService.Value.UpdateAsync(requestId, model, cancellationToken));
        }
    }
}