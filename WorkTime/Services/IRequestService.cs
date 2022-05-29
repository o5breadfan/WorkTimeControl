using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using WorkTime.Data.Models;

namespace WorkTime.Services
{
    public interface IRequestService
    {
        IEnumerable<Request> GetAll();

        Task<Request> GetByIdAsync(long? id, CancellationToken cancellationToken);
        
        Task<Request> GetRequestByIdAsync(long? id, CancellationToken cancellationToken);

        Task<Request> CreateAsync(Request request, CancellationToken cancellationToken);

        Task<Request> UpdateAsync(long? requestId, Request request, CancellationToken cancellationToken);
    }
}