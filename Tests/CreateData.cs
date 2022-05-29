using System;
using System.Threading;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using WorkTime.Data;
using WorkTime.Data.Enums;
using WorkTime.Data.Models;
using WorkTime.ServiceModels;
using WorkTime.Services.Implementation;
using Xunit;

namespace Tests
{
    public class CreateData
    {
        private const string ConnectionString = @"Server=.;Database=WorkTime;Trusted_Connection=True;MultipleActiveResultSets=true";

        private readonly CancellationToken _cancellationToken;
        private readonly DepartmentService _departmentService;
        private readonly UserService _userService;

        public CreateData()
        {
            var context = CreateContext();;
            var httpContextAccessor = new HttpContextAccessor();

            _cancellationToken = new CancellationToken();
            _userService = new UserService(context, httpContextAccessor);
            _departmentService = new DepartmentService(context, _userService);
        }

        private static ApplicationContext CreateContext()
            => new(
                new DbContextOptionsBuilder<ApplicationContext>()
                    .UseSqlServer(ConnectionString)
                    .Options);

        [Fact]
        public async void CreateAdmin()
        {
            var user = new User
            {
                Surname = "Администратор",
                Name = "Системы",
                Login = "admin@mail.ru",
                StartDate = DateTime.UtcNow
            };

            user.SetRole(RoleType.Admin);

            await _userService.CreateAsync(user, _cancellationToken);
        }

        [Fact]
        public async void CreateDepartment()
        {
            var department = new DepartmentModel
            {
                Name = "Отдел 1",
                CreateDate = DateTime.UtcNow
            };

            await _departmentService.CreateAsync(department, _cancellationToken);
        }

        [Fact]
        public async void CreateUser()
        {
            var department = await _departmentService.GetByNameAsync("Отдел 1", _cancellationToken);

            var user = new User
            {
                Surname = "Пользователь",
                Name = "1",
                Login = "user1@mail.ru",
                StartDate = DateTime.UtcNow,
                DepartmentId = department.Id
            };

            user.SetRole(RoleType.HeadOfDepartment);

            await _userService.CreateAsync(user, _cancellationToken);
        }
    }
}