using System.ComponentModel.DataAnnotations;

namespace WorkTime.Data.Dictionaries
{
    public class RequestStatus
    {
        public virtual long Id { get; set; }

        [Required]
        [MaxLength(100)]
        public virtual string Name { get; set; }
    }
}
