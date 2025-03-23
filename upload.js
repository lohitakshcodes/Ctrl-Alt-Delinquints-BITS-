document.addEventListener('DOMContentLoaded', function() {
    // Check authentication (same as dashboard.js)
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = 'login.html';
      return;
    }
    
    // Set user data (same as dashboard.js)
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
    
    // File upload functionality
    const dropZone = document.getElementById('dropZone');
    const fileInput = document.getElementById('fileInput');
    const selectFilesBtn = document.getElementById('selectFilesBtn');
    const fileList = document.getElementById('fileList');
    const fileItems = document.getElementById('fileItems');
    const fileCount = document.getElementById('fileCount');
    const uploadForm = document.getElementById('uploadForm');
    const uploadBtn = document.getElementById('uploadBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    
    let files = [];
    
    // Handle file selection via button
    if (selectFilesBtn && fileInput) {
      selectFilesBtn.addEventListener('click', function() {
        fileInput.click();
      });
      
      fileInput.addEventListener('change', function() {
        handleFiles(this.files);
      });
    }
    
    // Handle drag and drop
    if (dropZone) {
      // Prevent default drag behaviors
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
      });
      
      // Highlight drop zone when dragging over it
      ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, function() {
          dropZone.classList.add('active');
        }, false);
      });
      
      ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, function() {
          dropZone.classList.remove('active');
        }, false);
      });
      
      // Handle dropped files
      dropZone.addEventListener('drop', function(e) {
        const dt = e.dataTransfer;
        const droppedFiles = dt.files;
        handleFiles(droppedFiles);
      }, false);
    }
    
    function preventDefaults(e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    function handleFiles(selectedFiles) {
      const newFiles = Array.from(selectedFiles);
      files = [...files, ...newFiles];
      updateFileList();
    }
    
    function updateFileList() {
      if (files.length > 0) {
        fileList.classList.remove('hidden');
        fileCount.textContent = `${files.length} ${files.length === 1 ? 'file' : 'files'}`;
        
        // Clear existing items
        fileItems.innerHTML = '';
        
        // Add file items
        files.forEach((file, index) => {
          const fileItem = document.createElement('div');
          fileItem.className = 'file-item';
          
          const fileSizeInMB = (file.size / 1024 / 1024).toFixed(2);
          
          fileItem.innerHTML = `
            <div class="file-item-icon">
              <i class="fas fa-file-check"></i>
            </div>
            <div class="file-item-info">
              <div class="file-item-name">${file.name}</div>
              <div class="file-item-size">${fileSizeInMB} MB</div>
            </div>
            <button type="button" class="btn-icon remove-file" data-index="${index}">
              <i class="fas fa-times"></i>
            </button>
          `;
          
          fileItems.appendChild(fileItem);
        });
        
        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-file').forEach(button => {
          button.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            files.splice(index, 1);
            updateFileList();
          });
        });
      } else {
        fileList.classList.add('hidden');
      }
    }
    
    // Handle form submission
    if (uploadForm) {
      uploadForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const patient = document.getElementById('patient').value;
        const documentType = document.getElementById('documentType').value;
        
        if (!patient) {
          alert('Please select a patient');
          return;
        }
        
        if (!documentType) {
          alert('Please select a document type');
          return;
        }
        
        if (files.length === 0) {
          alert('Please select at least one file to upload');
          return;
        }
        
        // Disable button and show loading state
        uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Uploading...';
        uploadBtn.disabled = true;
        
        // Simulate upload process
        setTimeout(() => {
          alert('Files uploaded successfully!');
          
          // Reset form
          uploadForm.reset();
          files = [];
          updateFileList();
          
          // Restore button
          uploadBtn.innerHTML = '<i class="fas fa-file-upload"></i> Upload Files';
          uploadBtn.disabled = false;
        }, 2000);
      });
    }
    
    // Handle cancel button
    if (cancelBtn) {
      cancelBtn.addEventListener('click', function() {
        window.history.back();
      });
    }
    
    // Other shared functionality (from dashboard.js)
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
  });
  