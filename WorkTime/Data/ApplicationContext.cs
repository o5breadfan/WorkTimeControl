using Microsoft.EntityFrameworkCore;
using WorkTime.Data.Dictionaries;
using WorkTime.Data.Models;

namespace WorkTime.Data
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            //
        }

        public DbSet<User> Users { get; set; }
        
        public DbSet<Role> Roles { get; set; }
        
        public DbSet<Department> Departments { get; set; }
        
        public DbSet<RequestType> RequestTypes { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<RequestStatus> RequestStatuses { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<Role>().ToTable("Role");
            modelBuilder.Entity<Department>().ToTable("Department");
            modelBuilder.Entity<RequestType>().ToTable("RequestType");
            modelBuilder.Entity<Request>().ToTable("Request");
            modelBuilder.Entity<RequestStatus>().ToTable("RequestStatus");
        }
    }
}