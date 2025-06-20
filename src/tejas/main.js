document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Typing effect
    const typed = new Typed('.typed-text', {
        strings: ['', 'Pentester', 'Bug Hunter', 'CTF Player'],
        typeSpeed: 50,
        backSpeed: 30,
        loop: true
    });

    // Scroll progress bar
    window.addEventListener('scroll', () => {
        const scrollProgress = document.querySelector('.scroll-progress');
        const scrollTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (window.scrollY / scrollTotal) * 100;
        scrollProgress.style.width = scrollPercentage + '%';
    });

    // Terminal toggle button
    const terminalToggle = document.querySelector('.terminal-toggle');
    const terminal = document.querySelector('.terminal');
    const terminalInput = document.querySelector('.terminal-input');
    
    terminalToggle.addEventListener('click', () => {
        terminal.classList.toggle('active');
        if (terminal.classList.contains('active')) {
            terminalInput.focus();
        }
    });

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light' || (!currentTheme && !prefersDarkScheme.matches)) {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.getAttribute('data-theme') === 'light') {
            document.body.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        }
    });

    // Terminal Easter Egg
    const terminalClose = document.querySelector('.terminal-close');
    const terminalBody = document.querySelector('.terminal-body');

    // Open terminal with secret key combination
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.altKey && e.key === 't') {
            terminal.classList.add('active');
            terminalInput.focus();
        }
    });

    // Close terminal
    terminalClose.addEventListener('click', () => {
        terminal.classList.remove('active');
    });

    // Terminal command handler function
    function handleTerminalCommand(command) {
        let output = '';
    
        switch (command.toLowerCase()) {
            case 'help':
                output = `Available commands:
    - about: Learn about me
    - skills: View my skills
    - projects: See my projects
    - contact: Get in touch
    - clear: Clear terminal
    - theme: Toggle light/dark mode`;
                break;
            case 'about':
                output = `I'm Tejas Javali, a cybersecurity professional currently pursuing a Master's in Cybersecurity at Coventry University.
    I’m passionate about penetration testing, incident response, and securing digital infrastructures.`;
                break;
            case 'skills':
                output = `My key skills include:
    - Penetration Testing
    - Vulnerability Assessment
    - Incident Response
    - SIEM (ELK Stack)
    - Metasploit, Burp Suite, Nmap, OWASP ZAP, Kali Linux
    - Bash, Java, SQL`;
                break;
            case 'projects':
                output = `Notable projects:
    1. Secure Website for JKL Healthcare (HIPAA compliant, OWASP mitigated)
       GitHub: https://github.com/novisdraco/jkl-healthcare-service-api.git
    2. Ethical Hacking PenTest Project (20+ vulnerabilities found)
       Report: https://drive.google.com/file/d/1MyNFEdYjZsUVKA_CwEgh9MxAa9fAOUz9/view?usp=sharing`;
                break;
            case 'contact':
                output = `You can reach me at:
    - Email: tejasjavali02@gmail.com
    - LinkedIn: linkedin.com/in/tejasjavali02`;
                break;
            case 'clear':
                terminalBody.querySelectorAll('.terminal-output').forEach(el => el.remove());
                return '';
            case 'theme':
                themeToggle.click();
                output = 'Theme toggled successfully.';
                break;
            case '':
                return '';
            default:
                output = `Command not found: ${command}. Type 'help' for available commands.`;
        }
    
        return output;
    }
    

    // Terminal input handler
    function handleTerminalInput(e) {
        if (e.key === 'Enter') {
            const command = this.value.trim();
            this.value = '';
            
            const output = handleTerminalCommand(command);
            
            if (output) {
                const outputDiv = document.createElement('div');
                outputDiv.classList.add('terminal-output');
                outputDiv.textContent = output;
                terminalBody.appendChild(outputDiv);
            }
            
            const promptDiv = document.createElement('div');
            promptDiv.classList.add('terminal-prompt');
            promptDiv.innerHTML = `<span class="terminal-user">user@portfolio:~$</span>
                                  <input type="text" class="terminal-input">`;
            
            terminalBody.appendChild(promptDiv);
            
            // Remove the old prompt
            this.parentElement.remove();
            
            // Focus on the new input and add event listener
            const newInput = terminalBody.querySelector('.terminal-input:last-of-type');
            newInput.focus();
            newInput.addEventListener('keydown', handleTerminalInput);
        }
    }

    // Initial terminal input listener
    terminalInput.addEventListener('keydown', handleTerminalInput);

    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // Initialize Rellax for parallax effects
    const rellax = new Rellax('.rellax', {
        center: true
    });

    // Initialize VanillaTilt for project cards
    VanillaTilt.init(document.querySelectorAll(".project-card"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
    });



    const form = document.getElementById('form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
    
        if (!name || !email || !message) {
            alert('Please fill in all fields');
            return;
        }
    
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }
    
        // Submit to Formspree
        try {
            const res = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });
    
            if (res.ok) {
                alert('Message sent successfully!');
                form.reset();
            } else {
                alert('There was a problem sending your message.');
            }
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again later.');
        }
    });
    

});