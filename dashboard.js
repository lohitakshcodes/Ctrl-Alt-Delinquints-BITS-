document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      window.location.href = 'login.html';
      return;
    }
    
    // Set user data
    const userName = localStorage.getItem('userName') || 'User Name';
    const userRole = localStorage.getItem('userRole') || 'User';
    
    const userNameElements = document.querySelectorAll('#userName, #sidebarUserName');
    const userRoleElements = document.querySelectorAll('#sidebarUserRole');
    
    userNameElements.forEach(el => {
      if (el) el.textContent = userName;
    });
    
    userRoleElements.forEach(el => {
      if (el) {
        let roleText = 'User';
        switch(userRole) {
          case 'doctor':
            roleText = 'Healthcare Provider';
            break;
          case 'patient':
            roleText = 'Patient';
            break;
          case 'caregiver':
            roleText = 'Caregiver';
            break;
        }
        el.textContent = roleText;
      }
    });
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
        window.location.href = 'login.html';
      });
    }
    
    // Theme toggling
    const themeToggleBtn = document.getElementById('themeToggle');
    if (themeToggleBtn) {
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
    }
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (menuToggle && sidebar) {
      menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('active');
      });
    }
    
    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    if (tabButtons.length > 0) {
      tabButtons.forEach(button => {
        button.addEventListener('click', function() {
          const tabId = this.dataset.tab;
          
          // Hide all tab contents
          document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
          });
          
          // Deactivate all tab buttons
          tabButtons.forEach(btn => {
            btn.classList.remove('active');
          });
          
          // Activate selected tab and content
          this.classList.add('active');
          document.getElementById(`${tabId}Tab`).classList.add('active');
        });
      });
    }
    
    // Patient search
    const patientSearch = document.getElementById('patientSearch');
    if (patientSearch) {
      patientSearch.addEventListener('input', function() {
        const searchValue = this.value.toLowerCase();
        const tableRows = document.querySelectorAll('#patientTableBody tr');
        
        tableRows.forEach(row => {
          const patientName = row.cells[0].textContent.toLowerCase();
          const email = row.querySelector('.email')?.textContent.toLowerCase() || '';
          const phone = row.cells[3]?.textContent.toLowerCase() || '';
          
          if (patientName.includes(searchValue) || email.includes(searchValue) || phone.includes(searchValue)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    }
  });