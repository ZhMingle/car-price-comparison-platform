using CarPriceComparison.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarPriceComparison.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // 可以在这里配置更多的表和列映射
        modelBuilder.Entity<User>().ToTable("sys_user");
    }
}