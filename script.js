// Ждём, пока страница полностью загрузится
document.addEventListener('DOMContentLoaded', function() {
    
    // Находим форму и все поля
    const form = document.getElementById('registerForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput = document.getElementById('confirmPassword');
    
    // Находим блоки для ошибок
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmError = document.getElementById('confirmError');
    const successMessage = document.getElementById('formSuccess');
    
    // Функция показа ошибки
    function showError(element, message) {
        element.textContent = message;
        element.classList.add('show');
    }
    
    // Функция скрытия ошибки
    function hideError(element) {
        element.textContent = '';
        element.classList.remove('show');
    }
    
    // Функция отметки поля как невалидного
    function markInvalid(input) {
        input.classList.add('invalid');
    }
    
    // Функция снятия отметки
    function markValid(input) {
        input.classList.remove('invalid');
    }
    
    // ВАЛИДАЦИЯ ИМЕНИ
    function validateName() {
        const name = nameInput.value.trim();
        
        if (name === '') {
            showError(nameError, 'Введите ваше имя');
            markInvalid(nameInput);
            return false;
        }
        
        if (name.length < 2) {
            showError(nameError, 'Имя должно содержать минимум 2 символа');
            markInvalid(nameInput);
            return false;
        }
        
        hideError(nameError);
        markValid(nameInput);
        return true;
    }
    
    // ВАЛИДАЦИЯ EMAIL
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        
        if (email === '') {
            showError(emailError, 'Введите ваш email');
            markInvalid(emailInput);
            return false;
        }
        
        if (!emailPattern.test(email)) {
            showError(emailError, 'Введите корректный email (например, name@domain.com)');
            markInvalid(emailInput);
            return false;
        }
        
        hideError(emailError);
        markValid(emailInput);
        return true;
    }
    
    // ВАЛИДАЦИЯ ПАРОЛЯ
    function validatePassword() {
        const password = passwordInput.value;
        
        if (password === '') {
            showError(passwordError, 'Введите пароль');
            markInvalid(passwordInput);
            return false;
        }
        
        if (password.length < 6) {
            showError(passwordError, 'Пароль должен содержать минимум 6 символов');
            markInvalid(passwordInput);
            return false;
        }
        
        hideError(passwordError);
        markValid(passwordInput);
        return true;
    }
    
    // ВАЛИДАЦИЯ ПОДТВЕРЖДЕНИЯ ПАРОЛЯ
    function validateConfirm() {
        const password = passwordInput.value;
        const confirm = confirmInput.value;
        
        if (confirm === '') {
            showError(confirmError, 'Подтвердите пароль');
            markInvalid(confirmInput);
            return false;
        }
        
        if (password !== confirm) {
            showError(confirmError, 'Пароли не совпадают');
            markInvalid(confirmInput);
            return false;
        }
        
        hideError(confirmError);
        markValid(confirmInput);
        return true;
    }
    
    // ПРОВЕРКА ВСЕХ ПОЛЕЙ СРАЗУ
    function validateForm() {
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmValid = validateConfirm();
        
        return isNameValid && isEmailValid && isPasswordValid && isConfirmValid;
    }
    
    // ВЕШАЕМ ПРОВЕРКИ ПРИ ВВОДЕ (валидация в реальном времени)
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        // Если меняем пароль, нужно перепроверить подтверждение
        if (confirmInput.value !== '') {
            validateConfirm();
        }
    });
    confirmInput.addEventListener('input', validateConfirm);
    
    // ОБРАБОТКА ОТПРАВКИ ФОРМЫ
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Отключаем реальную отправку
        
        // Скрываем предыдущее сообщение об успехе
        successMessage.classList.remove('show');
        
        // Проверяем все поля
        if (validateForm()) {
            // Если всё правильно — показываем сообщение
            successMessage.textContent = '✅ Регистрация успешна!';
            successMessage.classList.add('show');
            
            // Можно очистить форму (по желанию раскомментировать)
            // form.reset();
            // markValid(nameInput);
            // markValid(emailInput);
            // markValid(passwordInput);
            // markValid(confirmInput);
        } else {
            // Прокручиваем к первому полю с ошибкой
            const firstInvalid = document.querySelector('.invalid');
            if (firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
    
    // Дополнительная валидация при потере фокуса с поля
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    passwordInput.addEventListener('blur', validatePassword);
    confirmInput.addEventListener('blur', validateConfirm);
});
