// modules/trendingSectionHandler.js
export async function handleTrendingSection() {
    // Check if user is logged in and extension is enabled
    const result = await chrome.storage.sync.get(['enabled', 'subscriptionStatus', 'user']);
    const enabled = result.enabled ?? true;
    const subscriptionStatus = result.subscriptionStatus;
    const user = result.user;

    // If user is not logged in or extension disabled, don't process anything
    if (!user || !enabled) {
        return;
    }

    // Don't block if user has no blocks left and no subscription
    if (subscriptionStatus?.remainingBlocks === 0 && 
        !subscriptionStatus?.subscription_active && 
        !subscriptionStatus?.lifetime_access) {
        return;
    }

    const trendingSections = [];

    // Handle Event Heroes on explore page
    if (window.location.pathname === '/explore') {
        const exploreTrending = Array.from(document.querySelectorAll('div[data-testid="cellInnerDiv"]'));
        trendingSections.push(...exploreTrending);

        const eventHeros = Array.from(document.querySelectorAll('div[data-testid="eventHero"]'));
        if (eventHeros.length > 0) {
            eventHeros.forEach(hero => {
                const heroText = hero.textContent || '';
                const categoryEl = hero.querySelector('span[dir="ltr"]');
                const category = categoryEl?.textContent?.toLowerCase().trim() || '';
                
                const politicalKeywords = [
                    'politics', 'protest', 'military', 'elections',
                    'government', 'congress', 'parliament', 'senate',
                    'president', 'minister', 'campaign', 'vote',
                    'ballot', 'democracy', 'war', 'conflict', 'Donald Trump'
                ];

                const isPolitical = politicalKeywords.some(keyword => 
                    category.includes(keyword) || heroText.toLowerCase().includes(keyword)
                );

                if (isPolitical) {
                    const heroContainer = hero.closest('div[data-testid="cellInnerDiv"]');
                    if (heroContainer) {
                        // Hide the header if it exists
                        const header = heroContainer.previousElementSibling?.matches('[role="heading"]') ? 
                                     heroContainer.previousElementSibling : 
                                     heroContainer.querySelector('[role="heading"]');
                        
                        if (header) {
                            header.style.cssText = `
                                display: none !important;
                                height: 0 !important;
                                min-height: 0 !important;
                                overflow: hidden !important;
                            `;
                        }

                        // Hide the container
                        heroContainer.style.cssText = `
                            display: none !important;
                            height: 0 !important;
                            min-height: 0 !important;
                            overflow: hidden !important;
                        `;

                        // Notify about blocked trend
                        chrome.runtime.sendMessage({
                            type: 'TREND_BLOCKED',
                            data: {
                                text: heroText,
                                category: category,
                                timestamp: new Date().toISOString()
                            }
                        });
                    }
                }
            });
        }
    }

    // Handle regular trending items
    trendingSections.forEach(section => {
        const trendingItems = section.matches('[data-testid="eventHero"]') ? 
            [section] :
            section.querySelectorAll('div[data-testid="trend"], div[data-testid="cellInnerDiv"]');

        trendingItems.forEach(item => {
            const fullText = item.textContent || '';
            const parts = fullText.split(' · ');
            const category = parts[1] || '';

            if (['politics', 'war', 'protest', 'military', 'elections'].includes(category.toLowerCase().trim())) {
                const container = item.matches('[data-testid="eventHero"], [data-testid="cellInnerDiv"]') ?
                    item :
                    item.closest('div[data-testid="cellInnerDiv"], div[data-testid="eventHero"], article, div[role="link"]');

                if (container) {
                    [container, container.parentElement].forEach(el => {
                        if (el && !el.matches('[data-testid="primaryColumn"]')) {
                            el.style.cssText = `
                                display: none !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                height: 0 !important;
                                min-height: 0 !important;
                                border: none !important;
                                opacity: 0 !important;
                                pointer-events: none !important;
                                position: absolute !important;
                                visibility: hidden !important;
                                overflow: hidden !important;
                            `;

                            el.setAttribute('aria-hidden', 'true');
                            el.setAttribute('tabindex', '-1');
                        }
                    });

                    // Notify about blocked trend
                    chrome.runtime.sendMessage({
                        type: 'TREND_BLOCKED',
                        data: {
                            text: fullText,
                            category: category,
                            timestamp: new Date().toISOString()
                        }
                    });
                }
            }
        });
    });
}

// Export function to hide news tab if needed
export function hideNewsTab() {
    const newsTab = document.querySelector('a[href="/i/news"]');
    if (newsTab) {
        const tabContainer = newsTab.closest('div[role="presentation"]');
        if (tabContainer) {
            tabContainer.style.display = 'none';
        }
    }
}
  