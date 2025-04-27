// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, push } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9Ou9CJCkbm32of11uIXa4kRw1Kyp8JNU",
    authDomain: "harshithasankeerth-c9df5.firebaseapp.com",
    databaseURL: "https://harshithasankeerth-c9df5-default-rtdb.firebaseio.com",
    projectId: "harshithasankeerth-c9df5",
    storageBucket: "harshithasankeerth-c9df5.firebasestorage.app",
    messagingSenderId: "706915122780",
    appId: "1:706915122780:web:b70b1549257d36b8597099",
    measurementId: "G-Z5YPFN75Z6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

// Countdown timer
function updateCountdown() {
    const weddingDate = new Date('2024-05-18T05:45:00');
    const now = new Date();
    const diff = weddingDate - now;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = `
        ${days}d ${hours}h ${minutes}m ${seconds}s
    `;
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Form validation and submission
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('rsvpForm');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    // Enable/disable guest count inputs based on attendance selection
    function toggleGuestInput(eventName) {
        const attendanceSelect = document.getElementById(`${eventName}_attendance`);
        const guestInput = document.getElementById(`${eventName}_guests`);
        
        if (attendanceSelect.value === 'yes') {
            guestInput.disabled = false;
            guestInput.value = 0;
        } else {
            guestInput.disabled = true;
            guestInput.value = 0;
        }
    }

    // Add event listeners for all event attendance selects
    const events = ['haldi', 'cocktail', 'mehendi', 'bridegroom', 'wedding'];
    events.forEach(event => {
        const attendanceSelect = document.getElementById(`${event}_attendance`);
        attendanceSelect.addEventListener('change', () => toggleGuestInput(event));
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!form.checkValidity()) {
            e.stopPropagation();
            form.classList.add('was-validated');
            return;
        }

        // Collect form data
        const rsvpData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString(),
            events: {}
        };

        // Add event responses
        events.forEach(event => {
            const attendanceSelect = document.getElementById(`${event}_attendance`);
            const guestInput = document.getElementById(`${event}_guests`);
            
            rsvpData.events[event] = {
                status: attendanceSelect.value,
                guests: parseInt(guestInput.value) || 0
            };
        });

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

        // Save to Firebase
        push(ref(database, 'rsvps'), rsvpData)
            .then(() => {
                successModal.show();
                form.reset();
                form.classList.remove('was-validated');
            })
            .catch(error => {
                alert('Error submitting RSVP. Please try again later.');
                console.error('Error:', error);
            })
            .finally(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = '<span>Send RSVP</span><i class="fas fa-paper-plane ms-2"></i>';
            });
    });
}); 