import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class LoginValidatorTest {

    @Test
    void acceptsFourDigitPassword() {
        assertTrue(LoginValidator.isValidPassword("1234"));
    }

    @Test
    void acceptsSixDigitPassword() {
        assertTrue(LoginValidator.isValidPassword("123456"));
    }

    @Test
    void rejectsLetters() {
        assertFalse(LoginValidator.isValidPassword("12ab"));
    }

    @Test
    void rejectsThreeDigits() {
        assertFalse(LoginValidator.isValidPassword("123"));
    }

    @Test
    void rejectsNull() {
        assertFalse(LoginValidator.isValidPassword(null));
    }
}