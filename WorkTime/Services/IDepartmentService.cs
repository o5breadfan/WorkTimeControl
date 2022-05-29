using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WorkTime.Data.Models;
using WorkTime.ServiceModels;

namespace WorkTime.Services
{
    public interface IDepartmentService
    {
        IEnumerable<Department> GetAll();

        IEnumerable<DepartmentModel> GetAllDetail();

        Task<Department> GetByNameAsync(string name, CancellationToken cancellationToken);

        Task<DepartmentModel> CreateAsync(DepartmentModel department, CancellationToken cancellationToken);

        Task<Department> GetByIdAsync(long? id, CancellationToken cancellationToken);

        Task<DepartmentModel> GetDetailByIdAsync(long? id, CancellationToken cancellationToken);

        Task DeleteAsync(long? id, CancellationToken cancellationToken);
    }
}