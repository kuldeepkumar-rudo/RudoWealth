import { Link } from "wouter";

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-foreground mb-6">DISCLAIMER</h1>
        
        <div className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert dark:text-foreground text-foreground">
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            RuDo Digital Wealth Private Limited ("RuDo") is incorporated in the Abu Dhabi Global Market ("ADGM") and regulated by the Financial Services Regulatory Authority ("FSRA") under Financial Services Permission (FSP) No. 220155. RuDo holds a Category 3C licence with permission to carry on the regulated activity of Managing Assets for Retail Clients and Professional Clients.
          </p>
          
          <div className="text-base text-muted-foreground leading-relaxed mb-4">
            <div className="font-semibold text-foreground">Registered Office:</div>
            <div className="mb-2">
              Office 14, 11th Floor, Tamouh Tower,<br />
              Al Reem Island, Abu Dhabi, United Arab Emirates
            </div>
            <div>
              <span className="font-semibold">Public Register:</span>{' '}
              <a 
                href="https://www.adgm.com/public-registers/fsra/fsf/RuDo-digital-wealth-private-limited" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                View Listing
              </a>
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">General Information</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            The information made available on RuDo's website, mobile application, or other communication channels is for general information purposes only. It does not constitute investment advice, financial advice, a recommendation, or an offer to buy or sell any financial product or service. While RuDo endeavours to ensure that all information is accurate and current, no representation or warranty (express or implied) is made regarding its accuracy, completeness, reliability, or suitability.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Investment Risks</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            Investments are subject to risks, including the potential loss of principal. The value of investments may rise or fall, and past performance is not indicative of future results. Clients should assess their investment objectives, risk tolerance, and financial circumstances before investing and, where necessary, seek independent professional advice.
          </p>

          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            RuDo's digital platform and investment products are designed for clients who understand and accept the risks associated with investing. They may not be suitable for all investors, and access may be restricted in certain jurisdictions. RuDo does not guarantee any rate of return, performance, or capital preservation.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Third-Party Services</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            RuDo may rely on third-party service providers, brokers, custodians, and data sources in the provision of its services. RuDo does not assume responsibility for losses or damages arising from system interruptions, data inaccuracies, or errors caused by third-party platforms or data feeds.
          </p>

          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            All figures and projections are for illustrative purposes only and do not represent actual or guaranteed returns. Any forward-looking statements or estimates are subject to change without notice.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Conflicts of Interest</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-4">
            RuDo and its affiliates may receive fees or commissions in connection with certain investment products; such arrangements are disclosed in the relevant offering materials.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">Tools Disclaimer</h2>
          <p className="text-base text-muted-foreground leading-relaxed mb-6">
            Any tools, calculators, or simulations provided within the platform / website should not be construed as personalized financial advice.
          </p>

          <p className="text-sm text-muted-foreground leading-relaxed mt-8 pt-4 border-t border-border">
            By using RuDo's website, mobile application, or any related service, you acknowledge that you have read, understood, and agreed to this Disclaimer, as well as RuDo's Terms of Use and Privacy Policy available on its platform.
          </p>
        </div>

        <div className="mt-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-primary hover:underline"
            data-testid="back-to-home"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
