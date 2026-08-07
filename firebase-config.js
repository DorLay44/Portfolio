/**
 * Isolated Application Database Module Infrastructure Core File
 * Explicitly designed for GitHub Pages public client tracking architectures.
 * Uses official Firebase Web SDK v10 implementation models.
 */
import { initializeApp } from "https://gstatic.com";
import { getDatabase, ref, runTransaction, onValue } from "https://gstatic.com";

// Firebase configuration parameters placeholder
// Replace the values below with the actual credentials from your Firebase Console
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Fire up core pipeline connections 
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', () => {
    const interactionContainers = document.querySelectorAll('.fb-reactions-wrapper');

    interactionContainers.forEach(container => {
        const itemIdentifier = container.getAttribute('data-item-id');
        const likeBtn = container.querySelector('.like-trigger');
        const heartBtn = container.querySelector('.heart-trigger');
        const likeCountDisplay = container.querySelector('.like-counter');
        const heartCountDisplay = container.querySelector('.heart-counter');

        // Reference target routes within database nodes layout
        const itemDatabaseRef = ref(database, `portfolio_reactions/${itemIdentifier}`);

        /* ==========================================================================
           1. Real-time Synchronization Interceptor Pipelines
           ========================================================================== */
        onValue(itemDatabaseRef, (snapshot) => {
            const currentData = snapshot.val() || { likes: 0, hearts: 0 };
            
            // Sync display views immediately across active screens globally
            if (likeCountDisplay) likeCountDisplay.textContent = currentData.likes || 0;
            if (heartCountDisplay) heartCountDisplay.textContent = currentData.hearts || 0;
        });

        /* ==========================================================================
           2. Atomic Transaction Execution Block Toggles (Preventing Data Overwrites)
           ========================================================================== */
        likeBtn.addEventListener('click', () => {
            const hasLiked = likeBtn.classList.toggle('liked');
            const metricsTargetRef = ref(database, `portfolio_reactions/${itemIdentifier}/likes`);

            runTransaction(metricsTargetRef, (currentValue) => {
                // If it doesn't exist yet, initialize to 0. Add 1 if true, subtract 1 if unselected.
                const baseValue = currentValue || 0;
                return hasLiked ? baseValue + 1 : Math.max(0, baseValue - 1);
            });
        });

        heartBtn.addEventListener('click', () => {
            const hasHearted = heartBtn.classList.toggle('hearted');
            const metricsTargetRef = ref(database, `portfolio_reactions/${itemIdentifier}/hearts`);

            runTransaction(metricsTargetRef, (currentValue) => {
                const baseValue = currentValue || 0;
                return hasHearted ? baseValue + 1 : Math.max(0, baseValue - 1);
            });
        });
    });
});
