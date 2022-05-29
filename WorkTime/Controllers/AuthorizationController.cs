using System;
using System.Linq;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkTime.Helpers;
using WorkTime.Services;
using WorkTime.ViewModel;
using IAuthorizationService = WorkTime.Services.IAuthorizationService;

namespace WorkTime.Controllers
{
    [Route("authorization")]
    public class AuthorizationController : Controller
    {
        private readonly Lazy<IAuthorizationService> _authorizationService;
        private readonly Lazy<IUserService> _userService;
        private readonly Lazy<IJwtService> _jwtService;

        public AuthorizationController(Lazy<IAuthorizationService> authorizationService, 
            Lazy<IUserService> userService, 
            Lazy<IJwtService> jwtService)
        {
            _authorizationService = authorizationService;
            _userService = userService;
            _jwtService = jwtService;
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel userModel, CancellationToken cancellationToken)
        {
            var user = await _userService.Value.GetByLoginAsync(userModel.Login, cancellationToken);

            if(user == null || !_authorizationService.Value.VerifyPassword(userModel.Password, user.Salt, user.HashIterations, user.Password))
                return BadRequest(new { message = "Username or password incorrect" });


            var jwt = _jwtService.Value.Generate(user);

            Response.Cookies.Append("jwt", jwt, new Microsoft.AspNetCore.Http.CookieOptions());

            return Ok(new {message = "Success", user});
        }

        [HttpGet("authenticate")]
        public async Task<IActionResult> AuthenticateUser(CancellationToken cancellationToken)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                var token = _jwtService.Value.Verify(jwt);
                var login = token.Claims.FirstOrDefault(claim => claim.Type == ClaimTypes.Email)?.Value;
                var user = await _userService.Value.GetByLoginAsync(login, cancellationToken);
                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new { message = "Success delete" });
        }
    }
}