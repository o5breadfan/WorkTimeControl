using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using WorkTime.Data;
using WorkTime.Data.Models;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WorkTime.Data.Enums;
using WorkTime.ServiceModels;
using WorkTime.ViewModel.User;

namespace WorkTime.Services.Implementation
{
    public class UserService : IUserService
    {
        private readonly ApplicationContext _context;
        private readonly IHttpContextAccessor _httpContextAccessor;
        public UserService(ApplicationContext context,
                           IHttpContextAccessor httpContextAccessor)
        {
            _context = context;
            _httpContextAccessor = httpContextAccessor;
        }

        public IEnumerable<User> GetAll()
        {
            var users = _context.Users.Include(x => x.Role)
                .Include(x => x.Department);
            return users;
        }

        public IEnumerable<UserDictionaryModel> GetAllName()
        {
            var users = GetAll()
                .Where(u => u.Dismissed != true)
                .Where(u => u.RoleId != (long)RoleType.Admin);

            return users.Select(user => new UserDictionaryModel
            {
                Id = user.Id,
                Name = user.GetFullName()
            });
        }

        public async Task<User> GetByLoginAsync(string login, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(login))
            {
                throw new ArgumentNullException(nameof(login));
            }
            
            return await _context.Users
                .Include(x => x.Role)
                .Include(x => x.Department)
                .FirstOrDefaultAsync(x => x.Login == login, cancellationToken);
        }

        public async Task<User> CreateAsync(User user, CancellationToken cancellationToken)
        {
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }

            if (await GetByLoginAsync(user.Login, cancellationToken) != null)
            {
                throw new Exception("Пользователь с таким e-mail уже существует!");
            }

            user.StartDate ??= DateTime.UtcNow;

            CreateUserCredentials(user);
            
            _context.Users.Add(user);
            await _context.SaveChangesAsync(cancellationToken);
            
            return user;
        }

        public async Task<User> UpdateAsync(UserEditViewModel updatedUser, long userId, CancellationToken cancellationToken)
        {
            var user = await _context.Users.Where(x => x.Id == userId).FirstOrDefaultAsync(cancellationToken);
            
            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            
            user.StartDate = updatedUser.StartDate;
            user.Surname = updatedUser.Surname;
            user.Name = updatedUser.Name;
            user.RoleId = updatedUser.RoleId;
            user.DepartmentId = updatedUser.DepartmentId!.Value;
            user.Login = updatedUser.Login;
            
            await _context.SaveChangesAsync(cancellationToken);
            return user;

        }

        public async Task<bool> DeleteAsync(long? userId, CancellationToken cancellationToken)
        {
            if (userId == null)
            {
                throw new InvalidDataException();
            }

            var user = _context.Users.FirstOrDefaultAsync(user => user.Id == userId, cancellationToken);
            
            if(user.Result == null)
            {
                throw new Exception("Пользователь не найден!");
            }
            
            _context.Users.Remove(user.Result);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        public async Task<User> ChangePasswordAsync(string newPassword, CancellationToken cancellationToken)
        {
            if (string.IsNullOrEmpty(newPassword))
            {
                throw new ArgumentNullException(nameof(newPassword));
            }

            var user = await GetCurrentUser(cancellationToken);

            if (user == null)
            {
                throw new ArgumentNullException(nameof(user));
            }
            
            user.Salt = GeneratePasswordSalt();
            user.HashIterations = GeneratePasswordHashIterations();
            user.Password = HashPassword(newPassword, user.Salt, user.HashIterations.Value);

            await _context.SaveChangesAsync(cancellationToken);
            return user;
        }

        public async Task<User> DismissedUser(string userLogin, CancellationToken cancellationToken)
        {
            var user = await GetByLoginAsync(userLogin, cancellationToken);
            user.Dismissed = true;
            await _context.SaveChangesAsync(cancellationToken);
            return user;
        }

        public async Task<User> GetByIdAsync(long? userId, CancellationToken cancellationToken)
        {
            if (userId == null)
            {
                throw new ArgumentNullException(nameof(userId));
            }
            
            return await _context.Users.Include(x => x.Role).Include(x => x.Department).FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);
            
        }

        public async Task<User> GetHeadByDepartmentAsync(long? departmentId, CancellationToken cancellationToken)
        {
            if (departmentId == null)
            {
                throw new ArgumentNullException(nameof(departmentId));
            }
            
            return await _context.Users.Where(user => user.DepartmentId == departmentId)
                .FirstOrDefaultAsync(user => user.RoleId == (int)RoleType.HeadOfDepartment, cancellationToken);
        }

        private static void CreateUserCredentials(User user)
        {
            user.Salt = GeneratePasswordSalt();
            user.HashIterations = GeneratePasswordHashIterations();
            user.Password = HashPassword("1234567890", user.Salt, user.HashIterations.Value);
        }

        private static byte[] GeneratePasswordSalt()
        {
            return Guid.NewGuid().ToByteArray();
        }
        
        private static long GeneratePasswordHashIterations()
        {
            var bytes = new byte[4];
            var rng = new RNGCryptoServiceProvider();
            rng.GetNonZeroBytes(bytes);
            return Math.Abs(BitConverter.ToInt32(bytes, 0) % 10000);
        }

        private static byte[] HashPassword(string password, byte[] salt, long hashIterations)
        {
            if (password == null)
            {
                throw new ArgumentNullException(nameof(password));
            }

            if (salt == null)
            {
                throw new ArgumentNullException(nameof(salt));
            }
            
            return  KeyDerivation.Pbkdf2(
                password,
                salt,
                KeyDerivationPrf.HMACSHA256,
                (int) hashIterations,
                256 / 8);
        }

        public async Task<User> GetCurrentUser(CancellationToken cancellationToken)
        {
            var identity = _httpContextAccessor.HttpContext!.User.Identity as ClaimsIdentity;

            if (identity == null)
            {
                return null;
            }
            
            var userClaims = identity.Claims;
            var enumerable = userClaims as Claim[] ?? userClaims.ToArray();
            var login = enumerable.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value;
            
            return await GetByLoginAsync(login, cancellationToken);
        }
    }
}