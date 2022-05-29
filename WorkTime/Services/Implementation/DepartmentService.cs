using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkTime.Data;
using WorkTime.Data.Enums;
using WorkTime.Data.Models;
using WorkTime.ServiceModels;

namespace WorkTime.Services.Implementation
{
    public class DepartmentService : IDepartmentService
    {
        private readonly ApplicationContext _context;
        private readonly IUserService _userService;
            
        public DepartmentService(ApplicationContext context,
            IUserService userService)
        {
            _context = context;
            _userService = userService;
        }
        
        public IEnumerable<Department> GetAll()
        {
            var departments = _context.Departments;
            return departments;
        }

        public IEnumerable<DepartmentModel> GetAllDetail()
        {
            var users = _context.Users
                .Where(u => u.RoleId == (long) RoleType.HeadOfDepartment)
                .Where(u => u.Dismissed != true);
            
            var departmentsDetail = GetAll()
                .GroupJoin(users,
                department =>  department.Id,
                user => user.DepartmentId,
                (department, user) => new DepartmentModel()
                {
                    Id = department.Id,
                    Head = user.FirstOrDefault(),
                    CreateDate = department.CreateDate,
                    Name = department.Name
                });
            
            return departmentsDetail;
        }

        public async Task<Department> GetByNameAsync(string name, CancellationToken cancellationToken)
        {
            var department = await _context.Departments.FirstOrDefaultAsync(d => d.Name == name, cancellationToken);
            return(department);
        }

        public async Task<DepartmentModel> CreateAsync(DepartmentModel model, CancellationToken cancellationToken)
        {
            if (model == null)
            {
                throw new ArgumentNullException(nameof(model));
            }

            if (await GetByNameAsync(model.Name, cancellationToken) != null)
            {
                throw new Exception("Отдел с таким наименованием уже существует!");
            }

            var department = new Department
            {
                Name = model.Name,
                CreateDate = model.CreateDate
            };

            _context.Departments.Add(department);
            await _context.SaveChangesAsync(cancellationToken);
            
            if (model.Head != null)
            {
                var user = await _userService.GetByIdAsync(model.Head.Id, cancellationToken);
                if (user.RoleId == (long) RoleType.Employee)
                {
                    user.SetRole(RoleType.HeadOfDepartment);
                }

                if (user.DepartmentId != department.Id)
                {
                    user.DepartmentId = department.Id;
                }
                
                _context.Users.Update(user);
                await _context.SaveChangesAsync(cancellationToken);
            }

            var departmentModel = await GetDetailByIdAsync(department.Id, cancellationToken);
            return departmentModel;
        }

        public async Task<DepartmentModel> GetDetailByIdAsync(long? id, CancellationToken cancellationToken)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            var department = await GetByIdAsync(id, cancellationToken);

            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }
            
            var user = await _userService.GetHeadByDepartmentAsync(id, cancellationToken);

            var departmentModel = new DepartmentModel
            {
                Id = department.Id,
                Name = department.Name,
                Head = user,
                CreateDate = department.CreateDate
            };

            return departmentModel;
        }

        public async Task<Department> GetByIdAsync(long? id, CancellationToken cancellationToken)
        {
            if (id == null)
            {
                return null;
            }
            
            return await _context.Departments.FirstOrDefaultAsync(department => department.Id == id, cancellationToken);
        }

        public async Task DeleteAsync(long? id, CancellationToken cancellationToken)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }
            
            var department = await GetByIdAsync(id, cancellationToken);

            if (department == null)
            {
                throw new ArgumentNullException(nameof(department));
            }

            _context.Departments.Remove(department);
            await _context.SaveChangesAsync(cancellationToken);
        }
    }
}