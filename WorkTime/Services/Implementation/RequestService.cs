using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using WorkTime.Data;
using WorkTime.Data.Enums;
using WorkTime.Data.Models;

namespace WorkTime.Services.Implementation
{
    public class RequestService : IRequestService
    {
        private readonly ApplicationContext _context;
        private readonly Lazy<IUserService> _userService;

        public RequestService(ApplicationContext context,
            Lazy<IUserService> userService)
        {
            _context = context;
            _userService = userService;
        }

        public IEnumerable<Request> GetAll()
        {
            return _context.Requests
                .Include(x => x.RequestStatus)
                .Include(x => x.RequestType)
                .Include(x => x.Approving)
                .Include(x => x.User);
        }

        public async Task<Request> GetByIdAsync(long? requestId, CancellationToken cancellationToken)
        {
            return await _context.Requests.FirstOrDefaultAsync(request => request.Id == requestId, cancellationToken);
        }

        public async Task<Request> GetRequestByIdAsync(long? id, CancellationToken cancellationToken)
        {
            if (id == null)
            {
                throw new ArgumentNullException(nameof(id));
            }

            return await _context.Requests
                .Include(request => request.Approving)
                .Include(request => request.User)
                .Include(request => request.RequestStatus)
                .Include(request => request.RequestType)
                .FirstOrDefaultAsync(request => request.Id == id, cancellationToken);
        }

        public async Task<Request> CreateAsync(Request request, CancellationToken cancellationToken)
        {
            request.CreateDate = DateTime.UtcNow;
            request.SetStatus(RequestStatus.New);

            var user = await _userService.Value.GetCurrentUser(cancellationToken);
            
            request.UserId = user.Id;

            var approving = await _userService.Value.GetHeadByDepartmentAsync(user.DepartmentId, cancellationToken);
            
            request.ApprovingId = approving.Id;

            _context.Requests.Add(request);
            await _context.SaveChangesAsync(cancellationToken);

            return request;
        }

        public async Task<Request> UpdateAsync(long? requestId, Request request, CancellationToken cancellationToken)
        {
            if (requestId == null)
            {
                throw new ArgumentNullException(nameof(requestId));
            }
            
            var requestUpdate = await GetByIdAsync(requestId, cancellationToken);

            if (!string.Equals(request.Description, requestUpdate.Description))
            {
                requestUpdate.Description = request.Description;
            }

            if (request.StartDate != requestUpdate.StartDate)
            {
                requestUpdate.StartDate = request.StartDate;
            }

            if (request.EndDate != requestUpdate.EndDate)
            {
                requestUpdate.EndDate = request.EndDate;
            }

            if (request.RescheduleVacation != requestUpdate.RescheduleVacation)
            {
                requestUpdate.RescheduleVacation = request.RescheduleVacation;
            }

            _context.Requests.Update(requestUpdate);
            await _context.SaveChangesAsync(cancellationToken);

            return requestUpdate;
        }
    }
}