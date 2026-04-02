/**
 * Washington State County Septic Requirements Lookup
 * Shows inspection frequency, requirements, and local rules for all 39 WA counties
 * (Currently: Island, Kitsap, Whatcom, Clark placeholder; will expand)
 */

import { useState } from 'react'
import { getAllMarkets } from '../config/markets'

export default function CountyRequirements({ embedded = false }) {
  const [selectedCounty, setSelectedCounty] = useState('island-county')
  const allMarkets = getAllMarkets()
  const selectedMarket = allMarkets.find(m => m.id === selectedCounty)

  // Styles
  const containerStyle = {
    fontFamily: 'system-ui, sans-serif',
    background: embedded ? 'transparent' : 'var(--parchment)',
    padding: embedded ? '20px' : '48px 44px',
    maxWidth: embedded ? '100%' : '1000px',
    margin: embedded ? '0' : '0 auto',
    color: 'var(--midnight)',
  }

  const selectorStyle = {
    background: 'white',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '20px',
    marginBottom: '24px',
  }

  const selectStyle = {
    width: '100%',
    padding: '12px 14px',
    border: '1px solid var(--birch)',
    borderRadius: '6px',
    fontSize: '14px',
    fontFamily: 'system-ui, sans-serif',
    boxSizing: 'border-box',
  }

  const resultBoxStyle = {
    background: 'white',
    border: '1px solid var(--birch)',
    borderRadius: '8px',
    padding: '24px',
    marginBottom: '24px',
  }

  const sectionTitleStyle = {
    fontFamily: 'Georgia, serif',
    fontSize: '20px',
    fontWeight: 'normal',
    color: 'var(--midnight)',
    marginTop: '20px',
    marginBottom: '12px',
    paddingBottom: '8px',
    borderBottom: '1px solid var(--birch)',
  }

  const ruleItemStyle = {
    padding: '12px',
    background: 'var(--parchment)',
    borderRadius: '6px',
    marginBottom: '10px',
    borderLeft: '3px solid var(--prairie)',
  }

  const ruleItemLabelStyle = {
    fontWeight: '600',
    fontSize: '13px',
    color: 'var(--slate)',
    marginBottom: '4px',
  }

  const ruleItemValueStyle = {
    fontSize: '14px',
    color: 'var(--midnight)',
  }

  const deptBoxStyle = {
    background: 'var(--green-light)',
    border: '1px solid #b8d8b8',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '13px',
    color: '#3a6b3f',
    lineHeight: '1.6',
  }

  const mandateBoxStyle = {
    background: '#fdf3e3',
    border: '1px solid #e8d09a',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '13px',
    color: '#7a5a1e',
    marginTop: '16px',
  }

  if (!selectedMarket) {
    return <div style={containerStyle}>County not found.</div>
  }

  return (
    <div style={containerStyle}>
      {!embedded && (
        <>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>
            Washington State Septic Requirements by County
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '24px' }}>
            Every Washington county has specific requirements for septic inspections and maintenance. Select your county to see local rules.
          </p>
        </>
      )}

      {/* County Selector */}
      <div style={selectorStyle}>
        <label style={{ display: 'block', fontWeight: '600', fontSize: '12px', color: 'var(--slate)', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Select Your County
        </label>
        <select value={selectedCounty} onChange={(e) => setSelectedCounty(e.target.value)} style={selectStyle}>
          {allMarkets.map((market) => (
            <option key={market.id} value={market.id}>
              {market.name}, {market.state}
            </option>
          ))}
        </select>
      </div>

      {/* Results */}
      <div style={resultBoxStyle}>
        <h3 style={sectionTitleStyle}>{selectedMarket.name}, {selectedMarket.state}</h3>

        {/* Inspection Rules */}
        <div style={{ marginTop: '16px' }}>
          <div style={ruleItemStyle}>
            <div style={ruleItemLabelStyle}>Inspection Frequency</div>
            <div style={ruleItemValueStyle}>
              Every {selectedMarket.compliance.inspection_frequency_years} years
            </div>
          </div>

          <div style={ruleItemStyle}>
            <div style={ruleItemLabelStyle}>Required for Property Transfer</div>
            <div style={ruleItemValueStyle}>
              {selectedMarket.compliance.inspection_required_for_transfer ? 'Yes' : 'No'}
              {selectedMarket.compliance.transfer_required_by && (
                <div style={{ fontSize: '12px', color: 'var(--slate-light)', marginTop: '4px' }}>
                  Effective: {new Date(selectedMarket.compliance.transfer_required_by).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              )}
            </div>
          </div>

          <div style={ruleItemStyle}>
            <div style={ruleItemLabelStyle}>Licensed Provider Types</div>
            <div style={ruleItemValueStyle}>
              {selectedMarket.compliance.licensed_provider_types.join(', ')}
            </div>
          </div>
        </div>

        {/* Health Department Contact */}
        {selectedMarket.compliance.health_department && (
          <div style={deptBoxStyle}>
            <div style={{ fontWeight: '600', marginBottom: '6px' }}>
              {selectedMarket.compliance.health_department.name}
            </div>
            <div>
              <strong>Phone:</strong> <a href={`tel:${selectedMarket.compliance.health_department.phone}`} style={{ color: 'inherit', textDecoration: 'underline' }}>{selectedMarket.compliance.health_department.phone}</a>
            </div>
            <div style={{ marginTop: '4px' }}>
              <strong>Website:</strong> <a href={selectedMarket.compliance.health_department.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'underline' }}>
                {selectedMarket.compliance.health_department.website.replace('https://', '')}
              </a>
            </div>
          </div>
        )}

        {/* Statewide Mandate Note */}
        <div style={mandateBoxStyle}>
          <strong>📋 Statewide Mandate (Feb 2027):</strong> Washington State will require septic inspections for all property transfers statewide, starting February 1, 2027 (WAC 246-272A-0270). If you're buying or selling property in {selectedMarket.name}, plan ahead.
        </div>
      </div>

      {/* Info Section */}
      <div style={resultBoxStyle}>
        <h3 style={sectionTitleStyle}>Why These Rules Exist</h3>
        <p style={{ fontSize: '13px', color: 'var(--slate)', lineHeight: '1.6', marginBottom: '12px' }}>
          Septic system failures contaminate groundwater and threaten public health. Washington State requires regular inspections and property transfer compliance to catch problems early and protect everyone's water supply.
        </p>
        <p style={{ fontSize: '13px', color: 'var(--slate)', lineHeight: '1.6' }}>
          {selectedMarket.name}'s specific rules reflect local soil conditions, water table depth, and population density. Always verify current requirements with your county health department before selling or making septic system changes.
        </p>
      </div>
    </div>
  )
}
