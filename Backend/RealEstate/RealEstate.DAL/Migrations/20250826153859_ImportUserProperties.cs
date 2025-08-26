using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ImportUserProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "4a708665-d702-4947-9af8-e91feba1e0f3", new DateTime(2025, 8, 26, 15, 38, 57, 789, DateTimeKind.Utc).AddTicks(7879), "AQAAAAIAAYagAAAAEM/iVm7paDq6HE3I57Vkkb8SEW2lwRvaI47QNEEJYUMgmbx/tyNTLWhD2qh4jqpNtQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "f8cedced-d8f4-4d12-b07a-6b8840536254", new DateTime(2025, 8, 26, 15, 38, 58, 61, DateTimeKind.Utc).AddTicks(2382), "AQAAAAIAAYagAAAAEKX/yhcAhompNm51qC2ffxR8dmCuZh+yu0hVrBy9UPc0Wkri8uN/Vye8z5rIwLhu5w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "8788d1c9-8a30-43fa-9eb3-3fd3af126e4e", new DateTime(2025, 8, 26, 15, 38, 57, 980, DateTimeKind.Utc).AddTicks(1503), "AQAAAAIAAYagAAAAEB4ODLBHwf4nnfzCU4bDk0Dor0oDB0UCwzyPE+yXAhP+2LFezVNmZroFmaiZzA5lsg==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
