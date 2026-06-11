export interface StateFaq {
  question: string;
  answer: string;
}

export interface StateData {
  slug: string;
  code: string;
  name: string;
  propertyTaxRate: number;
  medianHomePrice: number;
  stateIncomeTaxNote: string;
  topCities: string[];
  defaultPrincipal: number;
  defaultRate: number;
  defaultTerm: number;
  faqs: StateFaq[];
}

const STATES: StateData[] = [
  {
    slug: "california",
    code: "CA",
    name: "California",
    propertyTaxRate: 0.011,
    medianHomePrice: 750_000,
    stateIncomeTaxNote:
      "High (graduated 1%–13.3%, capped by Prop 13 on property tax)",
    topCities: [
      "Los Angeles",
      "San Francisco",
      "San Diego",
      "San Jose",
      "Sacramento",
    ],
    defaultPrincipal: 600_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is Prop 13 and how does it affect my property tax?",
        answer:
          "Proposition 13 (1978) caps California property tax at 1% of the assessed value, and limits annual increases to no more than 2% per year, regardless of market value. The assessed value resets to market rate only when the property changes ownership (with limited exceptions).",
      },
      {
        question: "How much house can I afford in California on a $150K salary?",
        answer:
          "Lenders typically allow 28% of gross monthly income for housing. On $150K/year (~$12,500/month gross), that's about $3,500/month for PITI. With California's high median home prices, that generally supports a loan of $500K–$650K depending on taxes, insurance, and other debts.",
      },
      {
        question:
          "Are there first-time homebuyer programs in California?",
        answer:
          "Yes. CalHFA offers FHA, VA, USDA, and conventional first-time buyer loans with down payment assistance. CalPlus and MyHome Assistance can provide 3.5%–3% of the purchase price for down payment and closing costs.",
      },
    ],
  },
  {
    slug: "texas",
    code: "TX",
    name: "Texas",
    propertyTaxRate: 0.018,
    medianHomePrice: 350_000,
    stateIncomeTaxNote: "No state income tax",
    topCities: [
      "Houston",
      "Dallas",
      "Austin",
      "San Antonio",
      "Fort Worth",
    ],
    defaultPrincipal: 280_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "Why doesn't Texas have a state income tax?",
        answer:
          "Texas is one of nine US states with no state personal income tax. The state funds services primarily through sales tax (6.25% state + local up to 2%) and property tax. Texas property tax rates are among the highest in the US to compensate.",
      },
      {
        question: "What is the average property tax rate in Texas?",
        answer:
          "The effective property tax rate in Texas averages around 1.8% of home value per year, but varies widely by county. Harris County (Houston) averages ~2.0%, Travis County (Austin) ~1.8%, and some rural counties fall below 1.0%.",
      },
      {
        question: "What is the Texas homestead exemption?",
        answer:
          "Texas offers a $100,000 homestead exemption for school district taxes on a primary residence. Homeowners 65+ or disabled get an additional $10,000 exemption. The exemption reduces the taxable value of your home, lowering your annual property tax bill.",
      },
    ],
  },
  {
    slug: "new-york",
    code: "NY",
    name: "New York",
    propertyTaxRate: 0.014,
    medianHomePrice: 500_000,
    stateIncomeTaxNote:
      "High (graduated 4%–10.9%, NYC adds 3.078%–3.876% city tax)",
    topCities: [
      "New York City",
      "Buffalo",
      "Rochester",
      "Albany",
      "Syracuse",
    ],
    defaultPrincipal: 400_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is the NYC mortgage recording tax?",
        answer:
          "New York City charges a mortgage recording tax of 1.8% (or 1.05% for loans under $500K) on the mortgage amount. New York State adds 0.5%. For a $500K mortgage in NYC, expect roughly $11,500 in mortgage tax at closing. First-time homebuyers buying a primary residence under $500K may be exempt from the NYC portion.",
      },
      {
        question: "How much are closing costs in New York?",
        answer:
          "Total closing costs in New York typically run 2%–5% of the home price, plus the mortgage recording tax. For a $500K home, expect $10K–$25K in closing costs plus ~$11.5K in mortgage tax. Attorney fees are common (and often required) in NY, adding $1,500–$3,000.",
      },
      {
        question: "What is the property tax rate in New York?",
        answer:
          "New York State effective property tax averages about 1.4% annually, but varies significantly by county. Nassau and Rockland counties often exceed 2.0%, while upstate rural counties may be 1.0% or less. NYC effective rate is roughly 0.9%.",
      },
    ],
  },
  {
    slug: "florida",
    code: "FL",
    name: "Florida",
    propertyTaxRate: 0.01,
    medianHomePrice: 400_000,
    stateIncomeTaxNote: "No state income tax",
    topCities: [
      "Miami",
      "Orlando",
      "Tampa",
      "Jacksonville",
      "Fort Lauderdale",
    ],
    defaultPrincipal: 320_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "Why doesn't Florida have a state income tax?",
        answer:
          "Florida is one of nine US states with no state personal income tax. State revenue comes primarily from sales tax (6% state + local up to 2.5%) and tourism-related taxes. Florida's housing market is also buoyed by retiree in-migration seeking tax efficiency.",
      },
      {
        question: "What is the Florida homestead exemption?",
        answer:
          "Florida's homestead exemption reduces the taxable value of a primary residence by $50,000 (the first $25,000 applies to all property taxes; the second $25,000 applies to non-school taxes). It also caps annual assessed value increases at 3% (Save Our Homes cap).",
      },
      {
        question: "How much is homeowners insurance in Florida?",
        answer:
          "Florida has the highest average homeowners insurance premiums in the US, averaging $4,000–$6,000/year statewide, and often exceeding $10,000 in coastal counties (Miami-Dade, Broward, Palm Beach) due to hurricane and flood risk.",
      },
    ],
  },
  {
    slug: "illinois",
    code: "IL",
    name: "Illinois",
    propertyTaxRate: 0.021,
    medianHomePrice: 280_000,
    stateIncomeTaxNote: "Flat 4.95% state income tax",
    topCities: [
      "Chicago",
      "Aurora",
      "Naperville",
      "Joliet",
      "Springfield",
    ],
    defaultPrincipal: 224_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "Why is Illinois property tax so high?",
        answer:
          "Illinois has the second-highest effective property tax rate in the US (after New Jersey) at about 2.1% of home value. This is largely because Illinois funds K-12 schools and many municipal services primarily through property tax rather than income or sales tax.",
      },
      {
        question: "What is the Illinois homestead exemption?",
        answer:
          "The Illinois homestead exemption reduces the Equalized Assessed Value (EAV) of a primary residence by up to $10,000. Seniors 65+ qualify for the Senior Citizens Homestead Exemption, which provides an additional $8,000 reduction in EAV, plus a Senior Freeze Exemption that locks the taxable value.",
      },
      {
        question: "How is the 4.95% flat state income tax applied?",
        answer:
          "Illinois has a flat-rate individual income tax of 4.95% applied to federal adjusted gross income with minor modifications. This is significantly simpler than graduated-rate states like California or New York, but combined with high property tax makes the overall tax burden mid-to-high.",
      },
    ],
  },
  {
    slug: "pennsylvania",
    code: "PA",
    name: "Pennsylvania",
    propertyTaxRate: 0.015,
    medianHomePrice: 250_000,
    stateIncomeTaxNote: "Flat 3.07% state income tax",
    topCities: [
      "Philadelphia",
      "Pittsburgh",
      "Allentown",
      "Erie",
      "Reading",
    ],
    defaultPrincipal: 200_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is Act 32 / Local Earned Income Tax (EIT) in Pennsylvania?",
        answer:
          "Act 32 of 2008 consolidated Pennsylvania's local Earned Income Tax collection across 3,500+ municipalities into county-level Tax Collection Districts (TCDs). Residents pay a flat 3.07% to the state plus a variable municipal EIT (typically 0.5%–3.0%) plus, in some school districts, an additional 0.25%–1.5% Local Services Tax.",
      },
      {
        question: "What is the Philadelphia Homestead Exemption?",
        answer:
          "Philadelphia offers a $45,000 homestead exemption automatically applied to the assessed value of an owner-occupied primary residence. Longtime homeowners may also qualify for the Owner-Occupied Payment Agreement (OOPA) for past-due balances, and seniors 65+ can defer property tax through the Senior Citizen Real Estate Tax Deferral program.",
      },
      {
        question: "How much are closing costs in Pennsylvania?",
        answer:
          "Pennsylvania closing costs typically run 2%–5% of the home price. PA does not charge a state-level transfer tax on buyers (the seller pays the 1%–2% Realty Transfer Tax in most counties), but title insurance and recording fees still apply. Mortgage recording in Allegheny and Philadelphia counties adds a small local mortgage tax.",
      },
    ],
  },
  {
    slug: "ohio",
    code: "OH",
    name: "Ohio",
    propertyTaxRate: 0.017,
    medianHomePrice: 200_000,
    stateIncomeTaxNote:
      "Graduated 0%–3.5% (no tax on income under $26,050 single / $39,350 joint)",
    topCities: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
    defaultPrincipal: 160_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is the Ohio homestead exemption?",
        answer:
          "Ohio's homestead exemption reduces the taxable value of a primary residence by $28,000 for owner-occupiers. Seniors 65+, disabled veterans, and the long-term disabled qualify for an enhanced reduction of up to $50,000. The exemption is applied automatically once the owner files Form DTE 105A with the county auditor.",
      },
      {
        question: "What is the Current Agricultural Use Value (CAUV) program?",
        answer:
          "CAUV values farmland at its agricultural productivity rather than market value, dramatically reducing property tax for working farms of 10+ acres. While CAUV targets farmers, suburban homeowners in Ohio should know that reappraisals occur every 3 years and can cause substantial tax bill jumps when comparable sales rise.",
      },
      {
        question: "How are Ohio property taxes calculated?",
        answer:
          "Ohio property tax = (Assessed Value × 35%) × Effective Millage Rate. The non-school portion is capped at 1% of market value (Senate Bill 920's 10-mill floor reduction). School and voted levies can push total effective rates to 1.5%–2.5%, especially in suburban Cuyahoga, Franklin, and Hamilton counties.",
      },
    ],
  },
  {
    slug: "georgia",
    code: "GA",
    name: "Georgia",
    propertyTaxRate: 0.009,
    medianHomePrice: 320_000,
    stateIncomeTaxNote: "Graduated 1%–5.75% (flat 5.39% effective 2024)",
    topCities: ["Atlanta", "Savannah", "Augusta", "Athens", "Macon"],
    defaultPrincipal: 256_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "How does Georgia property tax assessment work?",
        answer:
          "Georgia counties conduct a digest reassessment every 1, 3, or 5 years (depending on county population growth). The assessed value is 40% of fair market value for residential property. After reassessment, a floating homestead exemption caps annual taxable value increases at the rate of inflation for the primary residence.",
      },
      {
        question: "What is the Georgia homestead exemption?",
        answer:
          "Georgia offers a standard $2,000 homestead exemption on the state portion of property tax for any owner-occupied primary residence. Counties can stack additional exemptions: Fulton adds $30,000+, DeKalb $15,000+, Gwinnett $5,000+. Seniors 62+, disabled, and veterans qualify for further reductions including a full school-tax exemption in many counties.",
      },
      {
        question: "How much are closing costs in Georgia?",
        answer:
          "Georgia closing costs typically run 2%–4% of the home price. Atlanta buyers should budget for: lender fees (~1%), title insurance, recording fees, attorney fees (~$500–$1,500, common in GA), and the intangibles tax (0.1% of mortgage amount, capped at $5,000) on the loan principal.",
      },
    ],
  },
  {
    slug: "north-carolina",
    code: "NC",
    name: "North Carolina",
    propertyTaxRate: 0.008,
    medianHomePrice: 320_000,
    stateIncomeTaxNote: "Flat 4.5% (dropping to 3.99% by 2026)",
    topCities: [
      "Charlotte",
      "Raleigh",
      "Greensboro",
      "Durham",
      "Winston-Salem",
    ],
    defaultPrincipal: 256_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is the North Carolina excise (transfer) tax?",
        answer:
          "NC charges an excise tax of $1 per $500 of property value ($2 per $1,000) on each real estate transfer, split between buyer and seller by county custom. For a $300K home in Mecklenburg County, expect ~$600 in excise tax. Most counties pay the seller half, but buyers should verify the local split.",
      },
      {
        question: "How do NC property tax rates vary by county?",
        answer:
          "NC effective property tax rates range from ~0.55% (rural Cherokee, Graham) to ~1.20% (Durham, Orange, Wake–Research Triangle). Mecklenburg (Charlotte) sits around 0.85%, Buncombe (Asheville) around 0.65%. Countywide rates combine with city and fire-district levies, so two adjacent ZIPs can differ by 20%+.",
      },
      {
        question: "What first-time homebuyer programs does NC offer?",
        answer:
          "The NC Home Advantage Mortgage provides down payment assistance up to 3% of the purchase price (up to $15,000) as a 0% deferred second mortgage, forgiven after 20 years. MCC (Mortgage Credit Certificate) gives buyers a federal tax credit of up to $2,000/year on mortgage interest. Both require household income below county limits.",
      },
    ],
  },
  {
    slug: "michigan",
    code: "MI",
    name: "Michigan",
    propertyTaxRate: 0.014,
    medianHomePrice: 220_000,
    stateIncomeTaxNote: "Flat 4.25% (proposed to drop to 4.05% by 2027)",
    topCities: ["Detroit", "Grand Rapids", "Warren", "Ann Arbor", "Lansing"],
    defaultPrincipal: 176_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is the Michigan Principal Residence Exemption (PRE)?",
        answer:
          "The PRE exempts a primary residence from the 18-mill state education tax (saving ~$1,800/year on a $300K home) and reduces the local school operating millage by up to 18 mills. Owners must file an affidavit (Form 2368) with the township assessor by May 1st of the tax year or June 1st for new purchases.",
      },
      {
        question: "Why are Detroit property taxes so high?",
        answer:
          "Detroit's effective tax rate runs 3%–4% of home value—highest in the US—because the city's tax base collapsed after the 2008 recession and bankruptcy. Wayne County recently launched the Homeowner Property Exemption (HPE) program that exempts the first $50,000 of taxable value for owner-occupiers for 5 years.",
      },
      {
        question: "What is Michigan's property tax cap?",
        answer:
          "Michigan's Proposal A (1994) caps annual taxable value increases at the lesser of 5% or inflation, regardless of market value. The cap applies as long as ownership doesn't transfer. When a property sells, taxable value resets to market value, often producing a sharp tax bill jump for the buyer in the second year of ownership.",
      },
    ],
  },
  {
    slug: "new-jersey",
    code: "NJ",
    name: "New Jersey",
    propertyTaxRate: 0.022,
    medianHomePrice: 450_000,
    stateIncomeTaxNote: "Graduated 1.4%–10.75%",
    topCities: [
      "Newark",
      "Jersey City",
      "Paterson",
      "Elizabeth",
      "Trenton",
    ],
    defaultPrincipal: 360_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "Why does New Jersey have the highest property taxes in the US?",
        answer:
          "NJ's effective property tax averages 2.2%–2.4% of home value, highest of any state. This reflects: (1) reliance on local property tax to fund schools and municipalities (NJ has no local income tax), (2) high home values concentrating tax revenue needs, and (3) over 500+ separate municipalities each running their own budgets.",
      },
      {
        question: "What is the NJ Homestead Benefit / Senior Freeze?",
        answer:
          "The Homestead Benefit credits income-eligible homeowners (under $150K gross) up to $1,500/year against property tax. The Senior Freeze program reimburses any property tax increase above a base year for residents 65+ or disabled who have lived in NJ for 10+ years—both require annual filing (NJ-1040-H or similar).",
      },
      {
        question: "What is the NJ mansion tax?",
        answer:
          "New Jersey charges a 1% mansion tax on residential properties purchased for $1 million or more, paid by the buyer at closing. For a $1.5M home, expect $15,000 added to closing costs. The tax is on the entire purchase price, not just the amount above $1M.",
      },
    ],
  },
  {
    slug: "virginia",
    code: "VA",
    name: "Virginia",
    propertyTaxRate: 0.008,
    medianHomePrice: 380_000,
    stateIncomeTaxNote: "Graduated 2%–5.75%",
    topCities: [
      "Virginia Beach",
      "Norfolk",
      "Richmond",
      "Arlington",
      "Alexandria",
    ],
    defaultPrincipal: 304_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "What is the Virginia grantor (recordation) tax on buyers?",
        answer:
          "Virginia charges a recordation tax of 0.1%–0.25% of the mortgage amount (depending on the county) plus a grantor tax of the same range on the deed. For a $400K mortgage in Fairfax County, expect roughly $400–$1,000 each in recordation and grantor taxes at closing. In Northern Virginia, these can total 0.5%+ of purchase price.",
      },
      {
        question: "What property tax relief do disabled veterans get in VA?",
        answer:
          "Virginia's disabled veterans exemption provides: 100% service-connected disabled veterans a full exemption from real estate taxes on their primary residence (all ages); surviving spouses of any veteran killed in action are also fully exempt. Other disabled vets qualify for partial exemptions based on disability rating.",
      },
      {
        question: "Why are Northern Virginia property taxes higher than other parts of the state?",
        answer:
          "Fairfax, Arlington, and Loudoun counties carry effective rates of 1.0%–1.2% while rural counties like Bath or Highland run ~0.4%. NoVA's higher rates fund the schools and infrastructure serving DC-area commuters; the tradeoff is offset by stronger home appreciation and proximity to federal employment.",
      },
    ],
  },
  {
    slug: "washington",
    code: "WA",
    name: "Washington",
    propertyTaxRate: 0.009,
    medianHomePrice: 580_000,
    stateIncomeTaxNote: "No state income tax (7% capital gains tax on $262K+ gains)",
    topCities: ["Seattle", "Spokane", "Tacoma", "Bellevue", "Vancouver"],
    defaultPrincipal: 464_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "Why doesn't Washington have a state income tax?",
        answer:
          "Washington is one of nine states with no personal income tax, funding services through sales tax (6.5% state + local up to 4.1%, so 10.25% in Seattle) and property tax. Since 2022, the state also applies a 7% capital gains tax on long-term gains above $262K—technically an excise tax, not an income tax, but functionally similar.",
      },
      {
        question: "How are Seattle property taxes different from rural WA?",
        answer:
          "King County (Seattle) effective rates run ~0.9%–1.0% while rural Ferry County sits at ~0.6%. However, Washington's voter-approved levy limits (1% aggregate, plus $5.90/$1,000 for school bonds) cap annual tax bill growth regardless of home value increases, providing natural protection from reassessment spikes.",
      },
      {
        question: "What is Washington's real estate excise tax (REET)?",
        answer:
          "Washington charges a graduated REET on the seller at sale: 1.1% on the first $525,000, 1.28% on the next $1M, 2.75% on the next $1M, and 3.5% above $2.525M (rates as of 2024). Local REETs (e.g., Seattle's 0.5% affordable housing levy) stack on top. Buyers typically don't pay REET directly but should budget for closing implications.",
      },
    ],
  },
  {
    slug: "arizona",
    code: "AZ",
    name: "Arizona",
    propertyTaxRate: 0.006,
    medianHomePrice: 400_000,
    stateIncomeTaxNote: "Flat 2.5%",
    topCities: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
    defaultPrincipal: 320_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "How does Arizona property tax valuation work?",
        answer:
          "Arizona uses a two-value system: Limited Property Value (LPV) can only increase by the lesser of 10% or inflation per year, and Full Cash Value (FCV) tracks market value. Tax bills are based on LPV plus any voter-approved overrides. For long-term owners, LPV often lags market value by 30%+.",
      },
      {
        question: "What is the AZ homeowners' exemption?",
        answer:
          "Arizona's homeowners' exemption reduces the Limited Property Value by $3,000 for any owner-occupied primary residence. The exemption is applied automatically when the property is on the homeowner's primary residence affidavit filed with the county assessor.",
      },
      {
        question: "What first-time homebuyer programs does Arizona offer?",
        answer:
          "The Arizona Industrial Development Authority (IDA) runs the Home in Five Advantage program, providing 3%–5% down payment assistance as a forgivable second mortgage (forgiven after 3 years) plus additional 1%–2% for income-eligible buyers. Plus Home Program offers $10K grants for down payment/closing costs in participating cities.",
      },
    ],
  },
  {
    slug: "massachusetts",
    code: "MA",
    name: "Massachusetts",
    propertyTaxRate: 0.01,
    medianHomePrice: 550_000,
    stateIncomeTaxNote: "Graduated 5%–9% (+4% surtax on income over $1M)",
    topCities: ["Boston", "Worcester", "Cambridge", "Springfield", "Lowell"],
    defaultPrincipal: 440_000,
    defaultRate: 6.5,
    defaultTerm: 30,
    faqs: [
      {
        question: "How do Massachusetts property tax rates vary by town?",
        answer:
          "MA towns set rates annually under Proposition 2½ (1980), which caps total levy growth at 2.5% per year plus overrides. Effective rates range from ~0.7% (Berkshires) to ~1.5% (Greater Boston). Towns revalue properties every 3–5 years; tax bills can spike sharply on revaluation years when home values have outpaced the 2.5% levy cap.",
      },
      {
        question: "What is the MA mortgage recording tax?",
        answer:
          "Massachusetts charges $50 for the first $500K of a mortgage and $100 per $500K increment above that (so $50 under $500K, $150 for $500K–$1M, etc.). The tax is split between state ($25/$50/$100) and a community preservation surcharge on Barnstable, Nantucket, and Dukes counties. Much lower than NY or NJ.",
      },
      {
        question: "Why is Greater Boston housing so expensive?",
        answer:
          "Greater Boston median home prices run $700K–$1.2M driven by biotech/tech/finance employment, a constrained land supply (coastline + zoning), and limited new construction. Buyers in MA commonly pay $50K+ over asking, waive contingencies, and rely on family assistance for down payments—calculator defaults here assume modest metro areas.",
      },
    ],
  },
];

export function getAllStates(): StateData[] {
  return STATES;
}

export function getStateBySlug(slug: string): StateData | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function getAllStateSlugs(): string[] {
  return STATES.map((s) => s.slug);
}
