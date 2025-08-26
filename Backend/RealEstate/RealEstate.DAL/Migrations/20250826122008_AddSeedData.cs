using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddSeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "4ead0fae-3dcc-4dd4-a5e3-2ed4b3dbfffa", new DateTime(2025, 8, 26, 12, 20, 7, 726, DateTimeKind.Utc).AddTicks(3203), "AQAAAAIAAYagAAAAEAWw6poYphgNTmDZyf8Vet/eW7h++YHFVHQBWxJBzF33m6SeE89mD66x0A0iqo0Scw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "f761f712-9ac1-49ce-800f-eb00b6816058", new DateTime(2025, 8, 26, 12, 20, 7, 832, DateTimeKind.Utc).AddTicks(1101), "AQAAAAIAAYagAAAAEKDJjw6SeTUTVzPDmKD7B5uTmBh4UmvVV/mxUwXV4IyCH7+gla9HvHt0cxdUrZL82Q==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "39189c79-9656-43c9-b44a-354e7d830e21", new DateTime(2025, 8, 26, 12, 20, 7, 775, DateTimeKind.Utc).AddTicks(9777), "AQAAAAIAAYagAAAAEFTTh9zbg1gKxDpu+ySFJJEHPus5jMqT/KFhJB4NKHjojwSjPleJO7iu9p4YrGdAlw==" });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "Id", "Address", "Bathrooms", "Bedrooms", "CreatedAt", "Description", "Features", "Location", "Price", "PropertyType", "SquareMeters", "Status", "Title", "UserId" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), "вул. Хрещатик, 15, Київ", 2, 3, new DateTime(2025, 7, 27, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9576), "Розкішна 3-кімнатна квартира з ремонтом, меблями та технікою. Ідеальне розташування, поруч метро, магазини, ресторани.", "Меблі,Техніка,Кондиціонер,Балкон,Парковка", 6, 85000m, 2, 85.5, 1, "Сучасна квартира в центрі міста", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("a7b8c9d0-e1f2-3456-ef78-901234567890"), "вул. Бізнесова, 15, Київ", 2, 0, new DateTime(2025, 8, 23, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9616), "Сучасне офісне приміщення в бізнес-центрі. Ідеально для компаній середнього розміру.", "Конференц-зал,Кухня,Парковка,Охорона", 6, 800000m, 3, 200.0, 1, "Офісне приміщення в бізнес-центрі", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), "вул. Садова, 42, Буча", 3, 4, new DateTime(2025, 8, 1, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9594), "Двоповерховий будинок з великим садом та гаражем. Тиха вулиця, зелена зона, ідеально для сім'ї.", "Сад,Гараж,Камін,Тераса,Підвал", 2, 250000m, 1, 180.0, 1, "Затишний будинок з садом", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("b8c9d0e1-f2a3-4567-ef89-012345678901"), "вул. Елітна, 8, Київ", 2, 3, new DateTime(2025, 8, 24, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9620), "Стильна квартира з дизайнерським ремонтом. Елітний район, найкраща інфраструктура.", "Дизайнерський ремонт,Меблі,Техніка,Балкон", 6, 250000m, 2, 95.0, 1, "Стильна квартира в центрі", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), "вул. Студентська, 8, Київ", 1, 1, new DateTime(2025, 8, 6, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9599), "Компактна студія з сучасним ремонтом. Ідеально для молодих людей або студентів. Розумна ціна.", "Меблі,Техніка,Wi-Fi,Безпека", 6, 35000m, 2, 35.0, 1, "Студія для молодих", new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), "вул. Печерська, 25, Київ", 2, 3, new DateTime(2025, 8, 11, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9604), "Розкішний пентхаус на останньому поверсі з панорамним видом на місто. Елітний район, найкраща інфраструктура.", "Панорамні вікна,Тераса,Консьєрж,Підземна парковка,Спортзал", 6, 500000m, 2, 120.0, 1, "Пентхаус з панорамним видом", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), "вул. Торгова, 10, Київ", 1, 0, new DateTime(2025, 8, 16, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9608), "Готове комерційне приміщення для бізнесу. Висока прохідність, зручне розташування, можна відкрити магазин або кафе.", "Вхід з вулиці,Вентиляція,Електрика,Водопостачання", 6, 180000m, 7, 150.0, 1, "Комерційне приміщення", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("f6a7b8c9-d0e1-2345-ef67-890123456789"), "вул. Центральна, 5, Київ", 1, 2, new DateTime(2025, 8, 21, 12, 20, 7, 884, DateTimeKind.Utc).AddTicks(9612), "Сучасна квартира з ремонтом. Зручне розташування, поруч транспорт та магазини.", "Меблі,Балкон,Парковка", 6, 65000m, 2, 55.0, 1, "Сучасна квартира з ремонтом", new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") }
                });

            migrationBuilder.InsertData(
                table: "Favorites",
                columns: new[] { "Id", "CreatedAt", "PropertyId", "UserId" },
                values: new object[,]
                {
                    { new Guid("1a1b2c3d-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 8, 16, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(226), new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a2b3c4d-e6f7-8901-bcde-f23456789012"), new DateTime(2025, 8, 18, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(234), new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a3c4d5e-f7a8-9012-cdef-345678901234"), new DateTime(2025, 8, 21, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(236), new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a4d5e6f-a8b9-0123-def4-567890123456"), new DateTime(2025, 8, 14, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(238), new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a5e6f7a-b9c0-1234-ef56-789012345678"), new DateTime(2025, 8, 19, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(239), new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a6f7a8b-c0d1-2345-ef67-890123456789"), new DateTime(2025, 8, 23, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(242), new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a7a8b9c-d1e2-3456-ef78-901234567890"), new DateTime(2025, 8, 11, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(245), new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("1a8b9c0d-e2f3-4567-ef89-012345678901"), new DateTime(2025, 8, 20, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(246), new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") }
                });

            migrationBuilder.InsertData(
                table: "Inquiries",
                columns: new[] { "Id", "CreatedAt", "Email", "Message", "Name", "Phone", "PropertyId", "UserId" },
                values: new object[,]
                {
                    { new Guid("1a2b3c4d-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 8, 21, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(167), null, "Доброго дня! Цікавлюся цією квартирою. Чи можна домовитися про перегляд? Який час буде зручно?", null, null, new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("2b3c4d5e-f6a7-8901-bcde-f23456789012"), new DateTime(2025, 8, 22, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(171), null, "Дуже подобається будинок! Чи можна дізнатися більше про комунальні платежі та податки?", null, null, new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("3c4d5e6f-a7b8-9012-cdef-345678901234"), new DateTime(2025, 8, 23, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(173), null, "Ідеально для студента! Чи можна зняти на довгострок? Який депозит потрібен?", null, null, new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("4d5e6f7a-b8c9-0123-def4-567890123456"), new DateTime(2025, 8, 24, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(174), null, "Розкішний пентхаус! Чи можна домовитися про перегляд в суботу?", null, null, new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("5e6f7a8b-c9d0-1234-ef56-789012345678"), new DateTime(2025, 8, 25, 12, 20, 7, 885, DateTimeKind.Utc).AddTicks(177), "elena.petrenko@gmail.com", "Доброго дня! Цікавлюся квартирою. Чи можна дізнатися про парковку?", "Олена Петренко", "0501234567", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), null },
                    { new Guid("6f7a8b9c-d0e1-2345-ef67-890123456789"), new DateTime(2025, 8, 26, 0, 20, 7, 885, DateTimeKind.Utc).AddTicks(181), "mikhail.ivanenko@ukr.net", "Дуже подобається будинок! Чи можна дізнатися про школу та садочок поблизу?", "Михайло Іваненко", "0679876543", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), null },
                    { new Guid("7a8b9c0d-e1f2-3456-ef78-901234567890"), new DateTime(2025, 8, 26, 6, 20, 7, 885, DateTimeKind.Utc).AddTicks(183), "anna.kovalenko@yahoo.com", "Студія виглядає чудово! Чи можна зняти на місяць?", "Анна Коваленко", "0634567890", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), null },
                    { new Guid("8b9c0d1e-f2a3-4567-ef89-012345678901"), new DateTime(2025, 8, 26, 10, 20, 7, 885, DateTimeKind.Utc).AddTicks(184), "viktor.sydorenko@gmail.com", "Пентхаус просто неймовірний! Чи можна домовитися про перегляд?", "Віктор Сидоренко", "0509876543", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), null }
                });

            migrationBuilder.InsertData(
                table: "PropertyImages",
                columns: new[] { "Id", "ImageUrl", "PropertyId" },
                values: new object[,]
                {
                    { new Guid("f1a2b3c4-d5e6-7890-abcd-ef1234567890"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890") },
                    { new Guid("f1e2f3a4-b5c6-7890-ef12-345678901234"), "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678") },
                    { new Guid("f2b3c4d5-e6f7-8901-bcde-f23456789012"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890") },
                    { new Guid("f2f3a4b5-c6d7-8901-ef23-456789012345"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678") },
                    { new Guid("f3a4b5c6-d7e8-9012-ef34-567890123456"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("f6a7b8c9-d0e1-2345-ef67-890123456789") },
                    { new Guid("f4b5c6d7-e8f9-0123-ef45-678901234567"), "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", new Guid("a7b8c9d0-e1f2-3456-ef78-901234567890") },
                    { new Guid("f4d5e6f7-a8b9-0123-def4-567890123456"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012") },
                    { new Guid("f5c6d7e8-f9a0-1234-ef56-789012345678"), "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", new Guid("b8c9d0e1-f2a3-4567-ef89-012345678901") },
                    { new Guid("f5e6f7a8-b9c0-1234-ef56-789012345678"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012") },
                    { new Guid("f6f7a8b9-c0d1-2345-ef67-890123456789"), "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234") },
                    { new Guid("f7a8b9c0-d1e2-3456-ef78-901234567890"), "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234") },
                    { new Guid("f8b9c0d1-e2f3-4567-ef89-012345678901"), "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456") },
                    { new Guid("f9c0d1e2-f3a4-5678-ef90-123456789012"), "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456") }
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
                keyValue: new Guid("f3a4b5c6-d7e8-9012-ef34-567890123456"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f4b5c6d7-e8f9-0123-ef45-678901234567"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f4d5e6f7-a8b9-0123-def4-567890123456"));

            migrationBuilder.DeleteData(
                table: "PropertyImages",
                keyColumn: "Id",
                keyValue: new Guid("f5c6d7e8-f9a0-1234-ef56-789012345678"));

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
                keyValue: new Guid("a7b8c9d0-e1f2-3456-ef78-901234567890"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"));

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("b8c9d0e1-f2a3-4567-ef89-012345678901"));

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

            migrationBuilder.DeleteData(
                table: "Properties",
                keyColumn: "Id",
                keyValue: new Guid("f6a7b8c9-d0e1-2345-ef67-890123456789"));

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "b1453e62-997b-4999-8370-0fe0aabe38f3", new DateTime(2025, 8, 26, 11, 39, 5, 211, DateTimeKind.Utc).AddTicks(2968), "AQAAAAIAAYagAAAAED3BBT133l9n5OOdzRnhzopEKiKJSy6U9HXiyiW0lFQc6bWQSw2raIVFKvCQrw1MXw==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "e8b1248a-82a0-409d-b5be-06267db5bf50", new DateTime(2025, 8, 26, 11, 39, 5, 310, DateTimeKind.Utc).AddTicks(2566), "AQAAAAIAAYagAAAAEKsNb8octCO7+WGnXcQSZcF2MYtRcKvvM5tDirt3rKV3i4PELYr1ZoNiO0MK+cBA1w==" });

            migrationBuilder.UpdateData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"),
                columns: new[] { "ConcurrencyStamp", "CreatedAt", "PasswordHash" },
                values: new object[] { "555a3950-f3ae-4f60-ba1c-f0db8cfaebb4", new DateTime(2025, 8, 26, 11, 39, 5, 260, DateTimeKind.Utc).AddTicks(7231), "AQAAAAIAAYagAAAAEJuRu1nSl84q3eR+x0UW10i9j5L3OdkG1SSwu6gdgPx1LkJu2asKn8IZT9X/Q4zEUw==" });
        }
    }
}
