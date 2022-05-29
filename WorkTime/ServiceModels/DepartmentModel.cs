using System;
using WorkTime.Data.Models;

namespace WorkTime.ServiceModels
{
    public class DepartmentModel
    {
        public long Id { get; set; }
        
        public string Name { get; set; }
        
        public User Head { get; set; }
        
        public DateTime? CreateDate { get; set; }
    }
}