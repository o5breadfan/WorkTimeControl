using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WorkTime.Data.Models;
using WorkTime.ServiceModels;
using WorkTime.ViewModel.User;

namespace WorkTime.Services
{
    public interface IUserService
    {
        IEnumerable<User> GetAll();

        IEnumerable<UserDictionaryModel> GetAllName();

        Task<User> GetByLoginAsync(string login, CancellationToken cancellationToken);

        Task<User> GetByIdAsync(long? userId, CancellationToken cancellationToken);

        Task<User> CreateAsync(User user, CancellationToken cancellationToken);

        Task<User> UpdateAsync(UserEditViewModel updatedUser, long userId, CancellationToken cancellationToken);

        Task<bool> DeleteAsync(long? userId, CancellationToken cancellationToken);

        Task<User> ChangePasswordAsync(string newPassword, CancellationToken cancellationToken);

        Task<User> GetHeadByDepartmentAsync(long? departmentId, CancellationToken cancellationToken);
        
        Task<User> GetCurrentUser(CancellationToken cancellationToken);

        Task<User> DismissedUser(string userLogin, CancellationToken cancellationToken);
    }
}