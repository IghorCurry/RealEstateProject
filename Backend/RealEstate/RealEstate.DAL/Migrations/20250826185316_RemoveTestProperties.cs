using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveTestProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Видаляємо тестові зображення нерухомості
            migrationBuilder.Sql(@"
                DELETE FROM ""PropertyImages"" 
                WHERE ""PropertyId"" IN (
                    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
                    'c3d4e5f6-a7b8-9012-cdef-345678901234',
                    'd4e5f6a7-b8c9-0123-def4-567890123456',
                    'e5f6a7b8-c9d0-1234-ef56-789012345678',
                    'f6a7b8c9-d0e1-2345-ef67-890123456789',
                    'a7b8c9d0-e1f2-3456-ef78-901234567890',
                    'b8c9d0e1-f2a3-4567-ef89-012345678901'
                );
            ");

            // Видаляємо тестові об'єкти нерухомості
            migrationBuilder.Sql(@"
                DELETE FROM ""Properties"" 
                WHERE ""Id"" IN (
                    'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
                    'b2c3d4e5-f6a7-8901-bcde-f23456789012',
                    'c3d4e5f6-a7b8-9012-cdef-345678901234',
                    'd4e5f6a7-b8c9-0123-def4-567890123456',
                    'e5f6a7b8-c9d0-1234-ef56-789012345678',
                    'f6a7b8c9-d0e1-2345-ef67-890123456789',
                    'a7b8c9d0-e1f2-3456-ef78-901234567890',
                    'b8c9d0e1-f2a3-4567-ef89-012345678901'
                );
            ");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "781e9c26-7b4a-4b05-9a83-1a31b94f6e99", new DateTime(2025, 8, 26, 18, 53, 15, 936, DateTimeKind.Utc).AddTicks(2705), "AQAAAAIAAYagAAAAEMt0qE1C0BiVbTXLM7hLb9Y2OTxfJF7K26EqLF1cKY86Tp0JszS0r88OAGh54hOluQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "6c080b91-5542-472d-8408-3a0f7aaf5a18", new DateTime(2025, 8, 26, 18, 53, 16, 120, DateTimeKind.Utc).AddTicks(1005), "AQAAAAIAAYagAAAAEBlY9UCMiLpvQLeBtWmJUZkiMxp/UsUx10G59+Xe3WecKVTphqpbcwhdYXwRzaRnXQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "06a9d661-5e6b-4a46-b119-ce2f2b4fac9e", new DateTime(2025, 8, 26, 18, 53, 16, 23, DateTimeKind.Utc).AddTicks(2673), "AQAAAAIAAYagAAAAEIepd4KGU74dpwhTyjZQVJ384J5KmuR4zcjVEt1C6bxNs/71Rp0/gv2raWN+i3mr/A==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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
    }
}
