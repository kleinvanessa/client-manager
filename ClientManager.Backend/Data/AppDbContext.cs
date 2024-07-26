using ClientManager.Backend.Entities;
using ClientManager.Backend.Enums;
using Microsoft.EntityFrameworkCore;

namespace ClientManager.Backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Client> Clients { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd();

                entity.Property(e => e.Name)
                      .HasMaxLength(150)
                      .IsRequired();

                entity.Property(e => e.Email)
                      .HasMaxLength(150)
                      .IsRequired();

                entity.Property(e => e.Phone)
                      .HasMaxLength(11)
                      .IsRequired();

                entity.Property(e => e.ClientType)
                      .HasConversion(
                        v => (int)v,
                        v => (ClientType)v);

                entity.Property(e => e.CpfCnpj)
                      .HasMaxLength(14)
                      .IsRequired();

                entity.Property(e => e.StateRegistration)
                      .HasMaxLength(12);

                entity.Property(e => e.IsStateRegistrationExempt)
                      .HasDefaultValue(false);

                entity.Property(e => e.Gender)
                      .HasConversion(
                        v => (int)v,
                        v => (Gender)v)
                      .HasDefaultValue(null);

                entity.Property(e => e.BirthDate)
                      .HasDefaultValue(null);

                entity.Property(e => e.IsBlocked)
                      .HasDefaultValue(false);

                entity.Property(e => e.Password)
                      .HasMaxLength(15)
                      .IsRequired();

                entity.Property(e => e.RegistrationDate)
                      .HasDefaultValueSql("GETDATE()")
                      .ValueGeneratedOnAdd();
                
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
