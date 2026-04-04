using JiraClone.Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace JiraClone.Backend.Data
{
    public class JiraCloneDbContext : DbContext
    {
        public JiraCloneDbContext(DbContextOptions<JiraCloneDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<Issue> Issues { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            // Unique Username/Email
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Username)
                .IsUnique();
                
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
