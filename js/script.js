// Welcome message with user's name - WITHOUT localStorage
window.addEventListener('load', function() {
	// Prompt for name on first load
	let userName = prompt('Masukkan nama Anda:');
    
	if (userName && userName.trim() !== '') {
		userName = userName.trim();
	} else {
		userName = 'Guest';
	}
    
	const welcomeMessage = document.getElementById('welcomeMessage');
	if (welcomeMessage) {
		welcomeMessage.textContent = `Hi ${userName}, Welcome To Website`;
	} else {
		console.warn('Element #welcomeMessage tidak ditemukan di HTML.');
	}

	// Sekarang semua akses DOM aman dilakukan di sini
	const form = document.getElementById('messageForm');
	const resultDisplay = document.getElementById('resultDisplay');

	// Jika form tidak ada, jangan coba pasang listener submit (hindari crash)
	if (form && resultDisplay) {
		form.addEventListener('submit', function(e) {
			e.preventDefault();
			
			// Get form values
			const name = document.getElementById('name').value.trim();
			const email = document.getElementById('email').value.trim();
			const phone = document.getElementById('phone').value.trim();
			const message = document.getElementById('message').value.trim();
			
			// Validate inputs
			if (!validateForm(name, email, phone, message)) {
				return;
			}
			
			// Get current timestamp
			const currentTime = new Date();
			const timeString = currentTime.toLocaleString('en-US', {
				weekday: 'short',
				month: 'short',
				day: '2-digit',
				year: 'numeric',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
				timeZone: 'Asia/Jakarta',
				timeZoneName: 'short'
			});
			
			// Display result
			displayResult(timeString, name, email, phone, message);
			
			// Reset field colors after successful submit
			resetFieldColors();
			
			// Show success message
			alert('Data berhasil dikirim!');
			
			// Optional: Reset form
			form.reset();
		});
	} else {
		console.warn('Element #messageForm atau #resultDisplay tidak ditemukan. Listener submit tidak dipasang.');
	}

	// Pasang feedback real-time hanya bila elemen ada
	const nameEl = document.getElementById('name');
	if (nameEl) {
		nameEl.addEventListener('blur', function() {
			const name = this.value.trim();
			if (name !== '' && name.length < 2) {
				this.style.borderColor = '#dc3545';
			} else if (name !== '') {
				const nameRegex = /^[a-zA-Z\s]+$/;
				if (!nameRegex.test(name)) {
					this.style.borderColor = '#dc3545';
				} else {
					this.style.borderColor = '#4CAF50';
				}
			} else {
				this.style.borderColor = '#999';
			}
		});
		
		nameEl.addEventListener('input', function() {
			if (this.style.borderColor === 'rgb(220, 53, 69)') {
				this.style.borderColor = '#999';
			}
		});
	} else {
		console.warn('Input #name tidak ditemukan.');
	}

	const emailEl = document.getElementById('email');
	if (emailEl) {
		emailEl.addEventListener('blur', function() {
			const email = this.value.trim();
			if (email !== '') {
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(email)) {
					this.style.borderColor = '#dc3545';
				} else {
					this.style.borderColor = '#4CAF50';
				}
			} else {
				this.style.borderColor = '#999';
			}
		});
		
		emailEl.addEventListener('input', function() {
			if (this.style.borderColor === 'rgb(220, 53, 69)') {
				this.style.borderColor = '#999';
			}
		});
	} else {
		console.warn('Input #email tidak ditemukan.');
	}

	const phoneEl = document.getElementById('phone');
	if (phoneEl) {
		phoneEl.addEventListener('blur', function() {
			const phone = this.value.trim();
			if (phone !== '') {
				const phoneRegex = /^(08|62|02)\d{8,12}$/;
				if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
					this.style.borderColor = '#dc3545';
				} else {
					this.style.borderColor = '#4CAF50';
				}
			} else {
				this.style.borderColor = '#999';
			}
		});
		
		phoneEl.addEventListener('input', function() {
			if (this.style.borderColor === 'rgb(220, 53, 69)') {
				this.style.borderColor = '#999';
			}
		});
	} else {
		console.warn('Input #phone tidak ditemukan.');
	}

	const messageEl = document.getElementById('message');
	if (messageEl) {
		messageEl.addEventListener('blur', function() {
			const message = this.value.trim();
			if (message !== '' && message.length < 10) {
				this.style.borderColor = '#dc3545';
			} else if (message !== '') {
				this.style.borderColor = '#4CAF50';
			} else {
				this.style.borderColor = '#999';
			}
		});
		
		messageEl.addEventListener('input', function() {
			if (this.style.borderColor === 'rgb(220, 53, 69)') {
				this.style.borderColor = '#999';
			}
		});
	} else {
		console.warn('Textarea #message tidak ditemukan.');
	}

	// Smooth scrolling and nav link behavior (aman karena querySelectorAll selalu mengembalikan NodeList)
	document.querySelectorAll('.nav-link').forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			
			const targetId = this.getAttribute('href');
			if (targetId && targetId.startsWith('#')) {
				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					targetElement.scrollIntoView({
						behavior: 'smooth',
						block: 'start'
					});
				}
			}
			
			// Update active link
			document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
			this.classList.add('active');
		});
	});

	// Update active navigation on scroll
	window.addEventListener('scroll', () => {
		let current = '';
		const sections = document.querySelectorAll('section');
		
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (pageYOffset >= (sectionTop - 150)) {
				current = section.getAttribute('id');
			}
		});
		
		document.querySelectorAll('.nav-link').forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
	});

}); // end window.load

// Validation function
function validateForm(name, email, phone, message) {
    // Validate name
    if (name === '') {
        alert('Nama harus diisi!');
        document.getElementById('name').focus();
        return false;
    }
    
    if (name.length < 2) {
        alert('Nama harus minimal 2 karakter!');
        document.getElementById('name').focus();
        return false;
    }
    
    // Validate name (only letters and spaces)
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
        alert('Nama hanya boleh berisi huruf dan spasi!');
        document.getElementById('name').focus();
        return false;
    }
    
    // Validate email
    if (email === '') {
        alert('Email harus diisi!');
        document.getElementById('email').focus();
        return false;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid! Contoh: nama@email.com');
        document.getElementById('email').focus();
        return false;
    }
    
    // Validate phone number
    if (phone === '') {
        alert('Nomor telepon harus diisi!');
        document.getElementById('phone').focus();
        return false;
    }
    
    // Phone number validation (Indonesian format)
    const phoneRegex = /^(08|62|02)\d{8,12}$/;
    if (!phoneRegex.test(phone.replace(/[-\s]/g, ''))) {
        alert('Format nomor telepon tidak valid! Contoh: 08123456789 atau 02112345678');
        document.getElementById('phone').focus();
        return false;
    }
    
    // Validate message
    if (message === '') {
        alert('Pesan harus diisi!');
        document.getElementById('message').focus();
        return false;
    }
    
    if (message.length < 10) {
        alert('Pesan harus minimal 10 karakter!');
        document.getElementById('message').focus();
        return false;
    }
    
    return true;
}

// Display result function - FIXED: Menambahkan definisi resultDisplay
function displayResult(currentTime, name, email, phone, message) {
    const resultDisplay = document.getElementById('resultDisplay');
    
    if (resultDisplay) {
        resultDisplay.innerHTML = `
            <p><strong>Current time</strong> : ${currentTime}</p>
            <p><strong>Name</strong> : ${name}</p>
            <p><strong>Email</strong> : ${email}</p>
            <p><strong>Phone Number</strong> : ${phone}</p>
            <p><strong>Message</strong> : ${message}</p>
        `;
    } else {
        console.warn('Element #resultDisplay tidak ditemukan.');
    }
}

// Function to reset field colors
function resetFieldColors() {
    const nameEl = document.getElementById('name');
    const emailEl = document.getElementById('email');
    const phoneEl = document.getElementById('phone');
    const messageEl = document.getElementById('message');
    
    if (nameEl) nameEl.style.borderColor = '#999';
    if (emailEl) emailEl.style.borderColor = '#999';
    if (phoneEl) phoneEl.style.borderColor = '#999';
    if (messageEl) messageEl.style.borderColor = '#999';
}