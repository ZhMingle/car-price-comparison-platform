using CarPriceComparison.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarPriceComparison.API.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Vehicle> Vehicles { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        // Mapping between tables and objects
        modelBuilder.Entity<User>().ToTable("auto_user");
        modelBuilder.Entity<Vehicle>().ToTable("auto_vehicle");
    }
}