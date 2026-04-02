/**
 * Septic System Failure Risk Assessment Component
 * Diagnostic questionnaire → risk score → contractor recommendations
 */

import { useState } from 'react'

export default function FailureRiskAssessment({ embedded = false }) {
  const [step, setStep] = useState('questions') // 'questions' or 'result'
  const [answers, setAnswers] = useState({
    systemAge: '',
    lastInspection: '',
    slowDrains: false,
    odors: false,
    wetSpots: false,
    householdSize: 4,
    garbageDisposal: false,
    systemType: 'conventional',
  })
  const [result, setResult] = useState(null)

  const questions = [
    {
      id: 'systemAge',
      label: 'How old is your septic system?',
      type: 'select',
      options: [
        { value: '0-5', label: 'Less than 5 years old' },
        { value: '5-10', label: '5-10 years old' },
        { value: '10-20', label: '10-20 years old' },
        { value: '20-30', label: '20-30 years old' },
        { value: '30+', label: 'More than 30 years old' },
        { value: 'unknown', label: 'I don\'t know' },
      ],
    },
    {
      id: 'lastInspection',
      label: 'When was your system last inspected?',
      type: 'select',
      options: [
        { value: 'within1yr', label: 'Within the last year' },
        { value: '1-3yrs', label: '1-3 years ago' },
        { value: '3-5yrs', label: '3-5 years ago' },
        { value: 'over5yrs', label: 'More than 5 years ago' },
        { value: 'never', label: 'Never' },
      ],
    },
    {
      id: 'slowDrains',
      label: 'Do you notice slow drains in your home?',
      type: 'radio',
    },
    {
      id: 'odors',
      label: 'Do you smell sewage or rotten eggs in your yard?',
      type: 'radio',
    },
    {
      id: 'wetSpots',
      label: 'Are there unusually wet or green patches over your drain field?',
      type: 'radio',
    },
    {
      id: 'householdSize',
      label: 'How many people live in your home?',
      type: 'number',
    },
    {
      id: 'garbageDisposal',
      label: 'Do you use a garbage disposal?',
      type: 'radio',
    },
    {
      id: 'systemType',
      label: 'What type of system do you have?',
      type: 'select',
      options: [
        { value: 'conventional', label: 'Conventional gravity system' },
        { value: 'mound', label: 'Mound system' },
        { value: 'atu', label: 'Aerobic/ATU system' },
        { value: 'unknown', label: 'I don\'t know' },
      ],
    },
  ]

  const calculateRisk = () => {
    let riskScore = 0
    let factors = []

    // System age scoring
    if (answers.systemAge === '30+') {
      riskScore += 25
      factors.push('System is over 30 years old (high failure risk)')
    } else if (answers.systemAge === '20-30') {
      riskScore += 20
      factors.push('System is 20-30 years old (increased failure risk)')
    } else if (answers.systemAge === '10-20') {
      riskScore += 10
      factors.push('System is 10-20 years old')
    } else if (answers.systemAge === '0-5') {
      riskScore += 0
      factors.push('System is relatively new')
    }

    // Inspection frequency
    if (answers.lastInspection === 'never') {
      riskScore += 20
      factors.push('No recent inspection (compliance risk)')
    } else if (answers.lastInspection === 'over5yrs') {
      riskScore += 15
      factors.push('Last inspection was over 5 years ago')
    } else if (answers.lastInspection === '3-5yrs') {
      riskScore += 5
      factors.push('Last inspection was 3-5 years ago')
    }

    // Physical symptoms
    if (answers.slowDrains) {
      riskScore += 15
      factors.push('Slow drains detected (potential blockage or failure)')
    }
    if (answers.odors) {
      riskScore += 20
      factors.push('Sewage odors detected (system compromise)')
    }
    if (answers.wetSpots) {
      riskScore += 25
      factors.push('Wet/green patches over drain field (imminent failure risk)')
    }

    // Household factors
    if (answers.householdSize >= 5) {
      riskScore += 10
      factors.push(`Large household (${answers.householdSize} people) puts stress on system`)
    }
    if (answers.garbageDisposal) {
      riskScore += 10
      factors.push('Garbage disposal use increases solids load')
    }

    // Cap at 100
    riskScore = Math.min(riskScore, 100)

    // Determine risk level and recommendation
    let riskLevel = 'LOW'
    let riskColor = '#3a6b3f'
    let recommendation = ''

    if (riskScore >= 70) {
      riskLevel = 'CRITICAL'
      riskColor = '#8b2e2e'
      recommendation = 'Your system shows signs of failure. Call a licensed septic contractor immediately for an inspection and quotes. Delaying could result in emergency repairs costing $10,000+'
    } else if (riskScore >= 50) {
      riskLevel = 'HIGH'
      riskColor = '#d9552e'
      recommendation = 'Your system is at risk. Get quotes from licensed contractors for inspection and potential repairs within the next 30 days.'
    } else if (riskScore >= 30) {
      riskLevel = 'MEDIUM'
      riskColor = '#8b7a1e'
      recommendation = 'Your system may be approaching problems. Schedule an inspection and consider preventive maintenance.'
    } else {
      riskLevel = 'LOW'
      riskColor = '#3a6b3f'
      recommendation = 'Your system appears to be healthy. Continue regular maintenance and annual inspections.'
    }

    setResult({
      riskScore,
      riskLevel,
      riskColor,
      recommendation,
      factors,
      householdSize: answers.householdSize,
      systemType: answers.systemType,
    })
    setStep('result')
  }

  const handleAnswerChange = (id, value) => {
    setAnswers({ ...answers, [id]: value })
  }

  const handleReset = () => {
    setAnswers({
      systemAge: '',
      lastInspection: '',
      slowDrains: false,
      odors: false,
      wetSpots: false,
      householdSize: 4,
      garbageDisposal: false,
      systemType: 'conventional',
    })
    setStep('questions')
    setResult(null)
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

  const questionStyle = {
    marginBottom: '24px',
  }

  const labelStyle = {
    display: 'block',
    fontWeight: '600',
    fontSize: '14px',
    color: 'var(--midnight)',
    marginBottom: '10px',
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

  const radioGroupStyle = {
    display: 'flex',
    gap: '16px',
  }

  const radioStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
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
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: color,
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
  })

  const riskScoreStyle = {
    fontSize: '28px',
    fontWeight: '600',
    color: 'var(--midnight)',
    marginBottom: '4px',
  }

  const riskLevelStyle = {
    fontSize: '12px',
    color: 'var(--slate-light)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  }

  const recommendationStyle = {
    background: '#f5f5f5',
    border: '1px solid var(--birch)',
    borderRadius: '6px',
    padding: '14px',
    fontSize: '14px',
    lineHeight: '1.6',
    marginBottom: '16px',
  }

  const factorListStyle = {
    background: 'var(--parchment)',
    borderRadius: '6px',
    padding: '14px',
    marginTop: '16px',
  }

  return (
    <div style={containerStyle}>
      {!embedded && step === 'questions' && (
        <>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '24px', marginBottom: '12px' }}>
            Septic System Failure Risk Assessment
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--slate)', marginBottom: '24px' }}>
            Answer a few quick questions to assess whether your septic system is at risk of failure.
          </p>
        </>
      )}

      {step === 'questions' && (
        <form style={formStyle} onSubmit={(e) => { e.preventDefault(); calculateRisk() }}>
          {questions.map((q) => (
            <div key={q.id} style={questionStyle}>
              <label style={labelStyle}>{q.label}</label>

              {q.type === 'select' && (
                <select
                  value={answers[q.id]}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  style={inputStyle}
                >
                  <option value="">Select an option...</option>
                  {q.options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              )}

              {q.type === 'radio' && (
                <div style={radioGroupStyle}>
                  <label style={radioStyle}>
                    <input
                      type="radio"
                      checked={answers[q.id] === true}
                      onChange={() => handleAnswerChange(q.id, true)}
                    />
                    Yes
                  </label>
                  <label style={radioStyle}>
                    <input
                      type="radio"
                      checked={answers[q.id] === false}
                      onChange={() => handleAnswerChange(q.id, false)}
                    />
                    No
                  </label>
                </div>
              )}

              {q.type === 'number' && (
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={answers[q.id]}
                  onChange={(e) => handleAnswerChange(q.id, parseInt(e.target.value))}
                  style={inputStyle}
                />
              )}
            </div>
          ))}

          <button type="submit" style={buttonStyle}>
            Calculate Risk →
          </button>
        </form>
      )}

      {step === 'result' && result && (
        <>
          <div style={resultBoxStyle}>
            <div style={resultHeaderStyle}>
              <div style={riskBadgeStyle(result.riskColor)}>
                {result.riskScore}
              </div>
              <div>
                <div style={riskScoreStyle}>Risk Score</div>
                <div style={riskLevelStyle}>{result.riskLevel} Priority</div>
              </div>
            </div>

            <div style={recommendationStyle}>
              {result.recommendation}
            </div>

            <div style={factorListStyle}>
              <div style={{ fontWeight: '600', marginBottom: '8px' }}>Contributing Factors:</div>
              <ul style={{ marginLeft: '20px', fontSize: '13px', color: 'var(--slate)', lineHeight: '1.6' }}>
                {result.factors.map((factor, idx) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: '16px' }}>
              <button
                onClick={handleReset}
                style={{ ...buttonStyle, background: 'var(--slate-light)' }}
              >
                Retake Assessment
              </button>
            </div>
          </div>

          {result.riskLevel !== 'LOW' && (
            <div style={{ background: 'var(--green-light)', border: '1px solid #b8d8b8', borderRadius: '6px', padding: '14px', fontSize: '13px', color: '#3a6b3f' }}>
              <strong>Ready to get quotes?</strong> Find licensed Island County septic contractors and get free estimates.
            </div>
          )}
        </>
      )}
    </div>
  )
}
