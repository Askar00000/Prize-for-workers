let token = null;
let profile = null;

async function register(username, password) {
    await fetch('https://your-backend-url.onrender.com/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    alert('Registered successfully!');
}

async function login(username, password) {
    const response = await fetch('https://your-backend-url.onrender.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    token = data.token;
    loadProfile();
}

async function loadProfile() {
    const response = await fetch('https://your-backend-url.onrender.com/profile', {
        headers: { Authorization: token },
    });
    profile = await response.json();
    renderDashboard();
}

async function openCase(caseType) {
    const response = await fetch('https://your-backend-url.onrender.com/open-case', {
        method: 'POST',
        headers: {
            Authorization: token,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseType }),
    });
    const data = await response.json();
    alert(data.message);
    loadProfile();
}

function renderLoginForm() {
    document.getElementById('root').innerHTML = `
        <h1>Login or Register</h1>
        <input id="username" placeholder="Username" />
        <input id="password" type="password" placeholder="Password" />
        <button class="login" onclick="login(document.getElementById('username').value, document.getElementById('password').value)">Login</button>
        <button class="register" onclick="register(document.getElementById('username').value, document.getElementById('password').value)">Register</button>
    `;
}

function renderDashboard() {
    document.getElementById('root').innerHTML = `
        <h1>Welcome, ${profile.username}</h1>
        <p>Balance: ${profile.balance} coins</p>
        <h2>Your Inventory:</h2>
        <div>
            ${profile.inventory.map((item) => `<div class="inventory-item">${item}</div>`).join('')}
        </div>
        <h2>Open a Case:</h2>
        <button class="open-case" onclick="openCase('basic')">Open Basic Case</button>
        <button class="open-case" onclick="openCase('premium')">Open Premium Case</button>
    `;
}

if (!token) {
    renderLoginForm();
} else {
    loadProfile();
}
