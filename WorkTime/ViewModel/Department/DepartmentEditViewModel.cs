using System;
using System.ComponentModel.DataAnnotations;

namespace WorkTime.ViewModel.Department
{
    public class DepartmentEditViewModel
    {
        [Required]
        public string Name { get; set; }
        
        public long? HeadId { get; set; }
        
        public DateTime? CreateDate { get; set; }
    }
}