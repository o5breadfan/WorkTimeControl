using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WorkTime.Data.Dictionaries;

namespace WorkTime.Data.Models
{
    [Table("Request")]
    public class Request
    {
        public virtual long Id { get; set; }
        
        [Required]
        public virtual long RequestTypeId { get; set; }
        
        public RequestType RequestType { get; set; }
        
        [Required]
        public virtual long UserId { get; set; }
        
        public User User { get; set; }
        
        [Required]
        public virtual DateTime CreateDate { get; set; }
        
        public virtual DateTime? SendDate { get; set; }
        
        [Required]
        public virtual DateTime StartDate { get; set; }
        
        [Required]
        public virtual DateTime EndDate { get; set; }
        
        [Required]
        public virtual long ApprovingId { get; set; }
        
        public User Approving { get; set; }
        
        [Required]
        public virtual long RequestStatusId { get; set; }
        
        public RequestStatus RequestStatus { get; set; }
        
        public virtual string Description { get; set; }
        
        public virtual bool? RescheduleVacation { get; set; }
        
        public virtual DateTime? WorkingOutDate { get; set; }

        public void SetStatus(Enums.RequestStatus status)
        {
            RequestStatusId = (int) status;
        }

        public Enums.RequestStatus GetStatus()
        {
            return (Enums.RequestStatus) RequestStatusId;
        }
    }
}
