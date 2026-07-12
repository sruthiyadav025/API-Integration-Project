const usersContainer = document.getElementById("users");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const search = document.getElementById("search");

let users = [];

// Fetch users
async function fetchUsers() {

    loading.style.display = "block";
    error.textContent = "";

    try {

        const response = await fetch("https://jsonplaceholder.typicode.com/users");

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        users = await response.json();

        displayUsers(users);

    } catch (err) {

        error.textContent = err.message;

    } finally {

        loading.style.display = "none";

    }

}

function displayUsers(list) {

    usersContainer.innerHTML = "";

    if (list.length === 0) {
        usersContainer.innerHTML = "<h3>No users found</h3>";
        return;
    }

    list.forEach(user => {

        usersContainer.innerHTML += `
            <div class="card">
                <h3>${user.name}</h3>
                <p><strong>Email:</strong> ${user.email}</p>
                <p><strong>Phone:</strong> ${user.phone}</p>
                <p><strong>City:</strong> ${user.address.city}</p>
                <p><strong>Company:</strong> ${user.company.name}</p>
            </div>
        `;

    });

}

// Search feature
search.addEventListener("input", function () {

    const value = this.value.toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(value)
    );

    displayUsers(filteredUsers);

});

fetchUsers();