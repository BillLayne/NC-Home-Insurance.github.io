// Modal Tools JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    const modal = document.getElementById('toolModal');
    const modalTitle = document.getElementById('toolModalTitle');
    const toolFrame = document.getElementById('toolFrame');
    const modalClose = document.querySelector('.tool-modal-close');
    
    // Tool URLs mapping
    const toolUrls = {
        'coverage-calculator': 'coverage-calculator.html',
        'deductible-analyzer': 'deductible-analyzer.html',
        'discount-checker': 'discount-checker.html',
        'home-inventory-worksheet': 'home-inventory-worksheet.html'
    };
    
    // Open modal when tool is clicked
    document.querySelectorAll('.modal-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const toolId = this.getAttribute('data-tool');
            const title = this.getAttribute('data-title');
            
            if (toolUrls[toolId]) {
                openToolModal(toolUrls[toolId], title);
            }
        });
    });
    
    // Open modal function
    function openToolModal(url, title) {
        modalTitle.textContent = title;
        toolFrame.src = url;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent body scroll
        
        // Focus management
        modalClose.focus();
    }
    
    // Close modal function
    function closeToolModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        toolFrame.src = ''; // Clear iframe
        document.body.style.overflow = ''; // Restore body scroll
    }
    
    // Close modal on X click
    modalClose.addEventListener('click', closeToolModal);
    
    // Close modal on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeToolModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeToolModal();
        }
    });
    
    // Handle iframe messages for closing
    window.addEventListener('message', function(e) {
        if (e.data === 'closeModal') {
            closeToolModal();
        }
    });
});

// Add modal styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    /* Tool Modal Styles */
    .tool-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .tool-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
    }
    
    .tool-modal-content {
        background: white;
        width: 90%;
        max-width: 1200px;
        height: 90vh;
        border-radius: 16px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        transform: translateY(20px);
        transition: transform 0.3s ease;
    }
    
    .tool-modal.active .tool-modal-content {
        transform: translateY(0);
    }
    
    .tool-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 1px solid #e2e8f0;
        background: #f8fafc;
        border-radius: 16px 16px 0 0;
    }
    
    .tool-modal-header h2 {
        margin: 0;
        font-size: 1.5rem;
        color: #1e293b;
    }
    
    .tool-modal-close {
        background: none;
        border: none;
        font-size: 2rem;
        color: #64748b;
        cursor: pointer;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        transition: all 0.2s ease;
    }
    
    .tool-modal-close:hover {
        background: #e2e8f0;
        color: #1e293b;
    }
    
    .tool-modal-body {
        flex: 1;
        overflow: hidden;
        border-radius: 0 0 16px 16px;
    }
    
    #toolFrame {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0 0 16px 16px;
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .tool-modal-content {
            width: 100%;
            height: 100%;
            max-width: 100%;
            border-radius: 0;
        }
        
        .tool-modal-header {
            border-radius: 0;
            padding: 1rem 1.5rem;
        }
        
        .tool-modal-body {
            border-radius: 0;
        }
        
        #toolFrame {
            border-radius: 0;
        }
    }
    
    /* Animation for modal appearance */
    @keyframes modalSlideUp {
        from {
            transform: translateY(100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    /* Prevent body scroll when modal is open */
    body.modal-open {
        overflow: hidden;
    }
`;
document.head.appendChild(modalStyles);