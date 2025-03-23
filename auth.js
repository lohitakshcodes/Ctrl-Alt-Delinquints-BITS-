document.addEventListener('DOMContentLoaded', function() {
    // Theme toggling
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
    
    themeToggleBtn.addEventListener('click', function() {
      document.documentElement.classList.toggle('dark');
      
      if (document.documentElement.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
      } else {
        localStorage.setItem('theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
      }
    });
    
    // Get role from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role');
    
    // Set page title based on role
    const loginTitle = document.getElementById('loginTitle');
    const registerTitle = document.getElementById('registerTitle');
    
    // Update login/register links to pass role
    const loginLink = document.getElementById('loginLink');
    const registerLink = document.getElementById('registerLink');
    
    if (role) {
      if (loginTitle) {
        switch(role) {
          case 'patient':
            loginTitle.textContent = 'Patient Sign In';
            break;
          case 'doctor':
            loginTitle.textContent = 'Doctor Sign In';
            break;
          case 'caregiver':
            loginTitle.textContent = 'Caregiver Sign In';
            break;
          default:
            loginTitle.textContent = 'Sign In';
        }
      }
      
      if (registerTitle) {
        switch(role) {
          case 'patient':
            registerTitle.textContent = 'Patient Registration';
            break;
          case 'doctor':
            registerTitle.textContent = 'Doctor Registration';
            break;
          case 'caregiver':
            registerTitle.textContent = 'Caregiver Registration';
            break;
          default:
            registerTitle.textContent = 'Create an account';
        }
        
        // Set the correct radio button
        const roleRadios = document.querySelectorAll('input[name="role"]');
        roleRadios.forEach(radio => {
          if (radio.value === role) {
            radio.checked = true;
          }
        });
      }
      
      // Update links
      if (loginLink) {
        loginLink.href = `login.html?role=${role}`;
      }
      
      if (registerLink) {
        registerLink.href = `register.html?role=${role}`;
      }
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const loginButton = document.getElementById('loginButton');
        
        // Validate inputs
        if (!email || !password) {
          alert('Please fill in all fields');
          return;
        }
        
        // Simulate login API call
        loginButton.textContent = 'Signing in...';
        loginButton.disabled = true;
        
        setTimeout(() => {
          // Store auth data in localStorage (in a real app, you would store the token)
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('userRole', role || 'patient');
          localStorage.setItem('userName', 'Dr. Sarah Johnson');
          
          // Show success message and redirect
          alert('Login successful!');
          window.location.href = 'dashboard.html';
        }, 1000);
      });
    }
    
    // Register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const selectedRole = document.querySelector('input[name="role"]:checked').value;
        const registerButton = document.getElementById('registerButton');
        
        // Validate inputs
        if (!name || !email || !password || !confirmPassword) {
          alert('Please fill in all fields');
          return;
        }
        
        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        
        // Simulate register API call
        registerButton.textContent = 'Creating account...';
        registerButton.disabled = true;
        
        setTimeout(() => {
          // Store auth data in localStorage (in a real app, you would store the token)
          localStorage.setItem('token', 'fake-jwt-token');
          localStorage.setItem('userRole', selectedRole);
          localStorage.setItem('userName', name);
          
          // Show success message and redirect
          alert('Registration successful!');
          window.location.href = 'dashboard.html';
        }, 1000);
      });
    }
  });
  