document.addEventListener("DOMContentLoaded", function () {

    // ======================
    // TYPING EFFECT
    // ======================

    const typing = document.getElementById("typing");

    if (typing) {

        const words = [
            "Full Stack Developer",
            "MERN Developer",
            "Frontend Developer",

        ];

        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeEffect() {

            const currentWord = words[wordIndex];

            if (!deleting) {

                typing.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;

                if (charIndex === currentWord.length) {

                    deleting = true;
                    setTimeout(typeEffect, 1500);
                    return;
                }

            } else {

                typing.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

                if (charIndex === 0) {

                    deleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
            }

            setTimeout(typeEffect, deleting ? 60 : 120);
        }

        typeEffect();
    }

    // ======================
    // CONTACT FORM
    // ======================

    const form = document.getElementById("contactForm");

    if (form) {

        form.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const message =
                document.getElementById("message").value.trim();

            const formMessage =
                document.getElementById("formMessage");

            if (
                name === "" ||
                email === "" ||
                message === ""
            ) {

                formMessage.textContent =
                    "❌ Please fill all fields";

                formMessage.style.color = "red";
                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "❌ Enter a valid email address";

                formMessage.style.color = "red";
                return;
            }

            formMessage.textContent =
                "✅ Message submitted successfully!";

            formMessage.style.color = "green";

            alert(
                "Thank you! Your message has been submitted successfully."
            );

            form.reset();

        });

    }

});