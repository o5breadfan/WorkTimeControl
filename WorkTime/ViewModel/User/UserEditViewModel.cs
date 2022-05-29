using System;

namespace WorkTime.ViewModel.User
{
    public class UserEditViewModel
    {
        public string Surname { get; set; }
        
        public string Name { get; set; }
        
        public long RoleId { get; set; }
                
        public long? DepartmentId { get; set; }
        
        public DateTime? StartDate { get; set; }
        
        public string Login { get; set; }
    }
}