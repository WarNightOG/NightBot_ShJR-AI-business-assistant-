document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const authContainer = document.getElementById("auth-container");
    const chatbox = document.getElementById("chatbox");
    const authButton = document.getElementById("auth-button");
    const toggleAuth = document.getElementById("toggle-auth");
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const phoneInput = document.getElementById("phone");
    const ageInput = document.getElementById("age");
  
    let isRegistering = false;
  
    // List of products for demonstration
    const products = {
        "flower": { name: "Flower", price: "$100", description: "A beautiful flower." },
        "NightBot.": { name: "Aoa", price: "", description: "Aoa. Do you have any question about SHJR?" },
        "NightBot": { name: "Hi", price: "", description: "Aoa. Do you have any question about SHJR" },
        "laptop": { name: "laptop", price: "$100", description: "Laptop has too much power" },
        "NightBot.": { name: "Aoa", price: "", description: "Aoa. Do you have any question about SHJR?" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },
        "NightBot": { name: "", price: "", description: "Aoa. Do you have any question about SHJR" },

    
    
    };
  
    // Show chat UI if user is logged in
    if (localStorage.getItem("loggedInUser")) {
      showChat();
    }
  
    // Toggle between Login and Register
    toggleAuth.addEventListener("click", () => {
      isRegistering = !isRegistering;
      document.getElementById("auth-title").textContent = isRegistering ? "Register" : "Login";
      authButton.textContent = isRegistering ? "Register" : "Login";
      toggleAuth.innerHTML = isRegistering
        ? 'Already have an account? <span>Login here</span>'
        : 'Don\'t have an account? <span>Register here</span>';
    });
  
    // Handle Login or Registration
    authButton.addEventListener("click", () => {
      const email = emailInput.value.trim();
      const username = usernameInput.value.trim();
      const password = passwordInput.value.trim();
      const phone = phoneInput.value.trim();
      const age = ageInput.value.trim();
  
      if (!email || !username || !password) {
        alert("Please enter email, username, and password.");
        return;
      }
  
      if (isRegistering) {
        // Registration requires email, username, password, phone, and age
        if (!phone || !age) {
          alert("Please enter your phone number and age.");
          return;
        }
  
        // Store user data as a JSON string
        const userData = { email, username, password, phone, age };
        localStorage.setItem(username, JSON.stringify(userData));
        alert("Registration successful! Please login.");
        toggleAuth.click(); // Switch back to login mode
      } else {
        // Login: Check if user exists
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
          localStorage.setItem("loggedInUser", username);
          showChat();
        } else {
          alert("Invalid credentials!");
        }
      }
    });
  
    // Show Chat UI and hide Auth container
    function showChat() {
      authContainer.style.display = "none";
      chatbox.style.display = "flex";
    }
  
    // Function to add a message to the chat window
    function addMessage(sender, message) {
      const messageDiv = document.createElement("div");
      messageDiv.classList.add(sender === "bot" ? "bot-message" : "user-message");
      messageDiv.textContent = message;
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  
    // Handle product-related queries
    function handleProductQuery(query) {
      const lowerQuery = query.toLowerCase();
  
      for (const key in products) {
        const product = products[key];
        if (lowerQuery.includes(product.name.toLowerCase())) {
          return `${product.name}: ${product.description} Price: ${product.price}`;
        }
      }
  
      return "Sorry, I don't understand that. Can you clarify?";
    }
  
    // Handle sending messages
    sendButton.addEventListener("click", () => {
      const userText = userInput.value.trim();
      if (!userText) return;
  
      addMessage("user", userText);
      userInput.value = "";
  
      // Check if the query is product-related and respond accordingly
      const productQueryResponse = handleProductQuery(userText);
      setTimeout(() => addMessage("bot", productQueryResponse), 500);
    });
  
    // Send message when Enter key is pressed
    userInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendButton.click();
      // CHANGES NOW!
      authButton.addEventListener("click", async () => {
        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const phone = phoneInput.value.trim();
        const age = ageInput.value.trim();
    
        if (!email || !username || !password || !phone || !age) {
            alert("Please fill in all fields.");
            return;
        }
    
        if (isRegistering) {
            // Send registration data to the server
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, username, password, phone, age }),
            });
    
            const data = await response.json();
            alert(data.message);
            if (response.ok) toggleAuth.click(); // Switch back to login mode
        }
    });
    
      
    });
  });
  