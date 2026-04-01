/**
 * License Verifier Tool Component
 * Embeddable and standalone-compatible
 */

import { useState } from 'react'
import { searchContractors, getContractorByLicense, checkCompliance, isSepticLicensed } from '../lib/socrata'

export default function LicenseVerifier({ embedded = false }) {
  const [searchInput, setSearchInput] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [selectedContractor, setSelectedContractor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchInput.trim()) return

    setLoading(true)
    setError(null)
    setSearchResults(null)
    setSelectedContractor(null)

    try {
      const results = await searchContractors(searchInput)
      if (results.length === 0) {
        setError('No contractors found. Try a different name or company name.')
        setSearchResults([])
      } else {
        setSearchResults(results)
      }
    } catch (err) {
      setError('Error searching contractors. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectContractor = async (licenseNumber) => {
    setLoading(true)
    setError(null)

    try {
      const contractor = await getContractorByLicense(licenseNumber)
      if (!contractor) {
        setError('Could not load contractor details.')
        return
      }
      setSelectedContractor(contractor)
      setSearchResults(null)
    } catch (err) {
      setError('Error loading contractor details.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSearchInput('')
    setSearchResults(null)
    setSelectedContractor(null)
    setError(null)
  }

  // Styles
  const containerStyle = {
    fontFamily: 'system-ui, sans-serif',
    background: embedded ? 'transparent' : 'var(--parchment)',
    padding: embedded ? '20px' : '48px 44px',
    maxWidth: embedded ? '100%' : '800px',
    margin: embedded ? '0' : '0 auto',
    color: 'var(--midnight)',
  }

  const formStyle = {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',
  }

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
  }

  const buttonStyle = {
    padding: '12px 24px',
    background: 'var(--prairie)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }

  const resetButtonStyle = {
    ...buttonStyle,
    background: 'var(--slate-light)',
  }

  const resultsStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  }

  const resultCardStyle = {
    background: 'white',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  }

  const resultCardHoverStyle = {
    ...resultCardStyle,
    borderColor: 'var(--prairie)',
    boxShadow: '0 2px 8px rgba(155, 122, 66, 0.1)',
  }

  const detailStyle = {
    background: 'white',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '24px',
  }

  const detailRowStyle = {
    display: 'grid',
    gridTemplateColumns: '200px 1fr',
    gap: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--birch)',
  }

  const detailRowLastStyle = {
    ...detailRowStyle,
    borderBottom: 'none',
  }

  const labelStyle = {
    fontWeight: '600',
    color: 'var(--slate)',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const valueStyle = {
    fontSize: '14px',
    color: 'var(--midnight)',
  }

  const badgeStyle = (status) => ({
    display: 'inline-block',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '600',
    backgroundColor: status === 'ACTIVE' ? '#e8f4e8' : '#ffe8e8',
    color: status === 'ACTIVE' ? '#3a6b3f' : '#8b2e2e',
  })

  const complianceBoxStyle = {
    background: '#f5f5f5',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '16px',
    marginTop: '16px',
  }

  const errorStyle = {
    background: '#ffe8e8',
    color: '#8b2e2e',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  }

  const loadingStyle = {
    textAlign: 'center',
    padding: '24px',
    color: 'var(--slate-light)',
  }

  // Check compliance for selected contractor
  const compliance = selectedContractor ? checkCompliance(selectedContractor) : null
  const isSeptic = selectedContractor ? isSepticLicensed(selectedContractor) : false

  return (
    <div style={containerStyle}>
      {!embedded && (
        <>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>
            Verify a Septic Contractor
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '24px' }}>
            Look up license status, bond, and insurance directly from the Washington Department of Labor & Industries.
          </p>
        </>
      )}

      {/* Search Form */}
      {!selectedContractor && (
        <form onSubmit={handleSearch} style={formStyle}>
          <input
            type="text"
            placeholder="Enter contractor name or company name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      )}

      {/* Error Message */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* Loading State */}
      {loading && <div style={loadingStyle}>Loading...</div>}

      {/* Search Results */}
      {searchResults && searchResults.length > 0 && (
        <div style={resultsStyle}>
          <p style={{ fontSize: '13px', color: 'var(--slate-light)', marginBottom: '12px' }}>
            Found {searchResults.length} contractor{searchResults.length === 1 ? '' : 's'}. Click to view details.
          </p>
          {searchResults.map((result) => (
            <div
              key={result.contractorlicensenumber}
              style={resultCardStyle}
              onClick={() => handleSelectContractor(result.contractorlicensenumber)}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, resultCardHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, resultCardStyle)}
            >
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                {result.businessname}
              </div>
              <div style={{ fontSize: '12px', color: 'var(--slate-light)' }}>
                {result.city}, {result.state} • License: {result.contractorlicensenumber}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Contractor Details */}
      {selectedContractor && (
        <div style={detailStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '24px' }}>
            <div>
              <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                {selectedContractor.contractorName}
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--slate-light)' }}>
                {selectedContractor.address}<br />
                {selectedContractor.city}, {selectedContractor.state} {selectedContractor.zip}
              </p>
              {selectedContractor.phone && (
                <p style={{ fontSize: '13px', color: 'var(--slate-light)', marginTop: '8px' }}>
                  {selectedContractor.phone}
                </p>
              )}
            </div>
            <button style={resetButtonStyle} onClick={handleReset}>
              ← Back to search
            </button>
          </div>

          {/* License Info */}
          <div style={detailRowStyle}>
            <div style={labelStyle}>License Number</div>
            <div style={valueStyle}>{selectedContractor.licenseNumber}</div>
          </div>

          <div style={detailRowStyle}>
            <div style={labelStyle}>License Type</div>
            <div style={valueStyle}>
              {selectedContractor.licenseType}
              {isSeptic && (
                <span style={{ ...badgeStyle('ACTIVE'), marginLeft: '8px' }}>Septic Licensed</span>
              )}
            </div>
          </div>

          <div style={detailRowStyle}>
            <div style={labelStyle}>License Status</div>
            <div style={valueStyle}>
              <span style={badgeStyle(selectedContractor.licenseStatus)}>
                {selectedContractor.licenseStatus}
              </span>
            </div>
          </div>

          <div style={detailRowStyle}>
            <div style={labelStyle}>License Expires</div>
            <div style={valueStyle}>
              {selectedContractor.licenseExpirationDate
                ? new Date(selectedContractor.licenseExpirationDate).toLocaleDateString()
                : 'N/A'}
            </div>
          </div>

          <div style={detailRowStyle}>
            <div style={labelStyle}>UBI</div>
            <div style={valueStyle}>{selectedContractor.ubi}</div>
          </div>

          {/* Bond Status */}
          {selectedContractor.bond && (
            <div style={detailRowStyle}>
              <div style={labelStyle}>Bond Status</div>
              <div style={valueStyle}>
                <span style={badgeStyle(selectedContractor.bond.status)}>
                  {selectedContractor.bond.status}
                </span>
                {selectedContractor.bond.amount && (
                  <span style={{ marginLeft: '12px', color: 'var(--slate)' }}>
                    Amount: ${parseFloat(selectedContractor.bond.amount).toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Insurance Status */}
          {selectedContractor.insurance && (
            <div style={detailRowStyle}>
              <div style={labelStyle}>Insurance Status</div>
              <div style={valueStyle}>
                <span style={badgeStyle(selectedContractor.insurance.status)}>
                  {selectedContractor.insurance.status}
                </span>
              </div>
            </div>
          )}

          {/* Specialty */}
          <div style={detailRowLastStyle}>
            <div style={labelStyle}>Specialty</div>
            <div style={valueStyle}>
              {selectedContractor.specialty1}
              {selectedContractor.specialty2 && ` • ${selectedContractor.specialty2}`}
            </div>
          </div>

          {/* Compliance Summary */}
          {compliance && (
            <div style={complianceBoxStyle}>
              <div style={{ fontWeight: '600', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  background: compliance.isGoodStanding ? '#3a6b3f' : '#8b2e2e',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>
                  {compliance.isGoodStanding ? '✓' : '⚠'}
                </span>
                {compliance.isGoodStanding ? 'Good Standing' : 'Issues Found'}
              </div>
              {compliance.issues.length > 0 && (
                <ul style={{ marginLeft: '28px', fontSize: '13px', color: 'var(--slate)', lineHeight: '1.6' }}>
                  {compliance.issues.map((issue, idx) => (
                    <li key={idx}>{issue}</li>
                  ))}
                </ul>
              )}
              {compliance.isGoodStanding && (
                <p style={{ fontSize: '13px', color: 'var(--slate)' }}>
                  This contractor's license, bond, and insurance are current and in good standing.
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
