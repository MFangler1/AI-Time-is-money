import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API routes
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

app.use(renderer)

// API Routes
app.get('/api/ai-use-cases', (c) => {
  const aiUseCases = [
    {
      category: 'Customer Service & Communication',
      priority: 'High Impact',
      tools: [
        {
          name: 'AI Chatbots & Virtual Assistants',
          description: '24/7 customer support, handles FAQs, basic queries, appointment scheduling',
          costSavings: '60-80% reduction in customer service costs',
          timeSavings: '24/7 availability, instant responses',
          monthlyROI: 2500,
          tools: ['Zendesk Answer Bot', 'Intercom Resolution Bot', 'Freshchat']
        },
        {
          name: 'Email & Communication Management',
          description: 'Automated email responses, classification & routing, sentiment analysis',
          costSavings: '40-60% reduction in email processing time',
          timeSavings: '10-15 hours per week',
          monthlyROI: 1200,
          tools: ['Gmail Smart Reply', 'Outlook AI', 'HubSpot AI']
        }
      ]
    },
    {
      category: 'Marketing & Sales Automation',
      priority: 'High Impact',
      tools: [
        {
          name: 'Content Marketing AI',
          description: 'Automated content creation, SEO optimisation, A/B testing',
          costSavings: '70% reduction in content creation costs',
          timeSavings: '5-10 hours per week',
          monthlyROI: 1800,
          tools: ['Jasper AI', 'Copy.ai', 'Writesonic']
        },
        {
          name: 'Social Media Management',
          description: 'Automated posting schedules, engagement monitoring, influencer identification',
          costSavings: '£500-£2000 per month vs hiring social media manager',
          timeSavings: '8-12 hours per week',
          monthlyROI: 1500,
          tools: ['Hootsuite Insights', 'Sprout Social', 'Buffer AI']
        }
      ]
    },
    {
      category: 'Data Analysis & Business Intelligence',
      priority: 'Medium-High Impact',
      tools: [
        {
          name: 'Financial Analysis',
          description: 'Automated bookkeeping, cash flow forecasting, fraud detection',
          costSavings: '£200-£500 per month vs hiring bookkeeper',
          timeSavings: '6-10 hours per week',
          monthlyROI: 800,
          tools: ['QuickBooks AI', 'Xero Analytics', 'Receipt Bank']
        },
        {
          name: 'Sales Analytics',
          description: 'Lead scoring, customer lifetime value prediction, sales forecasting',
          costSavings: '25-35% improvement in conversion rates',
          timeSavings: '10-15 hours per week',
          monthlyROI: 2200,
          tools: ['Salesforce Einstein', 'HubSpot Predictive Lead Scoring']
        }
      ]
    }
  ]
  
  return c.json({ success: true, data: aiUseCases })
})

app.get('/api/calculate-savings', (c) => {
  const businessType = c.req.query('type') || 'sme'
  const employeeCount = parseInt(c.req.query('employees') || '5')
  
  const baseROI = businessType === 'nonprofit' ? 800 : 1200
  const multiplier = Math.min(employeeCount / 5, 10) // Cap at 10x for very large businesses
  
  const monthlyROI = baseROI * multiplier
  const threeMonthROI = monthlyROI * 3 * 1.1 // 10% compound benefit
  const yearlyROI = monthlyROI * 12 * 1.2 // 20% compound benefit
  
  const cost = businessType === 'nonprofit' ? 4.99 : 9.99
  const vatRate = 0.2
  const totalCost = cost * (1 + vatRate)
  
  return c.json({
    success: true,
    data: {
      businessType,
      employeeCount,
      cost: cost,
      vat: cost * vatRate,
      totalCost: totalCost,
      savings: {
        oneMonth: monthlyROI,
        threeMonths: threeMonthROI,
        oneYear: yearlyROI
      },
      paybackTime: totalCost / monthlyROI * 30 // days to payback
    }
  })
})

app.post('/api/assessment', async (c) => {
  const body = await c.req.json()
  
  // In a real application, this would process the assessment and generate a report
  const reportId = Math.random().toString(36).substr(2, 9)
  
  return c.json({
    success: true,
    reportId: reportId,
    message: 'Assessment submitted successfully. Your comprehensive AI report is being generated.',
    estimatedTime: '2-3 minutes'
  })
})

// Main route
app.get('/', (c) => {
  return c.render(
    <div id="app">
      <div className="matrix-bg"></div>
      
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-text">AI Time is Money</span>
            <span className="logo-tagline">Powered by AiConsultancy.org.uk</span>
          </div>
          <div className="nav-menu">
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#assessment" className="nav-link">Assessment</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Business with 
            <span className="neon-text"> AI Automation</span>
          </h1>
          <p className="hero-subtitle">
            Discover how AI can save your SME, solopreneur business, or non-profit organisation 
            thousands of pounds and hundreds of hours every month.
          </p>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">60-80%</div>
              <div className="stat-label">Cost Reduction</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">20+</div>
              <div className="stat-label">Hours Saved Weekly</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">£25k+</div>
              <div className="stat-label">Annual Savings</div>
            </div>
          </div>
          <div className="hero-cta">
            <button className="cta-button primary" onclick="scrollToAssessment()">
              Get Your AI Report - £9.99
            </button>
            <button className="cta-button secondary" onclick="showDemo()">
              See Demo Report
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-content">
          <h2 className="section-title">AI Solutions That <span className="neon-text">Actually Work</span></h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>Customer Service Automation</h3>
              <p>24/7 AI chatbots and virtual assistants that handle customer queries, reducing response time from hours to seconds.</p>
              <div className="feature-benefit">Save: £2,500/month</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📧</div>
              <h3>Email & Communication AI</h3>
              <p>Automated email responses, classification, and sentiment analysis to streamline your communication workflow.</p>
              <div className="feature-benefit">Save: 15 hours/week</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Marketing Automation</h3>
              <p>AI-powered content creation, social media management, and email marketing that increases conversion rates.</p>
              <div className="feature-benefit">Save: £1,800/month</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Financial Analysis</h3>
              <p>Automated bookkeeping, cash flow forecasting, and financial reporting to keep your business on track.</p>
              <div className="feature-benefit">Save: £500/month</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Sales Intelligence</h3>
              <p>Lead scoring, customer analytics, and sales forecasting to maximise your revenue potential.</p>
              <div className="feature-benefit">35% more conversions</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3>Website Optimisation</h3>
              <p>AI-powered website analysis and optimisation recommendations to boost your online presence.</p>
              <div className="feature-benefit">30% more traffic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="pricing-section">
        <div className="section-content">
          <h2 className="section-title">Affordable AI for <span className="neon-text">Everyone</span></h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <div className="pricing-header">
                <h3>SMEs & Solopreneurs</h3>
                <div className="price">
                  <span className="price-currency">£</span>
                  <span className="price-amount">9.99</span>
                  <span className="price-strike">£19.99</span>
                </div>
                <div className="price-note">50% Launch Discount + VAT</div>
              </div>
              <div className="pricing-features">
                <div className="feature">✓ Comprehensive AI Assessment</div>
                <div className="feature">✓ Custom Implementation Roadmap</div>
                <div className="feature">✓ Cost-Benefit Analysis</div>
                <div className="feature">✓ Tool Recommendations</div>
                <div className="feature">✓ 12-Month ROI Projections</div>
                <div className="feature">✓ Free Website AI Audit</div>
              </div>
              <button className="pricing-button" onclick="startAssessment('sme')">
                Get Your Report Now
              </button>
            </div>
            
            <div className="pricing-card featured">
              <div className="featured-badge">Most Popular</div>
              <div className="pricing-header">
                <h3>Non-Profit Organisations</h3>
                <div className="price">
                  <span className="price-currency">£</span>
                  <span className="price-amount">4.99</span>
                </div>
                <div className="price-note">Special Social Mission Pricing + VAT</div>
              </div>
              <div className="pricing-features">
                <div className="feature">✓ Everything in SME package</div>
                <div className="feature">✓ Non-Profit Specific AI Tools</div>
                <div className="feature">✓ Fundraising Automation Ideas</div>
                <div className="feature">✓ Volunteer Management AI</div>
                <div className="feature">✓ Grant Application Assistance</div>
                <div className="feature">✓ Community Engagement Tools</div>
              </div>
              <button className="pricing-button" onclick="startAssessment('nonprofit')">
                Get Your Report Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="calculator-section">
        <div className="section-content">
          <h2 className="section-title">Calculate Your <span className="neon-text">AI Savings</span></h2>
          <div className="calculator-container">
            <div className="calculator-inputs">
              <div className="input-group">
                <label>Business Type</label>
                <select id="businessType" onchange="updateCalculator()">
                  <option value="sme">SME / Solopreneur</option>
                  <option value="nonprofit">Non-Profit Organisation</option>
                </select>
              </div>
              <div className="input-group">
                <label>Number of Employees</label>
                <input type="range" id="employeeSlider" min="1" max="50" value="5" onchange="updateCalculator()" />
                <span id="employeeCount">5</span>
              </div>
            </div>
            <div className="calculator-results">
              <div className="result-item">
                <div className="result-period">1 Month</div>
                <div className="result-amount" id="oneMonthSaving">£1,200</div>
              </div>
              <div className="result-item">
                <div className="result-period">3 Months</div>
                <div className="result-amount" id="threeMonthSaving">£3,960</div>
              </div>
              <div className="result-item">
                <div className="result-period">1 Year</div>
                <div className="result-amount" id="oneYearSaving">£17,280</div>
              </div>
            </div>
            <div className="payback-info">
              <span>Payback time: <span id="paybackTime">0.3 days</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Form */}
      <section id="assessment" className="assessment-section">
        <div className="section-content">
          <h2 className="section-title">Get Your <span className="neon-text">AI Assessment</span></h2>
          <form className="assessment-form" id="assessmentForm">
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" name="name" required />
              </div>
              <div className="form-group">
                <label>Company Name</label>
                <input type="text" name="company" />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" name="email" required />
              </div>
              <div className="form-group">
                <label>Website URL</label>
                <input type="url" name="website" placeholder="https://your-website.com" />
              </div>
              <div className="form-group full-width">
                <label>Business Type</label>
                <select name="businessType">
                  <option value="sme">SME / Small Business</option>
                  <option value="solopreneur">Solopreneur</option>
                  <option value="nonprofit">Non-Profit Organisation</option>
                </select>
              </div>
              <div className="form-group full-width">
                <label>Specific AI Needs (Optional)</label>
                <textarea name="aiNeeds" rows="4" placeholder="Tell us about any specific AI challenges or opportunities you've identified in your business..."></textarea>
              </div>
              <div className="form-group full-width">
                <label className="checkbox-label">
                  <input type="checkbox" name="websiteAudit" checked />
                  Yes, I'd like a free AI-powered website audit as a bonus!
                </label>
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-demo" onclick="showDemo()">
                View Demo Report First
              </button>
              <button type="submit" className="btn-submit">
                Get My AI Report - £9.99
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>AiConsultancy.org.uk</h3>
            <p>Promoting affordable AI solutions for social good</p>
          </div>
          <div className="footer-links">
            <h4>Our Brands</h4>
            <a href="https://mediamanager.com" target="_blank">MediaManager.com</a>
            <a href="https://aitasknavigator.com" target="_blank">AiTaskNavigator.com</a>
            <a href="https://aicloneexpert.com" target="_blank">AiCloneExpert.com</a>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Making AI accessible to SMEs, solopreneurs, and non-profits worldwide</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 AiConsultancy.org.uk. All rights reserved. VAT may apply to all purchases.</p>
        </div>
      </footer>

      {/* Demo Modal */}
      <div id="demoModal" className="modal">
        <div className="modal-content">
          <span className="close" onclick="closeDemo()">&times;</span>
          <h2>Demo: AI Assessment Report</h2>
          <div className="demo-report">
            <div className="report-section">
              <h3>Executive Summary</h3>
              <p>Based on your business profile, implementing AI solutions could save you <strong>£1,200-£2,500 per month</strong> and free up <strong>15-25 hours per week</strong>.</p>
            </div>
            <div className="report-section">
              <h3>Recommended AI Tools</h3>
              <div className="tool-recommendation">
                <h4>1. Customer Service Automation</h4>
                <p><strong>Tool:</strong> Zendesk Answer Bot</p>
                <p><strong>Monthly Cost:</strong> £29</p>
                <p><strong>Monthly Savings:</strong> £1,200</p>
                <p><strong>ROI:</strong> 4,041%</p>
              </div>
              <div className="tool-recommendation">
                <h4>2. Email Marketing AI</h4>
                <p><strong>Tool:</strong> Mailchimp AI</p>
                <p><strong>Monthly Cost:</strong> £15</p>
                <p><strong>Monthly Savings:</strong> £800</p>
                <p><strong>ROI:</strong> 5,233%</p>
              </div>
            </div>
            <div className="report-section">
              <h3>Implementation Timeline</h3>
              <p><strong>Month 1:</strong> Set up customer service automation</p>
              <p><strong>Month 2:</strong> Implement email marketing AI</p>
              <p><strong>Month 3:</strong> Add financial analysis tools</p>
            </div>
          </div>
          <button className="btn-get-full-report" onclick="scrollToAssessment()">
            Get Your Full Personalised Report
          </button>
        </div>
      </div>
    </div>
  )
})

export default app
