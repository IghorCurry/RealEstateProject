using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using RealEstate.DAL.Entities;
using RealEstate.DAL.Persistance.Settings;

namespace RealEstate.DAL.Persistance
{
    public static partial class DataSeed
    {
        private static readonly PasswordHasher<User> _passwordHasher = new();

        #region Roles Settings

        private static readonly Guid admin_roleId = new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e");
        private static readonly Guid user_roleId = new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20");

        #endregion Roles Settings

        #region Users Settings

        private static readonly Guid adminId = new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae");
        private static readonly string admin_securityStamp = new Guid("95d58893-e6ce-419a-99c7-087631de4d5e").ToString();
        private static readonly Guid user1Id = new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e");
        private static readonly string user1_securityStamp = new Guid("c126fa02-a9ba-40a6-bf60-9ffbdf132415").ToString();
        private static readonly Guid user2Id = new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2");
        private static readonly string user2_securityStamp = new Guid("29e18140-5b5d-4081-806e-4a6559084126").ToString();

        #endregion Users Settings

        public static void AddUserManagementSeed(this ModelBuilder modelBuilder, DefaultAdminSettings defaultAdminSettings)
        {
            modelBuilder.AddRoles();
            modelBuilder.AddAdmin(defaultAdminSettings);
            modelBuilder.AddUsers();
        }

        private static void AddRoles(this ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<IdentityRole<Guid>>().HasData(
                new IdentityRole<Guid>()
                {
                    Id = admin_roleId,
                    Name = "Admin",
                    ConcurrencyStamp = "1",
                    NormalizedName = "Admin".ToUpper()
                },
                new IdentityRole<Guid>()
                {
                    Id = user_roleId,
                    Name = "User",
                    ConcurrencyStamp = "2",
                    NormalizedName = "User".ToUpper()
                });
        }

        private static void AddAdmin(this ModelBuilder modelBuilder, DefaultAdminSettings defaultAdminSettings)
        {
            User admin = new()
            {
                Id = adminId,
                UserName = defaultAdminSettings.UserName,
                NormalizedUserName = defaultAdminSettings.UserName.ToUpper(),
                Email = defaultAdminSettings.Email,
                NormalizedEmail = defaultAdminSettings.Email.ToUpper(),
                PhoneNumber = defaultAdminSettings.PhoneNumber,
                FirstName = "Admin",
                LastName = "User",
                CreatedAt = DateTime.UtcNow,
                EmailConfirmed = true,
                SecurityStamp = admin_securityStamp
            };

            admin.PasswordHash = _passwordHasher.HashPassword(admin, defaultAdminSettings.Password);

            modelBuilder.Entity<User>().HasData(admin);

            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(
                new IdentityUserRole<Guid>()
                {
                    RoleId = admin_roleId,
                    UserId = adminId
                });
        }

        private static void AddUsers(this ModelBuilder modelBuilder)
        {
            #region Users

            User user1 = new()
            {
                Id = user1Id,
                UserName = "user1",
                NormalizedUserName = "user1".ToUpper(),
                Email = "user1@gmail.com",
                NormalizedEmail = "user1@gmail.com".ToUpper(),
                PhoneNumber = "0114573600",
                FirstName = "John",
                LastName = "Doe",
                CreatedAt = DateTime.UtcNow,
                EmailConfirmed = true,
                SecurityStamp = user1_securityStamp
            };
            user1.PasswordHash = _passwordHasher.HashPassword(user1, "PassUser1");

            User user2 = new()
            {
                Id = user2Id,
                UserName = "user2",
                NormalizedUserName = "user2".ToUpper(),
                Email = "user2@gmail.com",
                NormalizedEmail = "user2@gmail.com".ToUpper(),
                PhoneNumber = "0217652388",
                FirstName = "Jane",
                LastName = "Smith",
                CreatedAt = DateTime.UtcNow,
                EmailConfirmed = true,
                SecurityStamp = user2_securityStamp
            };
            user2.PasswordHash = _passwordHasher.HashPassword(user2, "PassUser2");

            modelBuilder.Entity<User>().HasData(user1, user2);

            #endregion Users

            #region Role Assignment

            modelBuilder.Entity<IdentityUserRole<Guid>>().HasData(
            new IdentityUserRole<Guid>()
            {
                RoleId = user_roleId,
                UserId = user1Id
            },
            new IdentityUserRole<Guid>()
            {
                RoleId = user_roleId,
                UserId = user2Id
            });

            #endregion Role Assignment
        }
    }

    public static partial class DataSeed
    {
        public static void AddTestableData(this ModelBuilder modelBuilder, DefaultAdminSettings defaultAdminSettings)
        {
            modelBuilder.AddUserManagementSeed(defaultAdminSettings);
        }
    }
} 