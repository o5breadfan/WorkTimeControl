using System.ComponentModel.DataAnnotations;

namespace WorkTime.Data.Dictionaries
{
    public class Role
    {
        public virtual long Id { get; set; }
        
        [Required]
        [StringLength(100)]
        public virtual string Name { get; set; }
    }
}