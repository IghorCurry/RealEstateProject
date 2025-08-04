using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), "2", "User", "USER" },
                    { new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e"), "1", "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"), 0, "a4edf478-25a3-4b3d-b972-cc1026bca389", "admin@gmail.com", true, "", "", false, null, "ADMIN@GMAIL.COM", "REALESTATEADMIN", "AQAAAAIAAYagAAAAEGlPQu2Zj8BOoF2xfECoYNVsa26v936Ocprw2PIVC1E6rhC+qHtt8VJgxvNBPZPYig==", "0501234567", false, "95d58893-e6ce-419a-99c7-087631de4d5e", false, "RealEstateAdmin" },
                    { new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"), 0, "00e1437e-c058-4770-a353-0a0e36d06a62", "user2@gmail.com", true, "", "", false, null, "USER2@GMAIL.COM", "USER2", "AQAAAAIAAYagAAAAEDM2hUCDPGmgC8MpTZraU93elVEAPeOyja0K3dTok5JNXJSjTwdg3L0tfdqhngCy2A==", "0217652388", false, "29e18140-5b5d-4081-806e-4a6559084126", false, "user2" },
                    { new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"), 0, "47a5b122-ff62-4e93-8dcf-32d299976d9d", "user1@gmail.com", true, "", "", false, null, "USER1@GMAIL.COM", "USER1", "AQAAAAIAAYagAAAAEHNwIuoyKi+Qr5FYjewXfYZZJGOGz21Hrwj42pyhKXHUYE/pt8Zc1z2x4g0BDUfQGw==", "0114573600", false, "c126fa02-a9ba-40a6-bf60-9ffbdf132415", false, "user1" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") });

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") });

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"));

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"));

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"));
        }
    }
}
