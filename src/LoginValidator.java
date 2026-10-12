
public class LoginValidator {

    

public static boolean isValidPassword(String password) {
    if (password == null) {
        return false;
    }

    // Common rule agreed upon after resolving the conflict:
    // accept exactly 4 or 6 numeric digits.
    return password.matches("\\d{4}|\\d{6}");
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
