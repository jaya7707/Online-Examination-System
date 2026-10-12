
public class LoginValidator {

    public static boolean isValidPassword(String password) {
        if (password == null || password.isEmpty()) {
            return false;
        }

        // Initial rule: password must contain exactly 4 digits.
        return password.matches("\\d{4}");
    }

    public static void main(String[] args) {
        String[] testPasswords = {
            "1234", "123456", "12ab", "", "123"
        };

        for (String password : testPasswords) {
            System.out.println(
                "Password: " + password
                + " -> "
                + (isValidPassword(password) ? "Valid" : "Invalid")
            );
        }
    }
}
