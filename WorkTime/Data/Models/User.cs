using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using WorkTime.Data.Dictionaries;
using WorkTime.Data.Enums;

namespace WorkTime.Data.Models
{
    [Table("Users")]
    public class User 
    {
        public virtual long Id { get; set; }
        
        [Required]
        [StringLength(255)]
        public virtual string Login { get; set; }

        [Required]
        [JsonIgnore]
        [MaxLength(100)]
        public virtual byte[] Password { get; set; }
        
        [Required]
        [JsonIgnore]
        [MaxLength(100)]
        public virtual byte[] Salt { get; set; }
        
        [JsonIgnore]
        public virtual long? HashIterations { get; set; }

        [Required]
        [StringLength(100)]
        public virtual string Surname { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        
        public virtual long RoleId  { get; set; }
        
        public virtual Role Role { get; set; }
        
        public virtual long? DepartmentId { get; set; }
        
        public virtual Department Department { get; set; }
        
        public virtual DateTime? StartDate { get; set; }

        public virtual long? UnusedDaysLastYears { get; set; }
        
        public virtual bool? Dismissed { get; set; }
        
        public virtual DateTime? DismissalDate { get; set; }

        public string GetFullName()
        {
            return Surname + " " + Name;
        }

        public void SetRole(RoleType role)
        {
            RoleId = (long)role;
        }

        public RoleType GetRole()
        {
            return (RoleType)RoleId;
        }
    }
}