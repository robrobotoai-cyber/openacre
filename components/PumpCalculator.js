/**
 * Pump-Out Interval Calculator Component
 * Embeddable and standalone-compatible
 */

import { useState } from 'react'

export default function PumpCalculator({ embedded = false }) {
  const [householdSize, setHouseholdSize] = useState(4)
  const [tankSize, setTankSize] = useState(1000)
  const [lastPumpDate, setLastPumpDate] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  // Default cost ranges by tank size (Island County, WA)
  const costRanges = {
    500: { min: 300, max: 400 },
    750: { min: 350, max: 450 },
    1000: { min: 350, max: 500 },
    1200: { min: 400, max: 550 },
    1500: { min: 400, max: 600 },
    2000: { min: 450, max: 700 },
  }

  const calculatePumpInterval = (e) => {
    e.preventDefault()
    setError(null)
    setResult(null)

    // Basic validation
    if (!householdSize || householdSize < 1) {
      setError('Please enter a valid household size.')
      return
    }
    if (!tankSize || tankSize < 500) {
      setError('Tank size should be at least 500 gallons.')
      return
    }
    if (!lastPumpDate) {
      setError('Please select your last pump-out date.')
      return
    }

    // Calculate based on WA DOH guidelines
    // General rule: pump every 3-5 years depending on household size and tank size
    // Formula: (Tank size in gallons / (Household size × Gallons per person per day)) / 365 days
    // Typical usage: 60-80 gallons per person per day
    const gallonsPerPersonPerDay = 70
    const totalDailyUsage = householdSize * gallonsPerPersonPerDay
    const daysToFill = Math.floor(tankSize / totalDailyUsage)
    const yearsToFill = daysToFill / 365

    // Island County recommendation: every 3-5 years
    // If household is large or tank is small, recommend 3 years
    // If household is small or tank is large, recommend 4-5 years
    let recommendedYears = 3.5
    if (householdSize <= 2 && tankSize >= 1500) {
      recommendedYears = 5
    } else if (householdSize <= 2) {
      recommendedYears = 4.5
    } else if (householdSize >= 5 && tankSize <= 1000) {
      recommendedYears = 3
    }

    // Calculate next pump date
    const lastPump = new Date(lastPumpDate)
    const nextPump = new Date(lastPump)
    nextPump.setFullYear(nextPump.getFullYear() + Math.floor(recommendedYears))
    nextPump.setMonth(nextPump.getMonth() + Math.round((recommendedYears % 1) * 12))

    // Calculate days until next pump
    const today = new Date()
    const daysUntilPump = Math.ceil((nextPump - today) / (1000 * 60 * 60 * 24))

    // Determine risk level
    let riskLevel = 'LOW'
    let riskColor = '#3a6b3f'
    let recommendation = 'On schedule. No immediate action needed.'

    if (daysUntilPump < 0) {
      riskLevel = 'CRITICAL'
      riskColor = '#8b2e2e'
      recommendation = 'OVERDUE. Schedule a pump-out immediately to avoid system damage.'
    } else if (daysUntilPump < 30) {
      riskLevel = 'HIGH'
      riskColor = '#d9552e'
      recommendation = 'Due within 30 days. Schedule your pump-out soon.'
    } else if (daysUntilPump < 90) {
      riskLevel = 'MEDIUM'
      riskColor = '#8b7a1e'
      recommendation = 'Due within 90 days. Schedule in the next few weeks.'
    }

    // Get cost range
    const closestTankSize = Object.keys(costRanges)
      .map(Number)
      .reduce((prev, curr) =>
        Math.abs(curr - tankSize) < Math.abs(prev - tankSize) ? curr : prev
      )
    const costRange = costRanges[closestTankSize]

    setResult({
      recommendedYears: recommendedYears.toFixed(1),
      nextPumpDate: nextPump.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
      daysUntilPump,
      riskLevel,
      riskColor,
      recommendation,
      costMin: costRange.min,
      costMax: costRange.max,
      householdSize,
      tankSize,
    })
  }

  const handleReset = () => {
    setHouseholdSize(4)
    setTankSize(1000)
    setLastPumpDate('')
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

  const rangeStyle = {
    width: '100%',
    height: '6px',
    borderRadius: '3px',
    outline: 'none',
    accentColor: 'var(--prairie)',
  }

  const sliderValueStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--prairie)',
    marginTop: '6px',
  }

  const buttonGroupStyle = {
    display: 'flex',
    gap: '10px',
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

  const riskBadgeStyle = (color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    background: color,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '12px',
  })

  const resultDateStyle = {
    fontSize: '24px',
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

  const recommendationStyle = {
    background: '#f5f5f5',
    border: '1px solid var(--birch)',
    borderRadius: '6px',
    padding: '12px 14px',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '16px',
    color: 'var(--midnight)',
  }

  const resultGridStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '16px',
  }

  const resultGridSingleStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '16px',
    marginBottom: '16px',
  }

  const resultItemStyle = {
    padding: '12px',
    background: 'var(--parchment)',
    borderRadius: '6px',
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
    fontSize: '18px',
    fontWeight: '600',
    color: 'var(--midnight)',
  }

  const resultItemSmallStyle = {
    fontSize: '13px',
    color: 'var(--slate)',
    marginTop: '4px',
  }

  return (
    <div style={containerStyle}>
      {!embedded && (
        <>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>
            Septic Pump-Out Calculator
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '24px' }}>
            Find out when your septic tank needs pumping based on household size, tank capacity, and last service date.
          </p>
        </>
      )}

      {/* Form */}
      <form onSubmit={calculatePumpInterval} style={formStyle}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Household Size (Number of People)</label>
          <input
            type="number"
            min="1"
            max="20"
            value={householdSize}
            onChange={(e) => setHouseholdSize(parseInt(e.target.value))}
            style={inputStyle}
          />
          <div style={sliderValueStyle}>{householdSize} people</div>
        </div>

        <div style={formGroupStyle}>
          <label style={labelStyle}>Septic Tank Size (Gallons)</label>
          <select
            value={tankSize}
            onChange={(e) => setTankSize(parseInt(e.target.value))}
            style={inputStyle}
          >
            <option value={500}>500 gallons</option>
            <option value={750}>750 gallons</option>
            <option value={1000}>1,000 gallons</option>
            <option value={1200}>1,200 gallons</option>
            <option value={1500}>1,500 gallons</option>
            <option value={2000}>2,000 gallons</option>
          </select>
        </div>

        <div style={formGroupLastStyle}>
          <label style={labelStyle}>Last Pump-Out Date</label>
          <input
            type="date"
            value={lastPumpDate}
            onChange={(e) => setLastPumpDate(e.target.value)}
            style={inputStyle}
          />
          <div style={{ fontSize: '12px', color: 'var(--slate-light)', marginTop: '6px' }}>
            When was your tank last pumped?
          </div>
        </div>

        <div style={{ ...buttonGroupStyle, marginTop: '24px' }}>
          <button type="submit" style={buttonStyle}>
            Calculate →
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
              <div style={riskBadgeStyle(result.riskColor)}>
                {result.riskLevel === 'CRITICAL' && '!'}
                {result.riskLevel === 'HIGH' && '⚠'}
                {result.riskLevel === 'MEDIUM' && '◐'}
                {result.riskLevel === 'LOW' && '✓'}
              </div>
              <div>
                <div style={resultDateStyle}>{result.nextPumpDate}</div>
                <div style={resultSubStyle}>{result.riskLevel} Priority</div>
              </div>
            </div>

            <div style={recommendationStyle}>{result.recommendation}</div>

            <div style={resultGridStyle}>
              <div style={resultItemStyle}>
                <div style={resultItemLabelStyle}>Recommended Interval</div>
                <div style={resultItemValueStyle}>{result.recommendedYears} years</div>
                <div style={resultItemSmallStyle}>Based on household size & tank capacity</div>
              </div>

              <div style={resultItemStyle}>
                <div style={resultItemLabelStyle}>Days Until Pump</div>
                <div style={resultItemValueStyle}>
                  {result.daysUntilPump > 0 ? result.daysUntilPump : 'Overdue'}
                </div>
                <div style={resultItemSmallStyle}>
                  {result.daysUntilPump > 0
                    ? `${Math.floor(result.daysUntilPump / 30)} months, ${result.daysUntilPump % 30} days`
                    : 'Schedule immediately'}
                </div>
              </div>
            </div>

            <div style={resultGridSingleStyle}>
              <div style={resultItemStyle}>
                <div style={resultItemLabelStyle}>Typical Pump-Out Cost (Island County)</div>
                <div style={resultItemValueStyle}>
                  ${result.costMin} – ${result.costMax}
                </div>
                <div style={resultItemSmallStyle}>
                  For a {result.tankSize}-gallon tank. Prices may vary by contractor and accessibility.
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--green-light)', border: '1px solid #b8d8b8', borderRadius: '6px', padding: '12px 14px', fontSize: '13px', color: '#3a6b3f', lineHeight: '1.6' }}>
            <strong>💡 Pro tip:</strong> Keep a log of your pump-out dates. Most lenders require proof of recent pumping for property transfers in Washington State.
          </div>
        </>
      )}
    </div>
  )
}
