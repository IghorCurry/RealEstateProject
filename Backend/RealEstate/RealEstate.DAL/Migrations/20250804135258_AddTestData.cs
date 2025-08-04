using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddTestData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "efca61f3-ddde-4e06-b926-e892c4d27fdc", "AQAAAAIAAYagAAAAELyVJ5i49mBmajTpalIPwN4bIR/WHaZ86pDgbYUain8I2alfxovw8pOfJpo4OQV63A==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "f297085e-691a-45dd-be6f-7a3d8269227d", "AQAAAAIAAYagAAAAEPXCmk0VLm4jk2Wy0YKxKPO1EWKchu4Y6SIhF7x6kFzKJ8EMY4ji7je7k1z5fFu0DQ==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "6c4b73ee-3468-4abb-a329-3da34f9485c3", "AQAAAAIAAYagAAAAEGzZtccEahQs2Bf8vM62/g2piDlJMUdYOWDI7sVxZMaN57AdUJjyiSGezn9lqCtK8Q==" });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "Id", "Address", "Bathrooms", "Bedrooms", "CreatedAt", "Description", "Features", "Location", "Price", "PropertyType", "SquareMeters", "Status", "Title", "UserId" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), "вул. Хрещатик, 15, Київ", 2, 3, new DateTime(2025, 7, 5, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9140), "Розкішна 3-кімнатна квартира з ремонтом, меблями та технікою. Ідеальне розташування, поруч метро, магазини, ресторани.", "Меблі,Техніка,Кондиціонер,Балкон,Парковка", 6, 85000m, 2, 85.5, 1, "Сучасна квартира в центрі міста", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), "вул. Садова, 42, Буча", 3, 4, new DateTime(2025, 7, 10, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9170), "Двоповерховий будинок з великим садом та гаражем. Тиха вулиця, зелена зона, ідеально для сім'ї.", "Сад,Гараж,Камін,Тераса,Підвал", 2, 250000m, 1, 180.0, 1, "Затишний будинок з садом", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), "вул. Студентська, 8, Київ", 1, 1, new DateTime(2025, 7, 15, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9176), "Компактна студія з сучасним ремонтом. Ідеально для молодих людей або студентів. Розумна ціна.", "Меблі,Техніка,Wi-Fi,Безпека", 6, 35000m, 2, 35.0, 1, "Студія для молодих", new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), "вул. Печерська, 25, Київ", 2, 3, new DateTime(2025, 7, 20, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9182), "Розкішний пентхаус на останньому поверсі з панорамним видом на місто. Елітний район, найкраща інфраструктура.", "Панорамні вікна,Тераса,Консьєрж,Підземна парковка,Спортзал", 6, 500000m, 2, 120.0, 1, "Пентхаус з панорамним видом", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), "вул. Торгова, 10, Київ", 1, 0, new DateTime(2025, 7, 25, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9194), "Готове комерційне приміщення для бізнесу. Висока прохідність, зручне розташування, можна відкрити магазин або кафе.", "Вхід з вулиці,Вентиляція,Електрика,Водопостачання", 6, 180000m, 7, 150.0, 1, "Комерційне приміщення", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") }
                });

            migrationBuilder.InsertData(
                table: "Favorites",
                columns: new[] { "Id", "CreatedAt", "PropertyId", "UserId" },
                values: new object[,]
                {
                    { new Guid("1a1b2c3d-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 7, 25, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9761), new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a2b3c4d-e6f7-8901-bcde-f23456789012"), new DateTime(2025, 7, 27, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9777), new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a3c4d5e-f7a8-9012-cdef-345678901234"), new DateTime(2025, 7, 30, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9779), new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a4d5e6f-a8b9-0123-def4-567890123456"), new DateTime(2025, 7, 23, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9782), new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a5e6f7a-b9c0-1234-ef56-789012345678"), new DateTime(2025, 7, 28, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9795), new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a6f7a8b-c0d1-2345-ef67-890123456789"), new DateTime(2025, 8, 1, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9798), new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a7a8b9c-d1e2-3456-ef78-901234567890"), new DateTime(2025, 7, 20, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9801), new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("1a8b9c0d-e2f3-4567-ef89-012345678901"), new DateTime(2025, 7, 29, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9804), new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") }
                });

            migrationBuilder.InsertData(
                table: "Inquiries",
                columns: new[] { "Id", "CreatedAt", "Email", "Message", "Name", "Phone", "PropertyId", "UserId" },
                values: new object[,]
                {
                    { new Guid("1a2b3c4d-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 7, 30, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9575), null, "Доброго дня! Цікавлюся цією квартирою. Чи можна домовитися про перегляд? Який час буде зручно?", null, null, new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("2b3c4d5e-f6a7-8901-bcde-f23456789012"), new DateTime(2025, 7, 31, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9582), null, "Дуже подобається будинок! Чи можна дізнатися більше про комунальні платежі та податки?", null, null, new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("3c4d5e6f-a7b8-9012-cdef-345678901234"), new DateTime(2025, 8, 1, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9584), null, "Ідеально для студента! Чи можна зняти на довгострок? Який депозит потрібен?", null, null, new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("4d5e6f7a-b8c9-0123-def4-567890123456"), new DateTime(2025, 8, 2, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9587), null, "Розкішний пентхаус! Чи можна домовитися про перегляд в суботу?", null, null, new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("5e6f7a8b-c9d0-1234-ef56-789012345678"), new DateTime(2025, 8, 3, 13, 52, 57, 501, DateTimeKind.Utc).AddTicks(9591), "elena.petrenko@gmail.com", "Доброго дня! Цікавлюся квартирою. Чи можна дізнатися про парковку?", "Олена Петренко", "0501234567", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), null },
                    { new Guid("6f7a8b9c-d0e1-2345-ef67-890123456789"), new DateTime(2025, 8, 4, 1, 52, 57, 501, DateTimeKind.Utc).AddTicks(9595), "mikhail.ivanenko@ukr.net", "Дуже подобається будинок! Чи можна дізнатися про школу та садочок поблизу?", "Михайло Іваненко", "0679876543", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), null },
                    { new Guid("7a8b9c0d-e1f2-3456-ef78-901234567890"), new DateTime(2025, 8, 4, 7, 52, 57, 501, DateTimeKind.Utc).AddTicks(9598), "anna.kovalenko@yahoo.com", "Студія виглядає чудово! Чи можна зняти на місяць?", "Анна Коваленко", "0634567890", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), null },
                    { new Guid("8b9c0d1e-f2a3-4567-ef89-012345678901"), new DateTime(2025, 8, 4, 11, 52, 57, 501, DateTimeKind.Utc).AddTicks(9601), "viktor.sydorenko@gmail.com", "Пентхаус просто неймовірний! Чи можна домовитися про перегляд?", "Віктор Сидоренко", "0509876543", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), null }
                });

            migrationBuilder.InsertData(
                table: "PropertyImages",
                columns: new[] { "Id", "ImageUrl", "PropertyId" },
                values: new object[,]
                {
                    { new Guid("f0d1e2f3-a4b5-6789-ef01-234567890123"), "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456") },
                    { new Guid("f1a2b3c4-d5e6-7890-abcd-ef1234567890"), "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890") },
                    { new Guid("f1e2f3a4-b5c6-7890-ef12-345678901234"), "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678") },
                    { new Guid("f2b3c4d5-e6f7-8901-bcde-f23456789012"), "https://images.unsplash.com/photo-1560448204-6032e02f11c3?w=800&h=600&fit=crop", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890") },
                    { new Guid("f2f3a4b5-c6d7-8901-ef23-456789012345"), "https://images.unsplash.com/photo-1560448204-6032e02f11c3?w=800&h=600&fit=crop", new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678") },
                    { new Guid("f3c4d5e6-f7a8-9012-cdef-345678901234"), "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890") },
                    { new Guid("f4d5e6f7-a8b9-0123-def4-567890123456"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012") },
                    { new Guid("f5e6f7a8-b9c0-1234-ef56-789012345678"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012") },
                    { new Guid("f6f7a8b9-c0d1-2345-ef67-890123456789"), "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234") },
                    { new Guid("f7a8b9c0-d1e2-3456-ef78-901234567890"), "https://images.unsplash.com/photo-1560448204-6032e02f11c3?w=800&h=600&fit=crop", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234") },
                    { new Guid("f8b9c0d1-e2f3-4567-ef89-012345678901"), "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456") },
                    { new Guid("f9c0d1e2-f3a4-5678-ef90-123456789012"), "https://images.unsplash.com/photo-1560448204-6032e02f11c3?w=800&h=600&fit=crop", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456") }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a1b2c3d-e5f6-7890-abcd-ef1234567890"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a2b3c4d-e6f7-8901-bcde-f23456789012"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a3c4d5e-f7a8-9012-cdef-345678901234"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a4d5e6f-a8b9-0123-def4-567890123456"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a5e6f7a-b9c0-1234-ef56-789012345678"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a6f7a8b-c0d1-2345-ef67-890123456789"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a7a8b9c-d1e2-3456-ef78-901234567890"));

            migrationBuilder.DeleteData(
                table: "Favorites",
                keyColumn: "Id",
                keyValue: new Guid("1a8b9c0d-e2f3-4567-ef89-012345678901"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("1a2b3c4d-e5f6-7890-abcd-ef1234567890"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("2b3c4d5e-f6a7-8901-bcde-f23456789012"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("3c4d5e6f-a7b8-9012-cdef-345678901234"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("4d5e6f7a-b8c9-0123-def4-567890123456"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("5e6f7a8b-c9d0-1234-ef56-789012345678"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("6f7a8b9c-d0e1-2345-ef67-890123456789"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("7a8b9c0d-e1f2-3456-ef78-901234567890"));

            migrationBuilder.DeleteData(
                table: "Inquiries",
                keyColumn: "Id",
                keyValue: new Guid("8b9c0d1e-f2a3-4567-ef89-012345678901"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f0d1e2f3-a4b5-6789-ef01-234567890123"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f1a2b3c4-d5e6-7890-abcd-ef1234567890"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f1e2f3a4-b5c6-7890-ef12-345678901234"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f2b3c4d5-e6f7-8901-bcde-f23456789012"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f2f3a4b5-c6d7-8901-ef23-456789012345"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f3c4d5e6-f7a8-9012-cdef-345678901234"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f4d5e6f7-a8b9-0123-def4-567890123456"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f5e6f7a8-b9c0-1234-ef56-789012345678"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f6f7a8b9-c0d1-2345-ef67-890123456789"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f7a8b9c0-d1e2-3456-ef78-901234567890"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f8b9c0d1-e2f3-4567-ef89-012345678901"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f9c0d1e2-f3a4-5678-ef90-123456789012"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "a4edf478-25a3-4b3d-b972-cc1026bca389", "AQAAAAIAAYagAAAAEGlPQu2Zj8BOoF2xfECoYNVsa26v936Ocprw2PIVC1E6rhC+qHtt8VJgxvNBPZPYig==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "00e1437e-c058-4770-a353-0a0e36d06a62", "AQAAAAIAAYagAAAAEDM2hUCDPGmgC8MpTZraU93elVEAPeOyja0K3dTok5JNXJSjTwdg3L0tfdqhngCy2A==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "PasswordHash" },
                values: new object[] { "47a5b122-ff62-4e93-8dcf-32d299976d9d", "AQAAAAIAAYagAAAAEHNwIuoyKi+Qr5FYjewXfYZZJGOGz21Hrwj42pyhKXHUYE/pt8Zc1z2x4g0BDUfQGw==" });
        }
    }
}
