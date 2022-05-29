using System;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkTime.Data.Models;
using WorkTime.Helpers;
using WorkTime.Services;
using WorkTime.ViewModel.User;

namespace WorkTime.Controllers
{
    [ApiController]
    [Route("user")]
    public class UserController : Controller
    {
        private readonly Lazy<IUserService> _userService;
        private readonly Lazy<IMapper> _mapper;

        public UserController(Lazy<IUserService> userService,
            Lazy<IMapper> mapper)
        {
            _mapper = mapper;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("addUser")]
        public async Task<IActionResult> AddUser([FromBody] UserEditViewModel viewModel, CancellationToken cancellationToken)
        {
            var user = _mapper.Value.Map<User>(viewModel);
            
            return Created("success" , await _userService.Value.CreateAsync(user, cancellationToken));
        }

        [HttpPost("update/{userId}")]
        public async Task<IActionResult> Update([FromRoute] long userId, [FromBody] UserEditViewModel updatedUser, CancellationToken cancellationToken)
        {
            return new JsonResult(await _userService.Value.UpdateAsync(updatedUser, userId, cancellationToken));
        }

        [HttpPost("delete/{userId}")]
        public async Task<IActionResult> Delete([FromRoute] long userId, CancellationToken cancellationToken)
        {
            await _userService.Value.DeleteAsync(userId, cancellationToken);
            return new JsonResult($"deleted user with id = {userId}");
        }

        [HttpGet("getUser/{id}")]
        public async Task<User> GetUser([FromRoute] long id, CancellationToken cancellationToken)
        {
            return await _userService.Value.GetByIdAsync(id, cancellationToken);
        }

        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            return new JsonResult(_userService.Value.GetAll());
        }

        [HttpGet("getAllName")]
        public IActionResult GetAllName()
        {
            return new JsonResult(_userService.Value.GetAllName());
        }

        [HttpPost("changePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] string newPassword, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(newPassword))
            {
                throw new ArgumentNullException(nameof(newPassword));
            }

            return Ok(await _userService.Value.ChangePasswordAsync(newPassword, cancellationToken));
        }

        [HttpPost("dismissed")]
        public async Task<User> DismissedUser([FromBody] string userLogin, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(userLogin))
                throw new ArgumentNullException(nameof(userLogin));

            return await _userService.Value.DismissedUser(userLogin, cancellationToken);
        }
    }
}