using System;
using System.ComponentModel.DataAnnotations;

namespace WorkTime.Data.Models
{
    public class Department
    {
        public virtual long Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public virtual string Name { get; set; }
        
        [Required]
        public virtual DateTime? CreateDate { get; set; }
    }
}