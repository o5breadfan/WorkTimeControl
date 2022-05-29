using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using WorkTime.Data.Models;
using WorkTime.Helpers.Configuration;

namespace WorkTime.Helpers
{
    public interface IJwtService
    {
        public string Generate(User user);
        public JwtSecurityToken Verify(string jwtToken);
    }

    public class JwtService : IJwtService
    {
        private readonly IOptionsMonitor<Jwt> _jwtConfiguration;
        public JwtService(IOptionsMonitor<Jwt> jwtOptionsMonitor)
        {
            _jwtConfiguration = jwtOptionsMonitor;
        }
        public string Generate(User user)
        {
            var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfiguration.CurrentValue.Key));
            var credentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.Login),
                new Claim(ClaimTypes.Role, user.Role.Name),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Surname, user.Surname)
            };

            var claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                ClaimsIdentity.DefaultRoleClaimType);
            
            var token = new JwtSecurityToken(_jwtConfiguration.CurrentValue.Issuer,_jwtConfiguration.CurrentValue.Audience, claimsIdentity.Claims, expires: DateTime.Now.AddMinutes(15), signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string jwtToken)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfiguration.CurrentValue.Key);
            tokenHandler.ValidateToken(jwtToken, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuerSigningKey = true,
                ValidateIssuer = false,
                ValidateAudience = false
            }, out var validatedToken);
            return (JwtSecurityToken)validatedToken;
        }
    }
}
