using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ClearTestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "ce4bf6be-899d-4105-bdc2-9add894c9061", new DateTime(2025, 8, 26, 18, 50, 57, 863, DateTimeKind.Utc).AddTicks(2949), "AQAAAAIAAYagAAAAEExMNCGC6pOpFLIYXo7oIwVCXo7wy7mhR1X/MbuCudeFwzynxFJnVm5G0ZINmhhc/Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "407bccd8-e8ca-4d55-ae05-52325df485ce", new DateTime(2025, 8, 26, 18, 50, 58, 16, DateTimeKind.Utc).AddTicks(1230), "AQAAAAIAAYagAAAAEBgyrr0Qv4RaZgrl3rw5sT5fdDN8OwhVjQq4tTxmNK8rTWbxZPxaewCY4JrlNQqZWg==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "be46826e-31d5-4b7b-b9f7-1d609c6bc5c3", new DateTime(2025, 8, 26, 18, 50, 57, 932, DateTimeKind.Utc).AddTicks(5960), "AQAAAAIAAYagAAAAEHRkpsnyTOIYEHC1C6KVp0yUa8HiX/e0R6vd/FCouA1uMFRCVMAh4hyc7JGdDQuhsw==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
