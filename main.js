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
    
    // Role selection handling
    const roleCards = document.querySelectorAll('.role-card');
    const roleActions = document.getElementById('roleActions');
    const roleTitle = document.getElementById('roleTitle');
    const roleDescription = document.getElementById('roleDescription');
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const changeRoleBtn = document.getElementById('changeRoleBtn');
    let selectedRole = '';
    
    roleCards.forEach(card => {
      card.addEventListener('click', function() {
        selectedRole = this.dataset.role;
        
        // Update role titles and descriptions
        switch(selectedRole) {
          case 'patient':
            roleTitle.textContent = 'Patient Portal';
            roleDescription.textContent = 'Upload prescriptions, reports, scans, and track your health';
            break;
          case 'doctor':
            roleTitle.textContent = 'Doctor Portal';
            roleDescription.textContent = 'Access complete patient records and medical history';
            break;
          case 'caregiver':
            roleTitle.textContent = 'Caregiver Portal';
            roleDescription.textContent = 'Help manage patient records and appointments';
            break;
        }
        
        // Show role actions, hide role cards
        document.querySelector('.role-cards').style.display = 'none';
        document.querySelector('.role-selection h2').style.display = 'none';
        roleActions.classList.remove('hidden');
        
        // Update login and register links with role parameter
        loginBtn.href = `login.html?role=${selectedRole}`;
        registerBtn.href = `register.html?role=${selectedRole}`;
      });
    });
    
    // Change role button
    if (changeRoleBtn) {
      changeRoleBtn.addEventListener('click', function() {
        roleActions.classList.add('hidden');
        document.querySelector('.role-cards').style.display = 'grid';
        document.querySelector('.role-selection h2').style.display = 'block';
        selectedRole = '';
      });
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
  });
  