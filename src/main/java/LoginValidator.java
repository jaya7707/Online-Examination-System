public class LoginValidator {

    public static boolean isValidPassword(String password) {
        if (password == null) {
            return false;
        }

        return password.matches("\\d{4}|\\d{6}");
    }
}