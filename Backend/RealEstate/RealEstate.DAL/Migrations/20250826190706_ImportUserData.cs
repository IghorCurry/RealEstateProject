using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ImportUserData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Додаємо реальні об'єкти нерухомості користувача
            migrationBuilder.Sql(@"
                INSERT INTO ""Properties"" (
                    ""Id"", ""Title"", ""Description"", ""Price"", ""Bedrooms"", ""Bathrooms"", 
                    ""SquareMeters"", ""Address"", ""PropertyType"", ""Location"", ""Status"", 
                    ""Features"", ""CreatedAt"", ""UserId""
                ) VALUES (
                    '11111111-1111-1111-1111-111111111111',
                    'Моя перша квартира',
                    'Чудова квартира з ремонтом, зручне розташування',
                    120000,
                    2,
                    1,
                    65.5,
                    'вул. Шевченка, 15, Київ',
                    0, -- Apartment
                    0, -- Urban
                    0, -- Available
                    '[""Меблі"", ""Техніка"", ""Балкон""]',
                    NOW(),
                    'cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae'
                );
            ");

            migrationBuilder.Sql(@"
                INSERT INTO ""Properties"" (
                    ""Id"", ""Title"", ""Description"", ""Price"", ""Bedrooms"", ""Bathrooms"", 
                    ""SquareMeters"", ""Address"", ""PropertyType"", ""Location"", ""Status"", 
                    ""Features"", ""CreatedAt"", ""UserId""
                ) VALUES (
                    '22222222-2222-2222-2222-222222222222',
                    'Будинок за містом',
                    'Затишний будинок з садом, ідеально для сім''ї',
                    350000,
                    3,
                    2,
                    120.0,
                    'вул. Садова, 25, Буча',
                    1, -- House
                    1, -- Suburban
                    0, -- Available
                    '[""Сад"", ""Гараж"", ""Тераса""]',
                    NOW(),
                    'cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae'
                );
            ");

            // Додаємо зображення для об'єктів
            migrationBuilder.Sql(@"
                INSERT INTO ""PropertyImages"" (
                    ""Id"", ""PropertyId"", ""ImageUrl"", ""Order""
                ) VALUES (
                    '33333333-3333-3333-3333-333333333333',
                    '11111111-1111-1111-1111-111111111111',
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    1
                );
            ");

            migrationBuilder.Sql(@"
                INSERT INTO ""PropertyImages"" (
                    ""Id"", ""PropertyId"", ""ImageUrl"", ""Order""
                ) VALUES (
                    '44444444-4444-4444-4444-444444444444',
                    '22222222-2222-2222-2222-222222222222',
                    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
                    1
                );
            ");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Видаляємо додані дані
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
    }
}
