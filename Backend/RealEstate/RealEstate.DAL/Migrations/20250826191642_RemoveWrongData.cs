using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class RemoveWrongData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Видаляємо неправильні дані з попередньої міграції
            migrationBuilder.Sql(@"
                DELETE FROM ""PropertyImages"" 
                WHERE ""PropertyId"" IN (
                    '11111111-1111-1111-1111-111111111111',
                    '22222222-2222-2222-2222-222222222222'
                );
            ");

            migrationBuilder.Sql(@"
                DELETE FROM ""Properties"" 
                WHERE ""Id"" IN (
                    '11111111-1111-1111-1111-111111111111',
                    '22222222-2222-2222-2222-222222222222'
                );
            ");

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "781e9c26-7b4a-4b05-9a83-1a31b94f6e99", new DateTime(2025, 8, 26, 19, 16, 42, 936, DateTimeKind.Utc).AddTicks(2705), "AQAAAAIAAYagAAAAEMt0qE1C0BiVbTXLM7hLb9Y2OTxfJF7K26EqLF1cKY86Tp0JszS0r88OAGh54hOluQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "6c080b91-5542-472d-8408-3a0f7aaf5a18", new DateTime(2025, 8, 26, 19, 16, 42, 120, DateTimeKind.Utc).AddTicks(1005), "AQAAAAIAAYagAAAAEBlY9UCMiLpvQLeBtWmJUZkiMxp/UsUx10G59+Xe3WecKVTphqpbcwhdYXwRzaRnXQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "06a9d661-5e6b-4a46-b119-ce2f2b4fac9e", new DateTime(2025, 8, 26, 19, 16, 42, 23, DateTimeKind.Utc).AddTicks(2673), "AQAAAAIAAYagAAAAEIepd4KGU74dpwhTyjZQVJ384J5KmuR4zcjVEt1C6bxNs/71Rp0/gv2raWN+i3mr/A==" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "781e9c26-7b4a-4b05-9a83-1a31b94f6e99", new DateTime(2025, 8, 26, 19, 7, 6, 936, DateTimeKind.Utc).AddTicks(2705), "AQAAAAIAAYagAAAAEMt0qE1C0BiVbTXLM7hLb9Y2OTxfJF7K26EqLF1cKY86Tp0JszS0r88OAGh54hOluQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "6c080b91-5542-472d-8408-3a0f7aaf5a18", new DateTime(2025, 8, 26, 19, 7, 6, 120, DateTimeKind.Utc).AddTicks(1005), "AQAAAAIAAYagAAAAEBlY9UCMiLpvQLeBtWmJUZkiMxp/UsUx10G59+Xe3WecKVTphqpbcwhdYXwRzaRnXQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "06a9d661-5e6b-4a46-b119-ce2f2b4fac9e", new DateTime(2025, 8, 26, 19, 7, 6, 23, DateTimeKind.Utc).AddTicks(2673), "AQAAAAIAAYagAAAAEIepd4KGU74dpwhTyjZQVJ384J5KmuR4zcjVEt1C6bxNs/71Rp0/gv2raWN+i3mr/A==" });
        }
    }
}
