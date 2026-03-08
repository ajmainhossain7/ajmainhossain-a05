console.log("hello login")

// login from section
document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault()
    const user = document.getElementById("username").value
    const pass = document.getElementById("password").value
    if (user === "admin" && pass === "admin123") {
        localStorage.setItem("auth", "true")
        window.location.href = "./dashboard.html"
    } else {
        alert("Invalid credentials")
    }
})
