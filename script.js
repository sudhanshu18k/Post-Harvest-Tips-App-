document.addEventListener("DOMContentLoaded", () => {
    const cropData = {
      tomatoes: {
        emoji: "🍅",
        title: "Tomatoes",
        description: "Freshly harvested tomatoes can be stored in several ways depending on ripeness and intended use.",
        temperature: "13-21°C",
        humidity: "85-95%",
        life: "1-2 weeks",
        methods: [
          "Room temperature storage (for ripening)",
          "Refrigeration (for fully ripe tomatoes)",
          "Canning (for long-term preservation)",
          "Sun drying or dehydration",
          "Freezing (blanched or as sauce)"
        ]
      },
      maize: {
        emoji: "🌽",
        title: "Maize",
        description: "Maize should be dried to reduce moisture before storage to avoid fungal growth.",
        temperature: "10-15°C",
        humidity: "60-70%",
        life: "6-12 months",
        methods: [
          "Sun drying",
          "Hermetic storage",
          "Cool, dry storage in sacks",
          "Use of airtight containers"
        ]
      },
      potatoes: {
        emoji: "🥔",
        title: "Potatoes",
        description: "Store in dark, cool, and well-ventilated areas to avoid sprouting.",
        temperature: "4-10°C",
        humidity: "90-95%",
        life: "1-3 months",
        methods: [
          "Root cellar storage",
          "Ventilated crates",
          "Avoid refrigeration to prevent sugar buildup"
        ]
      },
      onions: {
        emoji: "🧅",
        title: "Onions",
        description: "Cure onions before storage and keep them in dry, well-ventilated places.",
        temperature: "0-4°C",
        humidity: "65-70%",
        life: "1-8 months",
        methods: [
          "Net bags or mesh sacks",
          "Avoid plastic bags",
          "Store in a dry, dark place"
        ]
      },
      rice: {
        emoji: "🍚",
        title: "Rice",
        description: "Rice should be kept in a dry and cool place to avoid spoilage.",
        temperature: "10-15°C",
        humidity: "50-60%",
        life: "6-12 months",
        methods: [
          "Store in sealed airtight containers",
          "Keep in a cool, dry place",
          "Use oxygen absorbers for long-term storage"
        ]
      },
      beans: {
        emoji: "🫘",
        title: "Beans",
        description: "Beans should be stored in dry, cool conditions to avoid mold and insect infestation.",
        temperature: "5-10°C",
        humidity: "60-70%",
        life: "6-12 months",
        methods: [
          "Store in airtight containers",
          "Keep in a cool, dark place",
          "Use dried beans for long-term storage"
        ]
      }
    };
  
    const searchBtn = document.getElementById("searchBtn");
    const input = document.getElementById("cropSearch");
    const resultContainer = document.getElementById("resultsContainer");
    const allMethodsBtn = document.getElementById("allMethodsBtn");
  
    async function fetchCropFromAPI(crop) {
      try {
        const response = await fetch(`/api/crops/${encodeURIComponent(crop)}`);
        if (!response.ok) throw new Error("Crop not found in API");
        const apiData = await response.json();
        return {
          emoji: apiData.emoji || "🌿",
          title: apiData.title,
          description: apiData.description,
          temperature: apiData.temperature,
          humidity: apiData.humidity,
          life: apiData.life,
          methods: apiData.methods
        };
      } catch (error) {
        return null;
      }
    }
  
    async function displayCrop(crop) {
      let data = cropData[crop];
      if (!data) {
        data = await fetchCropFromAPI(crop);
      }
  
      if (!data) {
        resultContainer.innerHTML = `<h2>Search Results</h2><p>No information found for "${crop}".</p>`;
        return;
      }
  
      const methodsList = data.methods.map(m => `<li>${m}</li>`).join("");
  
      resultContainer.innerHTML = `
        <h2>Search Results</h2>
        <div class="crop-result">
          <div class="crop-image">${data.emoji}</div>
          <div class="crop-info">
            <h3>${data.title}</h3>
            <p>${data.description}</p>
            <div class="storage-conditions">
              <div class="condition">
                <span>Temperature</span>
                <span>${data.temperature}</span>
              </div>
              <div class="condition">
                <span>Humidity</span>
                <span>${data.humidity}</span>
              </div>
              <div class="condition">
                <span>Storage Life</span>
                <span>${data.life}</span>
              </div>
            </div>
            <h4>Recommended Methods:</h4>
            <ul>${methodsList}</ul>
          </div>
        </div>
      `;
    }
  
    function displayAllMethods() {
      const allMethods = new Set();
      Object.values(cropData).forEach(crop => {
        crop.methods.forEach(method => allMethods.add(method));
      });
  
      resultContainer.innerHTML = `
        <h2>All Storage Methods</h2>
        <ul>${[...allMethods].map(method => `<li>${method}</li>`).join("")}</ul>
      `;
    }
  
    searchBtn.addEventListener("click", () => {
      const crop = input.value.trim().toLowerCase();
      if (crop) {
        displayCrop(crop);
      }
    });
  
    input.addEventListener("keydown", e => {
      if (e.key === "Enter") {
        searchBtn.click();
      }
    });
  
    const tags = document.querySelectorAll(".popular-searches span");
    if (tags.length > 0) {
      tags.forEach(tag => {
        tag.addEventListener("click", () => {
          input.value = tag.textContent.toLowerCase();
          searchBtn.click();
        });
      });
    }
  
    if (allMethodsBtn) {
      allMethodsBtn.addEventListener("click", displayAllMethods);
    }
  });
  
  // Chatbot toggle and message handler
  function toggleChat() {
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotIcon = document.getElementById('chatbot-icon');
  
    if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
      chatbotWindow.style.display = 'flex';
      chatbotIcon.style.display = 'none';
    } else {
      chatbotWindow.style.display = 'none';
      chatbotIcon.style.display = 'flex';
    }
  }
  
  function sendMessage(event) {
    if (event.key === 'Enter') {
      const userInput = document.getElementById('user-input').value;
      if (userInput.trim()) {
        const chatContent = document.getElementById('chat-content');
        chatContent.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
        document.getElementById('user-input').value = '';
  
        setTimeout(function () {
          chatContent.innerHTML += `<p><strong>Bot:</strong> I'm here to help!</p>`;
          chatContent.scrollTop = chatContent.scrollHeight;
        }, 1000);
      }
    }
  }
