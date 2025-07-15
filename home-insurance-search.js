// Home Insurance Search Data and Functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Comprehensive search data for home insurance
    const homeInsuranceSearchData = [
        // Coverage Types
        { 
            title: 'Dwelling Coverage', 
            desc: 'Protects your home structure from covered perils like fire, wind, and hail', 
            type: 'coverage', 
            section: '#coverage',
            keywords: ['house', 'structure', 'building', 'roof', 'walls', 'foundation']
        },
        { 
            title: 'Personal Property Coverage', 
            desc: 'Covers your belongings inside the home - furniture, electronics, clothing', 
            type: 'coverage', 
            section: '#coverage',
            keywords: ['belongings', 'contents', 'furniture', 'clothes', 'electronics', 'items']
        },
        { 
            title: 'Liability Protection', 
            desc: 'Protects you if someone is injured on your property or you damage others property', 
            type: 'coverage', 
            section: '#coverage',
            keywords: ['lawsuit', 'injury', 'accident', 'legal', 'medical bills']
        },
        { 
            title: 'Additional Living Expenses (ALE)', 
            desc: 'Covers hotel and living costs if your home is uninhabitable after a claim', 
            type: 'coverage', 
            section: '#coverage',
            keywords: ['hotel', 'temporary housing', 'displacement', 'living costs']
        },
        { 
            title: 'Other Structures Coverage', 
            desc: 'Protects detached structures like garages, sheds, and fences', 
            type: 'coverage', 
            section: '#coverage',
            keywords: ['garage', 'shed', 'fence', 'detached', 'pool house']
        },
        
        // Covered Perils
        { 
            title: 'Fire and Smoke Damage', 
            desc: 'Coverage for damage from fires and smoke', 
            type: 'peril', 
            section: '.covered-perils',
            keywords: ['fire', 'smoke', 'burning', 'flames']
        },
        { 
            title: 'Wind and Hail Damage', 
            desc: 'Protection from windstorms and hail damage', 
            type: 'peril', 
            section: '.covered-perils',
            keywords: ['wind', 'hail', 'storm', 'hurricane', 'tornado']
        },
        { 
            title: 'Water Damage', 
            desc: 'Coverage for sudden water damage (not floods)', 
            type: 'peril', 
            section: '.covered-perils',
            keywords: ['water', 'pipe burst', 'leak', 'plumbing']
        },
        { 
            title: 'Theft and Vandalism', 
            desc: 'Protection against theft and malicious damage', 
            type: 'peril', 
            section: '.covered-perils',
            keywords: ['theft', 'stolen', 'burglary', 'vandalism', 'break-in']
        },
        
        // North Carolina Specific
        { 
            title: 'Hurricane Coverage in NC', 
            desc: 'Special considerations for hurricane damage in North Carolina', 
            type: 'nc-specific', 
            section: '.nc-specific',
            keywords: ['hurricane', 'coastal', 'wind', 'storm surge', 'deductible']
        },
        { 
            title: 'Flood Insurance', 
            desc: 'Separate flood insurance requirements in NC', 
            type: 'nc-specific', 
            section: '.nc-specific',
            keywords: ['flood', 'flooding', 'water damage', 'FEMA', 'flood zone']
        },
        { 
            title: 'Earthquake Coverage', 
            desc: 'Optional earthquake coverage for NC homeowners', 
            type: 'nc-specific', 
            section: '.nc-specific',
            keywords: ['earthquake', 'tremor', 'seismic', 'ground movement']
        },
        
        // Discounts
        { 
            title: 'Home Security Discount', 
            desc: 'Save 5-20% with security systems and smart home devices', 
            type: 'discount', 
            section: '.agency-difference',
            keywords: ['security', 'alarm', 'camera', 'smart home', 'discount']
        },
        { 
            title: 'Multi-Policy Discount', 
            desc: 'Bundle home and auto insurance for savings', 
            type: 'discount', 
            section: '.agency-difference',
            keywords: ['bundle', 'multi-policy', 'auto', 'discount', 'save']
        },
        { 
            title: 'Claims-Free Discount', 
            desc: 'Save money with no recent claims', 
            type: 'discount', 
            section: '.agency-difference',
            keywords: ['claims-free', 'no claims', 'discount', 'history']
        },
        { 
            title: 'New Home Discount', 
            desc: 'Discounts for newer homes (typically under 10 years)', 
            type: 'discount', 
            section: '.agency-difference',
            keywords: ['new home', 'new construction', 'recent', 'discount']
        },
        
        // Common Questions
        { 
            title: 'How Much Coverage Do I Need?', 
            desc: 'Calculate the right amount of dwelling coverage for your home', 
            type: 'faq', 
            section: '.insurance-calculator',
            keywords: ['how much', 'coverage amount', 'calculate', 'value']
        },
        { 
            title: 'What is Replacement Cost?', 
            desc: 'Understanding replacement cost vs actual cash value', 
            type: 'faq', 
            section: '.faq-section',
            keywords: ['replacement cost', 'actual cash value', 'RCV', 'ACV']
        },
        { 
            title: 'Deductible Options', 
            desc: 'Choosing the right deductible for your budget', 
            type: 'faq', 
            section: '.faq-section',
            keywords: ['deductible', 'out of pocket', 'cost', 'payment']
        },
        
        // Contact and Services
        { 
            title: 'Get a Home Insurance Quote', 
            desc: 'Free instant quotes from Bill Layne Insurance - Call (336) 835-1993', 
            type: 'action', 
            section: '.final-cta',
            keywords: ['quote', 'price', 'cost', 'estimate', 'free quote'],
            phone: '3368351993'
        },
        { 
            title: 'Bill Layne Insurance Agency', 
            desc: 'Local NC insurance expert serving Elkin and surrounding areas since 2004', 
            type: 'contact', 
            section: '.meet-bill',
            keywords: ['Bill Layne', 'agent', 'local', 'Elkin', 'contact']
        },
        { 
            title: 'Emergency Resources', 
            desc: 'Important contacts for emergencies and claims', 
            type: 'resource', 
            section: '.emergency-resources',
            keywords: ['emergency', '911', 'fire department', 'police']
        },
        
        // Tools and Calculators
        { 
            title: 'Home Insurance Calculator', 
            desc: 'Estimate your home insurance costs', 
            type: 'tool', 
            section: '.insurance-calculator',
            keywords: ['calculator', 'estimate', 'cost', 'price']
        },
        { 
            title: 'Coverage Review', 
            desc: 'Free coverage review to ensure adequate protection', 
            type: 'service', 
            section: '.agency-difference',
            keywords: ['review', 'coverage review', 'evaluation', 'assessment']
        }
    ];
    
    // Get search elements
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.querySelector('.search-btn');
    const searchResults = document.getElementById('searchResults');
    
    // Enhanced search function
    function performHomeInsuranceSearch(query) {
        if (!query || query.length < 2) {
            searchResults.innerHTML = '';
            searchResults.classList.remove('active');
            return;
        }
        
        const normalizedQuery = query.toLowerCase();
        const words = normalizedQuery.split(' ').filter(word => word.length > 0);
        
        // Score and filter results
        const scoredResults = homeInsuranceSearchData.map(item => {
            let score = 0;
            const searchableText = `${item.title} ${item.desc} ${(item.keywords || []).join(' ')}`.toLowerCase();
            
            // Exact phrase match gets highest score
            if (searchableText.includes(normalizedQuery)) {
                score += 10;
            }
            
            // Individual word matches
            words.forEach(word => {
                if (item.title.toLowerCase().includes(word)) {
                    score += 5; // Title matches are more important
                }
                if (item.desc.toLowerCase().includes(word)) {
                    score += 3;
                }
                if (item.keywords && item.keywords.some(keyword => keyword.includes(word))) {
                    score += 2;
                }
            });
            
            return { ...item, score };
        });
        
        // Filter and sort results
        const results = scoredResults
            .filter(item => item.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 10); // Limit to top 10 results
        
        if (results.length > 0) {
            displayHomeInsuranceResults(results);
        } else {
            displayNoHomeInsuranceResults();
        }
    }
    
    function displayHomeInsuranceResults(results) {
        searchResults.innerHTML = '';
        
        // Group results by type
        const groupedResults = results.reduce((acc, result) => {
            if (!acc[result.type]) {
                acc[result.type] = [];
            }
            acc[result.type].push(result);
            return acc;
        }, {});
        
        // Display results by group
        Object.entries(groupedResults).forEach(([type, items]) => {
            const groupTitle = getGroupTitle(type);
            
            const groupHeader = document.createElement('div');
            groupHeader.className = 'search-group-header';
            groupHeader.innerHTML = `<strong>${groupTitle}</strong>`;
            searchResults.appendChild(groupHeader);
            
            items.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.innerHTML = `
                    <div class="search-result-title">${highlightMatch(result.title, searchInput.value)}</div>
                    <div class="search-result-desc">${highlightMatch(result.desc, searchInput.value)}</div>
                `;
                
                resultItem.addEventListener('click', () => {
                    handleResultClick(result);
                });
                
                searchResults.appendChild(resultItem);
            });
        });
        
        searchResults.classList.add('active');
    }
    
    function highlightMatch(text, query) {
        if (!query) return text;
        
        const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }
    
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
    
    function getGroupTitle(type) {
        const titles = {
            'coverage': '📋 Coverage Types',
            'peril': '⚠️ Covered Perils',
            'nc-specific': '🏛️ North Carolina Specific',
            'discount': '💰 Discounts',
            'faq': '❓ Common Questions',
            'action': '📞 Get Quote',
            'contact': '👤 Contact',
            'resource': '🚨 Resources',
            'tool': '🧮 Tools',
            'service': '✅ Services'
        };
        return titles[type] || '📌 Other';
    }
    
    function handleResultClick(result) {
        if (result.phone) {
            // Copy phone number
            copyToClipboard(result.phone);
            showNotification(`Phone number copied: ${formatPhoneNumber(result.phone)}`);
        } else if (result.section) {
            // Navigate to section
            const targetSection = document.querySelector(result.section);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Clear search after navigation
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        }
    }
    
    function displayNoHomeInsuranceResults() {
        searchResults.innerHTML = `
            <div class="search-result-item">
                <div class="search-result-title">No results found</div>
                <div class="search-result-desc">Try searching for: coverage types, discounts, hurricane insurance, or "get quote"</div>
            </div>
            <div class="search-result-item" onclick="document.getElementById('searchInput').value='coverage'; performHomeInsuranceSearch('coverage')">
                <div class="search-result-title">💡 Suggested: Coverage Types</div>
                <div class="search-result-desc">Learn about dwelling, personal property, and liability coverage</div>
            </div>
            <div class="search-result-item" onclick="window.location.href='tel:3368351993'">
                <div class="search-result-title">📞 Call for Help</div>
                <div class="search-result-desc">Speak with Bill Layne directly at (336) 835-1993</div>
            </div>
        `;
        searchResults.classList.add('active');
    }
    
    function copyToClipboard(text) {
        const tempInput = document.createElement('input');
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
    }
    
    function formatPhoneNumber(phone) {
        if (phone.length === 10) {
            return `(${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6)}`;
        }
        return phone;
    }
    
    function showNotification(message) {
        // Create notification if it doesn't exist
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--color-success, #10b981);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
            `;
            notification.innerHTML = `<span id="notification-text">${message}</span>`;
            document.body.appendChild(notification);
        } else {
            document.getElementById('notification-text').textContent = message;
        }
        
        // Show notification
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Hide after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
        }, 3000);
    }
    
    // Event listeners
    if (searchInput) {
        // Real-time search as user types
        searchInput.addEventListener('input', (e) => {
            performHomeInsuranceSearch(e.target.value);
        });
        
        // Handle enter key
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performHomeInsuranceSearch(e.target.value);
            }
        });
        
        // Handle escape key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchInput.value = '';
                searchResults.classList.remove('active');
            }
        });
    }
    
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            performHomeInsuranceSearch(searchInput.value);
        });
    }
    
    // Close search results when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-section')) {
            searchResults.classList.remove('active');
        }
    });
    
    // Add search styles if not already present
    if (!document.querySelector('#search-styles')) {
        const searchStyles = document.createElement('style');
        searchStyles.id = 'search-styles';
        searchStyles.textContent = `
            .search-results {
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.1);
                max-height: 400px;
                overflow-y: auto;
                display: none;
                z-index: 1000;
                margin-top: 8px;
            }
            
            .search-results.active {
                display: block;
            }
            
            .search-group-header {
                padding: 12px 16px 8px;
                color: var(--color-text-secondary);
                font-size: 0.875rem;
                border-bottom: 1px solid var(--color-border-light);
            }
            
            .search-result-item {
                padding: 12px 16px;
                cursor: pointer;
                transition: background-color 0.2s;
                border-bottom: 1px solid var(--color-border-light);
            }
            
            .search-result-item:hover {
                background-color: var(--color-surface);
            }
            
            .search-result-item:last-child {
                border-bottom: none;
            }
            
            .search-result-title {
                font-weight: 600;
                color: var(--color-text);
                margin-bottom: 4px;
            }
            
            .search-result-desc {
                font-size: 0.875rem;
                color: var(--color-text-secondary);
            }
            
            .search-result-item mark {
                background-color: #fef3c7;
                color: inherit;
                font-weight: 600;
                padding: 0 2px;
                border-radius: 2px;
            }
            
            .search-wrapper {
                position: relative;
            }
            
            @media (max-width: 768px) {
                .search-results {
                    position: fixed;
                    top: auto;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    max-height: 70vh;
                    border-radius: 24px 24px 0 0;
                    margin-top: 0;
                }
            }
        `;
        document.head.appendChild(searchStyles);
    }
    
    console.log('Home Insurance Search initialized successfully');
});