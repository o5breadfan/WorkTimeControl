using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System;
using bcrypt = BCrypt.Net.BCrypt;

namespace WorkTime.Services.Implementation
{
    public class AuthorizationService : IAuthorizationService
    {
        public bool VerifyPassword(string password, byte[] storedSalt, long? storedHashIterations, byte[] storedPassword)
        {
            var hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: storedSalt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: (int) storedHashIterations!.Value,
                numBytesRequested: 256 / 8));
            
            return hashedPassword == Convert.ToBase64String(storedPassword);
        }
    }
}