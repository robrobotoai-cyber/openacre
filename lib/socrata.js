/**
 * Socrata API client for WA L&I contractor licensing data
 * No API key required — public endpoint
 */

const BASE_URL = 'https://data.wa.gov/resource';

// Dataset IDs
const DATASETS = {
  GENERAL: 'm8qx-ubtq',      // License + registration
  BOND: 'bzff-4fmt',          // Bond status
  INSURANCE: 'ciwg-agsx',     // Insurance status
  PRINCIPAL: '4xk5-x9j6',     // Owners/principals
};

/**
 * Search contractors by name
 * @param {string} name - Contractor name or partial name
 * @returns {Promise<Array>}
 */
export async function searchContractors(name) {
  try {
    // Use SOQL token_sort_ratio for fuzzy matching
    const encodedName = encodeURIComponent(name);
    const url = `${BASE_URL}/${DATASETS.GENERAL}.json?$where=upper(contractor_name) like upper('%${name}%')&$limit=10`;
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Socrata API error: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error searching contractors:', error);
    return [];
  }
}

/**
 * Get full contractor record by license number
 * @param {string} licenseNumber - L&I license number
 * @returns {Promise<Object>}
 */
export async function getContractorByLicense(licenseNumber) {
  try {
    const generalUrl = `${BASE_URL}/${DATASETS.GENERAL}.json?contractorlicensenumber=${licenseNumber}`;
    const bondUrl = `${BASE_URL}/${DATASETS.BOND}.json?license_number=${licenseNumber}`;
    const insuranceUrl = `${BASE_URL}/${DATASETS.INSURANCE}.json?license_number=${licenseNumber}`;

    const [generalRes, bondRes, insuranceRes] = await Promise.all([
      fetch(generalUrl),
      fetch(bondUrl),
      fetch(insuranceUrl),
    ]);

    const [generalData, bondData, insuranceData] = await Promise.all([
      generalRes.json(),
      bondRes.json(),
      insuranceRes.json(),
    ]);

    if (!generalData || generalData.length === 0) {
      return null;
    }

    const general = generalData[0];
    const bond = bondData?.[0];
    const insurance = insuranceData?.[0];

    return {
      // General info
      licenseNumber: general.contractorlicensenumber,
      contractorName: general.businessname,
      licenseType: general.contractorlicensetypecodedesc,
      licenseStatus: general.contractorlicensestatus,
      licenseEffectiveDate: general.licenseeffectivedate,
      licenseExpirationDate: general.licenseexpirationdate,
      
      // Address
      address: general.address1,
      city: general.city,
      state: general.state,
      zip: general.zip,
      phone: general.phonenumber,

      // Business info
      ubi: general.ubi,
      businessType: general.businesstypecodedesc,
      primaryPrincipal: general.primaryprincipalname,

      // Specialty
      specialty1: general.specialtycode1desc,
      specialty2: general.specialtycode2desc,

      // Bond info
      bond: bond ? {
        amount: bond.bond_amount,
        status: bond.bond_status,
        expirationDate: bond.bond_expiration,
      } : null,

      // Insurance info
      insurance: insurance ? {
        status: insurance.insurance_status,
        expirationDate: insurance.insurance_expiration,
      } : null,
    };
  } catch (error) {
    console.error('Error fetching contractor:', error);
    return null;
  }
}

/**
 * Get all contractors in a specific county
 * @param {string} county - County name (uppercase, e.g. 'ISLAND')
 * @returns {Promise<Array>}
 */
export async function getContractorsByCounty(county) {
  try {
    const url = `${BASE_URL}/${DATASETS.GENERAL}.json?city=${county}&$limit=5000`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Socrata API error: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching county contractors:', error);
    return [];
  }
}

/**
 * Check if a contractor is septic-licensed
 * @param {Object} contractor - Contractor record from getContractorByLicense
 * @returns {boolean}
 */
export function isSepticLicensed(contractor) {
  if (!contractor) return false;
  
  const septicTypes = ['SEPTIC', 'SEPDSI', 'SEPMSI', 'SEPUMP'];
  const licenseType = contractor.licenseType?.toUpperCase() || '';
  const specialty1 = contractor.specialty1?.toUpperCase() || '';
  const specialty2 = contractor.specialty2?.toUpperCase() || '';

  return (
    septicTypes.some(type => licenseType.includes(type)) ||
    septicTypes.some(type => specialty1.includes(type)) ||
    septicTypes.some(type => specialty2.includes(type)) ||
    licenseType.includes('CONSTRUCTION') // General contractors may do septic work
  );
}

/**
 * Check if a contractor's license is in good standing
 * @param {Object} contractor - Contractor record
 * @returns {Object} - { isGoodStanding: boolean, issues: string[] }
 */
export function checkCompliance(contractor) {
  const issues = [];

  if (!contractor) {
    return { isGoodStanding: false, issues: ['Contractor not found in WA L&I database'] };
  }

  // Check license status
  if (contractor.licenseStatus !== 'ACTIVE') {
    issues.push(`License status: ${contractor.licenseStatus}`);
  }

  // Check license expiration
  if (contractor.licenseExpirationDate) {
    const expirationDate = new Date(contractor.licenseExpirationDate);
    const today = new Date();
    if (expirationDate < today) {
      issues.push(`License expired on ${expirationDate.toLocaleDateString()}`);
    }
  }

  // Check bond status
  if (contractor.bond) {
    if (contractor.bond.status !== 'CURRENT' && contractor.bond.status !== 'ACTIVE') {
      issues.push(`Bond status: ${contractor.bond.status}`);
    }
    if (contractor.bond.expirationDate) {
      const bondExpiration = new Date(contractor.bond.expirationDate);
      const today = new Date();
      if (bondExpiration < today) {
        issues.push(`Bond expired on ${bondExpiration.toLocaleDateString()}`);
      }
    }
  }

  // Check insurance status
  if (contractor.insurance) {
    if (contractor.insurance.status !== 'CURRENT' && contractor.insurance.status !== 'ACTIVE') {
      issues.push(`Insurance status: ${contractor.insurance.status}`);
    }
    if (contractor.insurance.expirationDate) {
      const insuranceExpiration = new Date(contractor.insurance.expirationDate);
      const today = new Date();
      if (insuranceExpiration < today) {
        issues.push(`Insurance expired on ${insuranceExpiration.toLocaleDateString()}`);
      }
    }
  }

  return {
    isGoodStanding: issues.length === 0,
    issues,
  };
}
