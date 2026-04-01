/**
 * Multi-market configuration
 * Each market gets its own data, providers, and compliance rules
 */

const markets = {
  'island-county': {
    id: 'island-county',
    name: 'Island County',
    state: 'WA',
    slug: 'island-county-wa',
    region: 'Whidbey Island & Camano Island',
    description: 'Septic services for Whidbey Island, Camano Island, and surrounding Island County properties',
    cities: ['Oak Harbor', 'Coupeville', 'Langley', 'Freeland', 'Clinton', 'Stanwood'],
    county_code: 'ISLAND',
    population: '84,000',
    contractors_count: 24,
    
    // SEO metadata
    meta: {
      title: 'Septic Services in Island County, WA — Open Acre',
      description: 'Find vetted septic contractors in Island County, WA. Installation, repair, pumping, inspections. Licensed, bonded, local.',
      keywords: 'septic contractors Island County WA, septic pump out Whidbey Island, septic repair Camano Island',
    },

    // Compliance rules (WA state + Island County specific)
    compliance: {
      inspection_required: true,
      inspection_frequency_years: 5,
      inspection_required_for_transfer: true,
      transfer_required_by: '2027-02-01', // WAC 246-272A-0270
      licensed_provider_types: ['SEPDSI', 'SEPTIC', 'SEPMSI', 'SEPUMP'],
      health_department: {
        name: 'Island County Department of Health & Community Services - Environmental Health',
        website: 'https://www.islandcountywa.gov/health',
        phone: '(360) 678-5684',
      },
    },

    // Search terms (for content generation and paid search)
    search_terms: [
      'septic contractors Island County WA',
      'septic pump out Whidbey Island',
      'septic repair Camano Island',
      'septic inspection Island County',
      'septic installation Whidbey',
      'septic designer Oak Harbor',
      'septic emergency Freeland',
    ],
  },

  'kitsap-county': {
    id: 'kitsap-county',
    name: 'Kitsap County',
    state: 'WA',
    slug: 'kitsap-county-wa',
    region: 'Kitsap Peninsula',
    description: 'Septic services for Bremerton, Port Orchard, Silverdale, and Kitsap County properties',
    cities: ['Bremerton', 'Port Orchard', 'Silverdale', 'Port Townsend', 'Poulsbo'],
    county_code: 'KITSAP',
    population: '271,000',
    contractors_count: 0, // To be populated
    
    meta: {
      title: 'Septic Services in Kitsap County, WA — Open Acre',
      description: 'Find vetted septic contractors in Kitsap County, WA. Serving Bremerton, Port Orchard, Silverdale, and the Kitsap Peninsula.',
      keywords: 'septic contractors Kitsap County WA, septic repair Bremerton, septic pump Port Orchard',
    },

    compliance: {
      inspection_required: true,
      inspection_frequency_years: 5,
      inspection_required_for_transfer: true,
      transfer_required_by: '2027-02-01',
      licensed_provider_types: ['SEPDSI', 'SEPTIC', 'SEPMSI', 'SEPUMP'],
      health_department: {
        name: 'Kitsap County Department of Health',
        website: 'https://www.kitsaphealth.org',
        phone: '(360) 337-5235',
      },
    },

    search_terms: [
      'septic contractors Kitsap County WA',
      'septic pump out Bremerton',
      'septic repair Port Orchard',
      'septic inspection Kitsap',
    ],
  },

  'whatcom-county': {
    id: 'whatcom-county',
    name: 'Whatcom County',
    state: 'WA',
    slug: 'whatcom-county-wa',
    region: 'Bellingham & North County',
    description: 'Septic services for Bellingham, Lynden, Ferndale, and Whatcom County properties',
    cities: ['Bellingham', 'Lynden', 'Ferndale', 'Everson', 'Blaine'],
    county_code: 'WHATCOM',
    population: '220,000',
    contractors_count: 0,
    
    meta: {
      title: 'Septic Services in Whatcom County, WA — Open Acre',
      description: 'Find vetted septic contractors in Whatcom County, WA. Serving Bellingham and surrounding areas.',
      keywords: 'septic contractors Whatcom County WA, septic repair Bellingham, septic inspection Lynden',
    },

    compliance: {
      inspection_required: true,
      inspection_frequency_years: 5,
      inspection_required_for_transfer: true,
      transfer_required_by: '2027-02-01',
      licensed_provider_types: ['SEPDSI', 'SEPTIC', 'SEPMSI', 'SEPUMP'],
      health_department: {
        name: 'Whatcom County Health Department',
        website: 'https://www.whatcomcounty.us/health',
        phone: '(360) 778-6000',
      },
    },

    search_terms: [
      'septic contractors Whatcom County WA',
      'septic pump out Bellingham',
      'septic repair Lynden',
    ],
  },

  'clark-county': {
    id: 'clark-county',
    name: 'Clark County',
    state: 'WA',
    slug: 'clark-county-wa',
    region: 'Vancouver & SW Washington',
    description: 'Septic services for Vancouver, Camas, Washougal, and Clark County properties',
    cities: ['Vancouver', 'Camas', 'Washougal', 'Battle Ground', 'Ridgefield'],
    county_code: 'CLARK',
    population: '425,000',
    contractors_count: 0,
    
    meta: {
      title: 'Septic Services in Clark County, WA — Open Acre',
      description: 'Find vetted septic contractors in Clark County, WA. Serving Vancouver, Camas, and surrounding communities.',
      keywords: 'septic contractors Clark County WA, septic repair Vancouver, septic installation Camas',
    },

    compliance: {
      inspection_required: true,
      inspection_frequency_years: 5,
      inspection_required_for_transfer: true,
      transfer_required_by: '2027-02-01',
      licensed_provider_types: ['SEPDSI', 'SEPTIC', 'SEPMSI', 'SEPUMP'],
      health_department: {
        name: 'Clark County Public Health',
        website: 'https://www.clark.wa.gov/public-health',
        phone: '(360) 397-8400',
      },
    },

    search_terms: [
      'septic contractors Clark County WA',
      'septic pump out Vancouver',
      'septic repair Camas',
    ],
  },
};

// Helper to get market by slug
export function getMarket(slug) {
  return Object.values(markets).find(m => m.slug === slug || m.id === slug);
}

// Helper to get all markets
export function getAllMarkets() {
  return Object.values(markets);
}

// Default market (for homepage and fallbacks)
export const DEFAULT_MARKET = markets['island-county'];

export default markets;
