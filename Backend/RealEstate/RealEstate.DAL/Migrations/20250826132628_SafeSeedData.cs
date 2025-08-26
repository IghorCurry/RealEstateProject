using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class SafeSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "3fd7486e-cc74-4487-b09d-515316925dda", new DateTime(2025, 8, 26, 13, 26, 27, 980, DateTimeKind.Utc).AddTicks(4389), "AQAAAAIAAYagAAAAEJXbl14P2tZPgXCXDlhKYsVHyMZ07kVWARAXSyTaBvwyjhTGcXKX6n703CSGhWreaw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "2b8c2aff-a85b-4d18-afbb-f9d3424b7606", new DateTime(2025, 8, 26, 13, 26, 28, 87, DateTimeKind.Utc).AddTicks(9103), "AQAAAAIAAYagAAAAEMl6gShePa0nd5CDUb6lU2HUXT2Rk83t/9gg7UUJ6UP5e6PmaGEfDLqkN0sjf/sBIw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "58b4f5a7-ba1b-4b17-9f98-f75ac2270f8f", new DateTime(2025, 8, 26, 13, 26, 28, 33, DateTimeKind.Utc).AddTicks(9582), "AQAAAAIAAYagAAAAELnpsHvCce7wxJMHvChX6SAUUG2aijgbDOMlRlbsJa4szCiYxoZQSLuMZLSQtqNx4g==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
