using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class FixDuplicateProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "19f3de7c-7f0c-4daf-9c2f-2a60830ddf62", new DateTime(2025, 8, 26, 13, 20, 50, 570, DateTimeKind.Utc).AddTicks(6017), "AQAAAAIAAYagAAAAEEp+H0VUJBX3X8yEp42IP0ot378rBJDstdxUN1B4czedmo/nMKFYqA5y9Bwb4w29HA==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "e4572c7b-eecc-4871-bb23-a6987c54a5b5", new DateTime(2025, 8, 26, 13, 20, 50, 672, DateTimeKind.Utc).AddTicks(2660), "AQAAAAIAAYagAAAAEL4kxmmQXRJ5jBUpF0Sbix9rZ+9BtgqK1Z8aiinmnSyHnY19qEd6cOUnecqnIqMeNw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "b63f3562-c059-4932-8746-412d18f9245f", new DateTime(2025, 8, 26, 13, 20, 50, 621, DateTimeKind.Utc).AddTicks(8482), "AQAAAAIAAYagAAAAEA4mzDLjJ2C9hKUC5VKcPxCBqFPNAJLLTSE2MbUmaV0ZWV/hsQgOiLj8TV9kVTbcuA==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
