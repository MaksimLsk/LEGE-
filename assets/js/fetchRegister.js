document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registerForm').addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirmEmail').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (email !== confirmEmail) {
            alert("Les emails ne correspondent pas.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const user = {
            email: email,
            password: password
        };

        console.log('User registered:', user);

        // Envoyer les données au serveur
        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("Compte créé avec succès !");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Erreur lors de la création du compte.");
        });
    });
});
