using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using SmartDriver.Domain;
using SmartDriver.Domain.identity;

namespace SmartDriver.Persistence.Contexts
{
    public class SmartDriverContext : IdentityDbContext<User, Role, int,
                                    IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                    IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public SmartDriverContext(DbContextOptions<SmartDriverContext> options) : base(options) { }

        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<Saida> Saidas { get; set; }
        public DbSet<Reserva> Reservas { get; set; }
        public DbSet<Abastecimento> Abastecimentos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            int stringMaxLength = 100;
            // User IdentityRole and IdentityUser in case you haven't extended those classes
            modelBuilder.Entity<Role>(x => x.Property(m => m.Name).HasMaxLength(stringMaxLength));
            modelBuilder.Entity<Role>(x => x.Property(m => m.NormalizedName).HasMaxLength(stringMaxLength));
            modelBuilder.Entity<User>(x => x.Property(m => m.NormalizedUserName).HasMaxLength(stringMaxLength));
            // We are using int here because of the change on the PK
            modelBuilder.Entity<IdentityUserLogin<int>>(x => x.Property(m => m.LoginProvider).HasMaxLength(stringMaxLength));
            modelBuilder.Entity<IdentityUserLogin<int>>(x => x.Property(m => m.ProviderKey).HasMaxLength(stringMaxLength));
            // We are using int here because of the change on the PK
            modelBuilder.Entity<IdentityUserToken<int>>(x => x.Property(m => m.LoginProvider).HasMaxLength(stringMaxLength));
            modelBuilder.Entity<IdentityUserToken<int>>(x => x.Property(m => m.Name).HasMaxLength(stringMaxLength));
            
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<UserRole>(UserRole =>
                {
                    UserRole.HasKey(ur => new
                    {
                        ur.UserId,
                        ur.RoleId
                    });
                    UserRole.HasOne(ur => ur.Role)
                        .WithMany(r => r.UserRoles)
                        .HasForeignKey(ur => ur.RoleId)
                        .IsRequired();

                    UserRole.HasOne(ur => ur.User)
                                .WithMany(r => r.UserRoles)
                                .HasForeignKey(ur => ur.UserId)
                                .IsRequired();
                });
        }

    }
}