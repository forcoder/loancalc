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
