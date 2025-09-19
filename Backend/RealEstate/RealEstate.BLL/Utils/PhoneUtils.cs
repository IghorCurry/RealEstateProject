namespace RealEstate.BLL.Utils
{
    public static class PhoneUtils
    {
        public static string NormalizeToE164Basic(string? input)
        {
            if (string.IsNullOrWhiteSpace(input)) return string.Empty;

            var trimmed = input.Trim();

            if (trimmed.StartsWith("00"))
            {
                trimmed = "+" + trimmed.Substring(2);
            }

            var digits = new string(trimmed.Where(char.IsDigit).ToArray());

            if (!trimmed.StartsWith("+"))
            {
                return "+" + digits;
            }

            return "+" + digits;
        }

        public static bool IsLikelyE164(string normalized)
        {
            if (string.IsNullOrWhiteSpace(normalized)) return false;
            return System.Text.RegularExpressions.Regex.IsMatch(normalized, @"^\+\d{10,15}$");
        }
    }
}


