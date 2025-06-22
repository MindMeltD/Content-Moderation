import { filters } from '../managerRecords/remoteFetchRecord.ts';

// Function to check if a domain is in the blocklist
function isBadDomain(domain: string): boolean {
  return filters.sites.includes(domain);
}

// Function to check if the current domain is in the blocklist
function badCurrentDomain(): boolean {
  const currentDomain = window.location.hostname;
  return isBadDomain(currentDomain);
}

// Function to redirect to a safe page if the current domain is blocked
function redirectToSafePage() {
  if (badCurrentDomain()) {
    const safePage = 'https://www.google.com';
    window.location.href = safePage;
  }
}

export { isBadDomain, badCurrentDomain, redirectToSafePage };