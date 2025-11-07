// Welcome message
window.addEventListener('load', function() {
    let userName = localStorage.getItem('userName');
    if (!userName) {
        userName = prompt('Masukkan nama Anda:') || 'Guest';
        localStorage.setItem('userName', userName);
    }
    document.getElementById('welcomeMessage').textContent = 'Hi ' + userName + ', Welcome To Website';
});

// Form handler - SUPER SIMPLE VERSION
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('messageForm');
    
    form.onsubmit = function(event) {
        event.preventDefault();
        
        // Get values using .value directly
        const name = form.elements['name'].value;
        const email = form.elements['email'].value;
        const phone = form.elements['phone'].value;
        const message = form.elements['message'].value;
        
        console.log('RAW VALUES:', {name, email, phone, message});
        
        // Trim
        const n = name.trim();
        const e = email.trim();
        const p = phone.trim();
        const m = message.trim();
        
        console.log('TRIMMED:', {n, e, p, m, messageLength: m.length});
        
        // Simple validation
        if (n.length < 2) {
            alert('Name must be at least 2 characters!');
            return false;
        }
        
        if (!e.includes('@') || !e.includes('.')) {
            alert('Please enter a valid email!');
            return false;
        }
        
        if (p.length < 10) {
            alert('Phone number must be at least 10 digits!');
            return false;
        }
        
        if (m.length < 10) {
            alert('Message must be at least 10 characters! You entered: ' + m.length + ' characters');
            return false;
        }
        
        // Success - display result
        const now = new Date();
        const timeStr = now.toString();
        
        document.getElementById('resultDisplay').innerHTML = 
            '<p><strong>Current time</strong> : ' + timeStr + '</p>' +
            '<p><strong>Name</strong> : ' + n + '</p>' +
            '<p><strong>Email</strong> : ' + e + '</p>' +
            '<p><strong>Phone Number</strong> : ' + p + '</p>' +
            '<p><strong>Message</strong> : ' + m + '</p>';
        
        alert('Data berhasil dikirim!');
        return false;
    };
    
    // Navigation smooth scroll
    document.querySelectorAll('.nav-link').forEach(function(link) {
        link.onclick = function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({behavior: 'smooth'});
            }
        };
    });
});