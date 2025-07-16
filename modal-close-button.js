// Modal Close Button for Tool Pages
// Add this script to each tool page (coverage-calculator.html, etc.)

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're in an iframe
    if (window.parent !== window) {
        // Create close button
        const closeButton = document.createElement('button');
        closeButton.innerHTML = '✕ Close';
        closeButton.className = 'modal-page-close';
        closeButton.setAttribute('aria-label', 'Close and return to main page');
        
        // Style the button
        const style = document.createElement('style');
        style.textContent = `
            .modal-page-close {
                position: fixed;
                top: 20px;
                right: 20px;
                background: #1e3a8a;
                color: white;
                border: none;
                padding: 10px 20px;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 600;
                cursor: pointer;
                z-index: 1000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                transition: all 0.2s ease;
            }
            
            .modal-page-close:hover {
                background: #3b82f6;
                transform: translateY(-2px);
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
            }
            
            @media (max-width: 768px) {
                .modal-page-close {
                    top: 10px;
                    right: 10px;
                    padding: 8px 16px;
                    font-size: 14px;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Add button to page
        document.body.appendChild(closeButton);
        
        // Handle close
        closeButton.addEventListener('click', function() {
            window.parent.postMessage('closeModal', '*');
        });
        
        // Also close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.parent.postMessage('closeModal', '*');
            }
        });
    }
});