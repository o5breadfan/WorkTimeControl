using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkTime.ServiceModels;
using WorkTime.Services;
using WorkTime.ViewModel.Department;

namespace WorkTime.Controllers
{
    [ApiController]
    [Route("department")]
    public class DepartmentController : Controller
    {
        private readonly Lazy<IDepartmentService> _departmentService;
        private readonly Lazy<IMapper> _mapper;
        private readonly Lazy<IUserService> _userService;

        public DepartmentController(Lazy<IDepartmentService> departmentService,
            Lazy<IMapper> mapper,
            Lazy<IUserService> userService)
        {
            _departmentService = departmentService;
            _mapper = mapper;
            _userService = userService;
        }
        
        [AllowAnonymous]
        [HttpGet("getDepartments")]
        public IActionResult GetDepartments()
        {
            var departments = _departmentService.Value.GetAll();
            
            return new JsonResult(departments);
        }
        
        [HttpGet("getDepartmentsDetail")]
        public IActionResult GetDepartmentsDetail()
        {
            var departments = _departmentService.Value.GetAllDetail();

            return new JsonResult(departments);
        }
        
        [AllowAnonymous]
        [HttpPost("add")]
        public async Task<IActionResult> Add(DepartmentEditViewModel viewModel, CancellationToken cancellationToken)
        {
            viewModel.CreateDate = DateTime.UtcNow;
            
            var model = new DepartmentModel();

            _mapper.Value.Map(viewModel, model);

            if (viewModel.HeadId != null)
            {
                model.Head = await _userService.Value.GetByIdAsync(viewModel.HeadId, cancellationToken);
            }
            
            return Created("success" ,await _departmentService.Value.CreateAsync(model, cancellationToken));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> Delete([FromBody]long? id, CancellationToken cancellationToken)
        {
            await _departmentService.Value.DeleteAsync(id, cancellationToken);
            
            return Ok(new { message = "Success deleted" });
        }
    }
}