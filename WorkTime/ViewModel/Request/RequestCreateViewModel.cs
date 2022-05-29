using System;

namespace WorkTime.ViewModel.Request
{
    public class RequestEditViewModel
    {
        public long RequestTypeId { get; set; } 
        
        public DateTime StartDate { get; set; }
        
        public DateTime? EndDate { get; set; }
        
        public string Description { get; set; }
        
        public bool? RescheduleVacation { get; set; }
        
        public DateTime? WorkingOutDate { get; set; }
    }
}