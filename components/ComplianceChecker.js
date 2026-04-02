/**
 * Property Transfer Compliance Checker Component
 * Embeddable and standalone-compatible
 */

import { useState } from 'react'
import { DEFAULT_MARKET, getMarket } from '../config/markets'

export default function ComplianceChecker({ embedded = false, defaultCounty = 'island-county' }) {
  const [county, setCounty] = useState(defaultCounty)
  const [address, setAddress] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const checkCompliance = (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    if (!county) {
      setError('Please select a county.')
      return
    }

    if (!address || address.trim().length < 5) {
      setError('Please enter a valid property address.')
      return
    }

    const market = getMarket(county)
    if (!market) {
      setError('County not found.')
      return
    }

    // For now, return static compliance info based on county rules
    // In production, this would query OnlineRME or county database
    const complianceData = {
      county: market.name,
      state: market.state,
      address: address.trim(),
      inspectionRequired: market.compliance.inspection_required,
      inspectionFrequencyYears: market.compliance.inspection_frequency_years,
      transferRequired: market.compliance.inspection_required_for_transfer,
      transferDeadline: market.compliance.transfer_required_by,
      licenseProviders: market.compliance.licensed_provider_types,
      healthDepartment: market.compliance.health_department,
    }

    setResult(complianceData)
  }

  const handleReset = () => {
    setAddress('')
    setResult(null)
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
    background: 'white',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
  }

  const formGroupStyle = {
    marginBottom: '20px',
  }

  const formGroupLastStyle = {
    ...formGroupStyle,
    marginBottom: '0',
  }

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    fontSize: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    color: 'var(--slate)',
    marginBottom: '8px',
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--birch)',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    boxSizing: 'border-box',
  }

  const selectStyle = inputStyle

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
    marginTop: '24px',
  }

  const buttonStyle = {
    flex: 1,
    padding: '12px 20px',
    background: 'var(--prairie)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  }

  const buttonResetStyle = {
    flex: 1,
    padding: '12px 20px',
    background: 'var(--slate-light)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
  }

  const errorStyle = {
    background: '#ffe8e8',
    color: '#8b2e2e',
    padding: '12px 16px',
    borderRadius: '6px',
    marginBottom: '16px',
    fontSize: '14px',
  }

  const resultBoxStyle = {
    background: 'white',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '16px',
  }

  const resultHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid var(--birch)',
  }

  const statusBadgeStyle = (compliant) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: compliant ? '#3a6b3f' : '#8b2e2e',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '18px',
  })

  const resultAddressStyle = {
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--midnight)',
    marginBottom: '4px',
  }

  const resultSubStyle = {
    fontSize: '12px',
    color: 'var(--slate-light)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  }

  const complianceBoxStyle = {
    background: '#f5f5f5',
    border: '1px solid var(--birch)',
    borderRadius: '6px',
    padding: '14px',
    marginBottom: '16px',
    fontSize: '14px',
    lineHeight: '1.6',
  }

  const resultItemStyle = {
    padding: '12px',
    background: 'var(--parchment)',
    borderRadius: '6px',
    marginBottom: '12px',
  }

  const resultItemLabelStyle = {
    fontSize: '11px',
    fontWeight: '600',
    color: 'var(--slate)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
  }

  const resultItemValueStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--midnight)',
  }

  const healthDeptStyle = {
    background: 'var(--green-light)',
    border: '1px solid #b8d8b8',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '13px',
    color: '#3a6b3f',
  }

  return (
    <div style={containerStyle}>
      {!embedded && (
        <>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>
            Property Transfer Compliance Checker
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '24px' }}>
            Verify that your property has a compliant septic inspection on file for sale or transfer.
          </p>
        </>
      )}

      {/* Form */}
      <form onSubmit={checkCompliance} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>County</label>
          <select value={county} onChange={(e) => setCounty(e.target.value)} style={selectStyle}>
            <option value="island-county">Island County, WA</option>
            <option value="kitsap-county">Kitsap County, WA</option>
            <option value="whatcom-county">Whatcom County, WA</option>
            <option value="clark-county">Clark County, WA</option>
          </select>
        </div>

        <div style={formGroupLastStyle}>
          <label style={labelStyle}>Property Address</label>
          <input
            type="text"
            placeholder="e.g. 123 Main St, Oak Harbor, WA 98277"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={buttonGroupStyle}>
          <button type="submit" style={buttonStyle}>
            Check Compliance →
          </button>
          <button type="button" onClick={handleReset} style={buttonResetStyle}>
            Reset
          </button>
        </div>
      </form>

      {/* Error */}
      {error && <div style={errorStyle}>{error}</div>}

      {/* Result */}
      {result && (
        <>
          <div style={resultBoxStyle}>
            <div style={resultHeaderStyle}>
              <div style={statusBadgeStyle(true)}>✓</div>
              <div>
                <div style={resultAddressStyle}>{result.address}</div>
                <div style={resultSubStyle}>{result.county}, {result.state}</div>
              </div>
            </div>

            <div style={complianceBoxStyle}>
              <strong>Inspection Required:</strong> {result.transferRequired ? 'Yes' : 'No'} for property transfer
              {result.transferDeadline && (
                <div style={{ marginTop: '6px' }}>
                  <strong>Effective:</strong> {new Date(result.transferDeadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
            </div>

            <div style={resultItemStyle}>
              <div style={resultItemLabelStyle}>Inspection Frequency</div>
              <div style={resultItemValueStyle}>Every {result.inspectionFrequencyYears} years</div>
            </div>

            <div style={resultItemStyle}>
              <div style={resultItemLabelStyle}>Licensed Provider Types</div>
              <div style={resultItemValueStyle}>
                {result.licenseProviders.join(', ')}
              </div>
            </div>

            {result.healthDepartment && (
              <div style={healthDeptStyle}>
                <strong>{result.healthDepartment.name}</strong>
                <div style={{ marginTop: '6px' }}>
                  Phone: <a href={`tel:${result.healthDepartment.phone}`} style={{ color: 'inherit', fontWeight: 600 }}>{result.healthDepartment.phone}</a>
                </div>
                <div style={{ marginTop: '3px' }}>
                  Website: <a href={result.healthDepartment.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', fontWeight: 600 }}>
                    {result.healthDepartment.website.replace('https://', '')}
                  </a>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
