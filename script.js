document.addEventListener("DOMContentLoaded", () => {
  // Matrix background animation
  createMatrixBackground()

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const navLinks = document.querySelector(".nav-links")

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })

  // Close mobile menu when clicking on a link
  const navItems = document.querySelectorAll(".nav-links a")
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navLinks.classList.remove("active")
      document.body.classList.remove("menu-open")
    })
  })

  // Theme toggle
  const themeToggle = document.querySelector(".theme-toggle")
  const sunIcon = document.querySelector(".fa-sun")
  const moonIcon = document.querySelector(".fa-moon")

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme")
    sunIcon.classList.toggle("active")
    moonIcon.classList.toggle("active")

    // Save theme preference
    if (document.body.classList.contains("light-theme")) {
      localStorage.setItem("theme", "light")
    } else {
      localStorage.setItem("theme", "dark")
    }
  })

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    document.body.classList.add("light-theme")
    sunIcon.classList.add("active")
    moonIcon.classList.remove("active")
  }

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section")
  const navLinks2 = document.querySelectorAll(".nav-links a")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks2.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active")
      }
    })

    // Header background change on scroll
    const header = document.querySelector("header")
    if (window.scrollY > 100) {
      header.style.background = "rgba(5, 5, 5, 0.95)"
      header.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.3)"
    } else {
      header.style.background = "rgba(5, 5, 5, 0.9)"
      header.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.2)"
    }
  })

  // Contact form submission
  // const contactForm = document.getElementById("contactForm")
  // if (contactForm) {
  //   contactForm.addEventListener("submit", (e) => {
  //     e.preventDefault()

  //     // Get form values
  //     const name = document.getElementById("name").value
  //     const email = document.getElementById("email").value
  //     const subject = document.getElementById("subject").value
  //     const message = document.getElementById("message").value

  //     // Here you would typically send the form data to a server
  //     // For GitHub Pages hosting, you can use a service like Formspree
  //     // or implement a custom solution with EmailJS

  //     // For now, we'll just show an alert
  //     alert(
  //       `Thank you for your message, ${name}! As this is a static site hosted on GitHub, the form doesn't actually send emails. In a real implementation, you would connect this to a form handling service.`,
  //     )

  //     // Reset the form
  //     contactForm.reset()
  //   })
  // }
  const contactForm = document.getElementById("contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", () => {
    alert("Thank you for your message! Your submission has been sent.")
  })
}


  // Photo upload functionality
  const photoUpload = document.getElementById("photo-upload")
  const profilePhoto = document.getElementById("profile-photo")

  if (photoUpload && profilePhoto) {
    photoUpload.addEventListener("change", (e) => {
      const file = e.target.files[0]

      if (file) {
        // Check if the file is an image
        if (!file.type.match("image.*")) {
          alert("Please select an image file")
          return
        }

        // Check file size (limit to 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert("File size should be less than 5MB")
          return
        }

        const reader = new FileReader()

        reader.onload = (e) => {
          profilePhoto.src = e.target.result

          // Save the image to localStorage (base64 encoded)
          localStorage.setItem("profilePhoto", e.target.result)
        }

        reader.readAsDataURL(file)
      }
    })

    // Check if there's a saved profile photo
    const savedPhoto = localStorage.getItem("profilePhoto")
    if (savedPhoto) {
      profilePhoto.src = savedPhoto
    }
  }

  // Matrix background animation function
  function createMatrixBackground() {
    const matrixBg = document.querySelector(".matrix-bg")

    // Create canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Append canvas to matrix background
    matrixBg.appendChild(canvas)

    // Matrix characters
    const matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}"
    const characters = matrix.split("")

    const fontSize = 14
    const columns = canvas.width / fontSize

    // Array to track the y position of each column
    const drops = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    // Drawing the characters
    function draw() {
      // Set semi-transparent black background to create trail effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set color and font for characters
      ctx.fillStyle = "#0cff70"
      ctx.font = fontSize + "px monospace"

      // Loop through each drop
      for (let i = 0; i < drops.length; i++) {
        // Get random character
        const text = characters[Math.floor(Math.random() * characters.length)]

        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        // Reset drop position if it's at the bottom or randomly
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Move drop down
        drops[i]++
      }
    }

    // Handle window resize
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Reset drops array for new width
      const columns = canvas.width / fontSize
      for (let i = 0; i < columns; i++) {
        drops[i] = 1
      }
    })

    // Run the animation
    setInterval(draw, 35)
  }
})

