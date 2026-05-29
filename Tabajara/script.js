document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    const toggleBtn = document.getElementById('togglePassword');
    const loginBtn = document.getElementById('loginBtn');
    const rememberCheck = document.getElementById('rememberCheck');
    const forgotLink = document.getElementById('forgotPassword');

    // Auto-focus no primeiro campo
    emailInput.focus();

    // Toggle de visibilidade da senha
    toggleBtn.addEventListener('click', () => {
        const isPassword = passwordInput.type === 'password';
        passwordInput.type = isPassword ? 'text' : 'password';
        toggleBtn.innerHTML = isPassword ?
            '<i class="fas fa-eye-slash"></i>' :
            '<i class="fas fa-eye"></i>';
    });

    // Validação simples
    function validateForm() {
        let valid = true;

        if (emailInput.value.trim() === '') {
            emailInput.classList.add('error');
            valid = false;
        } else {
            emailInput.classList.remove('error');
        }

        if (passwordInput.value.length < 4) {
            passwordInput.classList.add('error');
            valid = false;
        } else {
            passwordInput.classList.remove('error');
        }

        return valid;
    }

    // Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Loading
        const originalText = loginBtn.textContent;
        loginBtn.disabled = true;
        loginBtn.textContent = 'Entrando...';

        setTimeout(() => {
            alert('✅ Login realizado com sucesso! (Simulação)');
            loginBtn.disabled = false;
            loginBtn.textContent = originalText;

            // Resetar formulário (opcional)
            // form.reset();
        }, 1400);
    });

    // Lembrar usuário
    if (localStorage.getItem('rememberTabajara') === 'true') {
        emailInput.value = localStorage.getItem('emailTabajara') || '';
        rememberCheck.checked = true;
    }

    rememberCheck.addEventListener('change', () => {
        if (rememberCheck.checked && emailInput.value.trim()) {
            localStorage.setItem('emailTabajara', emailInput.value.trim());
            localStorage.setItem('rememberTabajara', 'true');
        } else {
            localStorage.removeItem('emailTabajara');
            localStorage.removeItem('rememberTabajara');
        }
    });

    // Link "Esqueci a senha"
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (emailInput.value.trim()) {
            alert(`Link de recuperação enviado para: ${emailInput.value}`);
        } else {
            alert('Digite seu e-mail ou CPF para recuperar a senha.');
            emailInput.focus();
        }
    });
});