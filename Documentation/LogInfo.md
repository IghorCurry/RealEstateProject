# Логування в проекті

## Реалізація

Проект використовує Serilog для структурованого логування.

### Налаштування

- Логи виводяться в консоль та файли
- Файли ротуються щодня: `logs/app-2025-08-05.log`
- Автоматично видаляються файли старше 7 днів
- Налаштовано в `Program.cs`

### Контролери з логуванням

- ✅ PropertyController - повне логування
- ✅ AuthController - повне логування
- ✅ UserController - повне логування
- ✅ InquiryController - повне логування
- ✅ FavoriteController - повне логування

### Рівні логування

- **Information** - важливі події (створення, отримання даних)
- **Warning** - попередження (не знайдено, невалідні дані)
- **Error** - помилки з деталями та stack trace

### Приклади

```csharp
_logger.LogInformation("Getting all properties");
_logger.LogWarning("Property not found with ID: {PropertyId}", id);
_logger.LogError(ex, "Failed to create property: {Title}", model.Title);
```

## Використання

1. Запустіть проект: `dotnet run --project RealEstate.WebApi`
2. Логи відображаються в консолі та зберігаються в `logs/`
3. Перевірте файли: `logs/app-YYYY-MM-DD.log`
