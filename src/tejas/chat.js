document.addEventListener("DOMContentLoaded", function () {
  const chatToggle = document.querySelector(".chat-toggle");
  const chatbot = document.querySelector(".chatbot");
  const chatClose = document.querySelector(".chat-close");

  const chatBody = document.getElementById("chat-body");
  const userInput = document.getElementById("user-input");
  const sendButton = document.getElementById("send-button");

  const typingIndicator = document.createElement("div");
  typingIndicator.className = "typing";
  typingIndicator.innerHTML = "<span></span><span></span><span></span>";

  const API_KEY = "AIzaSyByscmFIsIPlLx_k_62y2qSPcs2FJpASGM"; // Replace this
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  const systemPrompt = `You are a friendly and knowledgeable AI chatbot trained exclusively on the professional portfolio of Tejas Javali.

🎯 Behavior Guidelines:
• If someone says "hi", "hello", or greets you — respond with a friendly greeting.
• If someone says "thank you", "thanks", or shows appreciation — reply warmly and politely (e.g., "You're most welcome!" or "Glad I could help!").
• Only provide answers based strictly on Tejas Javali’s portfolio. Do not add or assume anything not mentioned.
• If someone asks a question unrelated to Tejas Javali’s portfolio, respond with:
👉 "I’m specially trained to provide details about Tejas Javali’s work and background. But I can still try to answer your question if you’d like!" and answer it immediately. Don't wait for fallback.

📌 Your Purpose:
Speak clearly and concisely, as if you are introducing or representing Tejas Javali to recruiters, collaborators, or curious visitors. Provide enhanced, well-structured answers.

📂 Portfolio Data You Know:
👤 Name: Tejas Javali
🎯 Role: Cybersecurity Professional
A cybersecurity professional with a Master's in Cybersecurity from Coventry University. Skilled in penetration testing, incident response, and vulnerability assessment. Seeking a Cybersecurity Analyst role to enhance digital security and mitigate threats.

🛠 Key Skills:
Technical:

Metasploit, Burp Suite, Nmap, OWASP ZAP, Kali Linux, SIEM (ELK Stack), Bash, Java, SQL.
Soft Skills:

Problem-Solving, Team Collaboration, Incident Response, Communication, Adaptability.

Gained teamwork and time management skills as a Warehouse Operative at Amazon, Banbury.
Certifications:

Trained for CompTIA Security+, eJPT, and CEH.

🎓 Education:
Master’s in Cybersecurity – Coventry University, United Kingdom | 09/2024 – Present

Bachelor of Engineering in Computer Science – Government Engineering College Raichur, India | GPA: 8/10 | 03/2020 – 04/2024

💼 Experience:
Technosoft, Cybersecurity Intern | Mar–May 2024

Developed a privacy-preserving approach with GAN and DP, securing 2000+ user data.

Implemented security measures securing sensitive records, maintaining data privacy within web applications effectively.

Collaboration with 5 team members integrated encryption techniques, enhancing application security by 30%.

Internship Details

Externs Club, Cybersecurity Intern | Mar–May 2023

Conducted vulnerability assessments using Nessus and OpenVAS, identifying over 15 critical risks.

Improved security response time by 25% by analyzing logs and drafting incident reports in Splunk.

Conducted 3 phishing campaigns, enhancing employee security awareness by 40%.

Internship Details

Infidata Technologies, Internship | Aug–Sep 2023

Launched a Java-based web application, securing a 10% increase in user engagement for "Resell and Buy Things".

Reduced security breaches by 30% through vulnerability patching and plugin upgrades.

Enhanced security compliance by 20% by training 100+ users in multi-factor authentication.

Internship Details

💻 Projects:
Secure Website Development for JKL Healthcare Services – Coventry University | 09/2024 – 11/2024

Achieved HIPAA compliance with zero critical vulnerabilities in Nessus audit, improving patient data security by 80%.

Mitigated OWASP Top 10 risks, including SQLi and XSS.

Repository Link

Ethical Hacking Penetration Testing Project – Coventry University | Dec 2024

Identified 20+ vulnerabilities during professional penetration test, resulting in a 25% security improvement.

Analyzed 2 different systems via reconnaissance, increasing awareness of vulnerabilities detected by 50%.

Report Link

🌐 Links:
LinkedIn: https://www.linkedin.com/in/tejasjavali02

Email: tejasjavali02@gmail.com

🗣 Languages Spoken:
English (Native)

Hindi (Native)

🎖 Certifications:
Trained for CompTIA Security+, eJPT, and CEH.

🎨 Interests and Hobbies:
Enjoys reading cybersecurity blogs, attending security conferences, and participating in CTF (Capture the Flag) competitions.
    `;

  // Event listeners for toggle and close
  chatToggle.addEventListener("click", () => {
    chatbot.classList.toggle("active");
  });

  chatClose.addEventListener("click", () => {
    chatbot.classList.remove("active");
  });

  // Function to format bot's text for bold, italic, line breaks, and links
  function formatText(text) {
    // Bold formatting: wrap text between ** or __ with <strong> tag
    text = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    text = text.replace(/__(.*?)__/g, "<strong>$1</strong>");

    // Italic formatting: wrap text between * or _ with <em> tag
    text = text.replace(/\*(.*?)\*/g, "<em>$1</em>");
    text = text.replace(/_(.*?)_/g, "<em>$1</em>");

    // Line breaks: replace newlines with <br> tags
    text = text.replace(/\n/g, "<br>");

    // Hyperlinks: wrap URLs in <a> tag
    text = text.replace(/(https?:\/\/[^\s<>"'`]*[^\s<>"'`.,;!?])/g, (url) => {
      const displayText = url.length > 30 ? url.slice(0, 30) + "…" : url;
      return `<a href="${url}" target="_blank" style="color:#1a73e8;">${displayText}</a>`;
    });

    return text;
  }

  // Function to send the message to Gemini
  async function sendMessageToGemini(message) {
    chatBody.appendChild(typingIndicator);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${systemPrompt}\n\nUser: ${message}\n\nCyberBot:`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      chatBody.removeChild(typingIndicator);

      // Get and format the bot's reply
      const botReply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn't process that.";
      const formattedReply = formatText(botReply); // Format the reply
      appendMessage(formattedReply, "bot-message");
    } catch (error) {
      chatBody.removeChild(typingIndicator);
      appendMessage(
        "Error contacting CyberBot. Please try again later.",
        "bot-message"
      );
      console.error(error);
    }
  }

  // Function to append messages to the chat
  function appendMessage(text, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.innerHTML = text; // Use innerHTML to allow formatted content
    chatBody.appendChild(messageDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Event listener for the send button
  sendButton.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
      appendMessage(message, "user-message");
      userInput.value = "";
      sendMessageToGemini(message);
    }
  });

  // Event listener for Enter key to send message
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      sendButton.click();
    }
  });
});
