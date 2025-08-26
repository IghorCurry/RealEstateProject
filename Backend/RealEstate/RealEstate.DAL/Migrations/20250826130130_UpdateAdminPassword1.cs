using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class UpdateAdminPassword1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "dedd05be-c882-4602-8923-8ce121fe6ed0", new DateTime(2025, 8, 26, 13, 1, 30, 36, DateTimeKind.Utc).AddTicks(6359), "AQAAAAIAAYagAAAAED2tXnqt6M45Ns1iioFhUXHlcJfr4VNFcnzkrlJN2G2eFuhUi/W5Q/9ifJHylMuQjg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "83114485-20f7-40c2-a0bb-f0fc930afae9", new DateTime(2025, 8, 26, 13, 1, 30, 144, DateTimeKind.Utc).AddTicks(3546), "AQAAAAIAAYagAAAAEJOljlpsaq8WG+K9vjCI5V++NmllfAZia9FrFqMbdSwm6iYFgkOxrROGTGdBsHc7Xg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "cc0caf73-5d27-4959-8d62-cad80f870ac5", new DateTime(2025, 8, 26, 13, 1, 30, 85, DateTimeKind.Utc).AddTicks(6181), "AQAAAAIAAYagAAAAEBDhLulmPg6d4lNkiIUH1oUIPGqxyz6/SgetFQ9Ow9LNKC7XqXh+PsyTXJ8/VFY0IA==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "6d14c7d7-5859-4287-a3dd-2e603e142502", new DateTime(2025, 8, 26, 12, 59, 28, 433, DateTimeKind.Utc).AddTicks(9532), "AQAAAAIAAYagAAAAEOPUjY+NibGLiaqzfl8TDT/kCyTn+nkB01aR71EApHQAMKh+A6B8CFy9oatcHbTW7w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "45242aa3-f90c-4102-b70c-8e10234e32cb", new DateTime(2025, 8, 26, 12, 59, 28, 540, DateTimeKind.Utc).AddTicks(1108), "AQAAAAIAAYagAAAAEM4SbrUrcqK9mXaC/gdJ+u1vERP7K22HuQc48ZixnQBGj0FV1DTq/MPLF/yis5JnXg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "02646ff1-9c2a-4fbd-92f3-8ffcd88117ac", new DateTime(2025, 8, 26, 12, 59, 28, 486, DateTimeKind.Utc).AddTicks(6394), "AQAAAAIAAYagAAAAEK+nAsMhnbTODofISySLah2FzAqieXODyit7wqoD6IMSvwzbEZwwADhs0P1EgwkgCg==" });
        }
    }
}
