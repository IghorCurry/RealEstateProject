using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RealEstate.DAL.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    RoleId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Properties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    Price = table.Column<decimal>(type: "numeric(18,2)", nullable: false),
                    Bedrooms = table.Column<int>(type: "integer", nullable: false),
                    Bathrooms = table.Column<int>(type: "integer", nullable: false),
                    SquareMeters = table.Column<double>(type: "double precision", nullable: false),
                    Address = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    PropertyType = table.Column<int>(type: "integer", nullable: false),
                    Location = table.Column<int>(type: "integer", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false, defaultValue: 1),
                    Features = table.Column<string>(type: "text", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Properties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Properties_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Favorites",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Favorites", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Favorites_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Favorites_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Inquiries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: true),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Email = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    Phone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    Message = table.Column<string>(type: "character varying(1000)", maxLength: 1000, nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inquiries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inquiries_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Inquiries_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PropertyImages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    PropertyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false, defaultValue: 0)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PropertyImages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PropertyImages_Properties_PropertyId",
                        column: x => x.PropertyId,
                        principalTable: "Properties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), "2", "User", "USER" },
                    { new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e"), "1", "Admin", "ADMIN" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "CreatedAt", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae"), 0, "1694e18a-7993-433c-ab6d-161a3369aae7", new DateTime(2025, 8, 15, 19, 33, 45, 914, DateTimeKind.Utc).AddTicks(5821), "admin@gmail.com", true, "Admin", "User", false, null, "ADMIN@GMAIL.COM", "REALESTATEADMIN", "AQAAAAIAAYagAAAAEMHiZ5t3ADDbCEQeUeD+zfwHfu52vhdXoIon0luynB3+GI9fKKSwMZMh/c5r1GSG7Q==", "0501234567", false, "95d58893-e6ce-419a-99c7-087631de4d5e", false, "RealEstateAdmin" },
                    { new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2"), 0, "dae734af-a259-4fbf-b719-88941bc57ef4", new DateTime(2025, 8, 15, 19, 33, 46, 16, DateTimeKind.Utc).AddTicks(3119), "user2@gmail.com", true, "Jane", "Smith", false, null, "USER2@GMAIL.COM", "USER2", "AQAAAAIAAYagAAAAEIOnjRcmcuE32s19WhZ5+73HrJ/oxrqGsDCUCMIkTq7xW6w4VDqx6Ev9yMbCzWocxw==", "0217652388", false, "29e18140-5b5d-4081-806e-4a6559084126", false, "user2" },
                    { new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e"), 0, "a17efe2f-d035-4992-8e2e-9c3c1fe4f846", new DateTime(2025, 8, 15, 19, 33, 45, 964, DateTimeKind.Utc).AddTicks(6854), "user1@gmail.com", true, "John", "Doe", false, null, "USER1@GMAIL.COM", "USER1", "AQAAAAIAAYagAAAAEJ1GRe4iSo1EYen4aIOR+pDMXuPLD3xyeMKvvLmux0XtQg0CfKU+NSwoFLhN00jvnw==", "0114573600", false, "c126fa02-a9ba-40a6-bf60-9ffbdf132415", false, "user1" }
                });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[,]
                {
                    { new Guid("a282b0b3-fbbf-4b62-829c-7be617214e1e"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("15f3ddd2-4f37-4db3-8d74-a94efc03db20"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") }
                });

            migrationBuilder.InsertData(
                table: "Properties",
                columns: new[] { "Id", "Address", "Bathrooms", "Bedrooms", "CreatedAt", "Description", "Features", "Location", "Price", "PropertyType", "SquareMeters", "Status", "Title", "UserId" },
                values: new object[,]
                {
                    { new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), "вул. Хрещатик, 15, Київ", 2, 3, new DateTime(2025, 7, 16, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7276), "Розкішна 3-кімнатна квартира з ремонтом, меблями та технікою. Ідеальне розташування, поруч метро, магазини, ресторани.", "Меблі,Техніка,Кондиціонер,Балкон,Парковка", 6, 85000m, 2, 85.5, 1, "Сучасна квартира в центрі міста", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("a7b8c9d0-e1f2-3456-ef78-901234567890"), "вул. Бізнесова, 15, Київ", 2, 0, new DateTime(2025, 8, 12, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7331), "Сучасне офісне приміщення в бізнес-центрі. Ідеально для компаній середнього розміру.", "Конференц-зал,Кухня,Парковка,Охорона", 6, 800000m, 3, 200.0, 1, "Офісне приміщення в бізнес-центрі", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), "вул. Садова, 42, Буча", 3, 4, new DateTime(2025, 7, 21, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7294), "Двоповерховий будинок з великим садом та гаражем. Тиха вулиця, зелена зона, ідеально для сім'ї.", "Сад,Гараж,Камін,Тераса,Підвал", 2, 250000m, 1, 180.0, 1, "Затишний будинок з садом", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("b8c9d0e1-f2a3-4567-ef89-012345678901"), "вул. Елітна, 8, Київ", 2, 3, new DateTime(2025, 8, 13, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7336), "Стильна квартира з дизайнерським ремонтом. Елітний район, найкраща інфраструктура.", "Дизайнерський ремонт,Меблі,Техніка,Балкон", 6, 250000m, 2, 95.0, 1, "Стильна квартира в центрі", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), "вул. Студентська, 8, Київ", 1, 1, new DateTime(2025, 7, 26, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7299), "Компактна студія з сучасним ремонтом. Ідеально для молодих людей або студентів. Розумна ціна.", "Меблі,Техніка,Wi-Fi,Безпека", 6, 35000m, 2, 35.0, 1, "Студія для молодих", new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), "вул. Печерська, 25, Київ", 2, 3, new DateTime(2025, 7, 31, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7305), "Розкішний пентхаус на останньому поверсі з панорамним видом на місто. Елітний район, найкраща інфраструктура.", "Панорамні вікна,Тераса,Консьєрж,Підземна парковка,Спортзал", 6, 500000m, 2, 120.0, 1, "Пентхаус з панорамним видом", new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), "вул. Торгова, 10, Київ", 1, 0, new DateTime(2025, 8, 5, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7314), "Готове комерційне приміщення для бізнесу. Висока прохідність, зручне розташування, можна відкрити магазин або кафе.", "Вхід з вулиці,Вентиляція,Електрика,Водопостачання", 6, 180000m, 7, 150.0, 1, "Комерційне приміщення", new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("f6a7b8c9-d0e1-2345-ef67-890123456789"), "вул. Центральна, 5, Київ", 1, 2, new DateTime(2025, 8, 10, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7325), "Сучасна квартира з ремонтом. Зручне розташування, поруч транспорт та магазини.", "Меблі,Балкон,Парковка", 6, 65000m, 2, 55.0, 1, "Сучасна квартира з ремонтом", new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") }
                });

            migrationBuilder.InsertData(
                table: "Favorites",
                columns: new[] { "Id", "CreatedAt", "PropertyId", "UserId" },
                values: new object[,]
                {
                    { new Guid("1a1b2c3d-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 8, 5, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8025), new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a2b3c4d-e6f7-8901-bcde-f23456789012"), new DateTime(2025, 8, 7, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8029), new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a3c4d5e-f7a8-9012-cdef-345678901234"), new DateTime(2025, 8, 10, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8055), new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("1a4d5e6f-a8b9-0123-def4-567890123456"), new DateTime(2025, 8, 3, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8057), new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a5e6f7a-b9c0-1234-ef56-789012345678"), new DateTime(2025, 8, 8, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8059), new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a6f7a8b-c0d1-2345-ef67-890123456789"), new DateTime(2025, 8, 12, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8062), new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("1a7a8b9c-d1e2-3456-ef78-901234567890"), new DateTime(2025, 7, 31, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8064), new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") },
                    { new Guid("1a8b9c0d-e2f3-4567-ef89-012345678901"), new DateTime(2025, 8, 9, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(8066), new Guid("e5f6a7b8-c9d0-1234-ef56-789012345678"), new Guid("cb37b3b6-88e7-4b4d-a6fc-56e1d1ed3aae") }
                });

            migrationBuilder.InsertData(
                table: "Inquiries",
                columns: new[] { "Id", "CreatedAt", "Email", "Message", "Name", "Phone", "PropertyId", "UserId" },
                values: new object[,]
                {
                    { new Guid("1a2b3c4d-e5f6-7890-abcd-ef1234567890"), new DateTime(2025, 8, 10, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7928), null, "Доброго дня! Цікавлюся цією квартирою. Чи можна домовитися про перегляд? Який час буде зручно?", null, null, new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("2b3c4d5e-f6a7-8901-bcde-f23456789012"), new DateTime(2025, 8, 11, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7931), null, "Дуже подобається будинок! Чи можна дізнатися більше про комунальні платежі та податки?", null, null, new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("3c4d5e6f-a7b8-9012-cdef-345678901234"), new DateTime(2025, 8, 12, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7933), null, "Ідеально для студента! Чи можна зняти на довгострок? Який депозит потрібен?", null, null, new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), new Guid("e2403a4f-0d12-4555-bf66-7338cd13ff3e") },
                    { new Guid("4d5e6f7a-b8c9-0123-def4-567890123456"), new DateTime(2025, 8, 13, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7936), null, "Розкішний пентхаус! Чи можна домовитися про перегляд в суботу?", null, null, new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), new Guid("d7e228e1-4c36-4ead-8bc1-622bb13140d2") },
                    { new Guid("5e6f7a8b-c9d0-1234-ef56-789012345678"), new DateTime(2025, 8, 14, 19, 33, 46, 68, DateTimeKind.Utc).AddTicks(7938), "elena.petrenko@gmail.com", "Доброго дня! Цікавлюся квартирою. Чи можна дізнатися про парковку?", "Олена Петренко", "0501234567", new Guid("a1b2c3d4-e5f6-7890-abcd-ef1234567890"), null },
                    { new Guid("6f7a8b9c-d0e1-2345-ef67-890123456789"), new DateTime(2025, 8, 15, 7, 33, 46, 68, DateTimeKind.Utc).AddTicks(7941), "mikhail.ivanenko@ukr.net", "Дуже подобається будинок! Чи можна дізнатися про школу та садочок поблизу?", "Михайло Іваненко", "0679876543", new Guid("b2c3d4e5-f6a7-8901-bcde-f23456789012"), null },
                    { new Guid("7a8b9c0d-e1f2-3456-ef78-901234567890"), new DateTime(2025, 8, 15, 13, 33, 46, 68, DateTimeKind.Utc).AddTicks(7952), "anna.kovalenko@yahoo.com", "Студія виглядає чудово! Чи можна зняти на місяць?", "Анна Коваленко", "0634567890", new Guid("c3d4e5f6-a7b8-9012-cdef-345678901234"), null },
                    { new Guid("8b9c0d1e-f2a3-4567-ef89-012345678901"), new DateTime(2025, 8, 15, 17, 33, 46, 68, DateTimeKind.Utc).AddTicks(7956), "viktor.sydorenko@gmail.com", "Пентхаус просто неймовірний! Чи можна домовитися про перегляд?", "Віктор Сидоренко", "0509876543", new Guid("d4e5f6a7-b8c9-0123-def4-567890123456"), null }
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

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_PropertyId",
                table: "Favorites",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Favorites_UserId_PropertyId",
                table: "Favorites",
                columns: new[] { "UserId", "PropertyId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Inquiries_CreatedAt",
                table: "Inquiries",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Inquiries_PropertyId",
                table: "Inquiries",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Inquiries_UserId",
                table: "Inquiries",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_CreatedAt",
                table: "Properties",
                column: "CreatedAt");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_Location",
                table: "Properties",
                column: "Location");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_Price",
                table: "Properties",
                column: "Price");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_PropertyType",
                table: "Properties",
                column: "PropertyType");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_Status",
                table: "Properties",
                column: "Status");

            migrationBuilder.CreateIndex(
                name: "IX_Properties_UserId",
                table: "Properties",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyImages_PropertyId",
                table: "PropertyImages",
                column: "PropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_PropertyImages_PropertyId_Order",
                table: "PropertyImages",
                columns: new[] { "PropertyId", "Order" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Favorites");

            migrationBuilder.DropTable(
                name: "Inquiries");

            migrationBuilder.DropTable(
                name: "PropertyImages");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Properties");

            migrationBuilder.DropTable(
                name: "AspNetUsers");
        }
    }
}
