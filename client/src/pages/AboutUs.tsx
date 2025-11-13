import { Card } from "@/components/ui/card";
import TeamCard from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
// import alokImage from "@assets/generated_images/Male_CEO_headshot_portrait_4b32dc9b.png";
// import masoomaImage from "@assets/generated_images/Female_executive_headshot_portrait_943cb09e.png";
// import manojImage from "@assets/generated_images/Male_tech_leader_headshot_b936f89e.png";
// import cyrillImage from "@assets/generated_images/Compliance_manager_headshot_portrait_8f4a2423.png";
// import advisorImage from "@assets/generated_images/Senior_advisor_headshot_portrait_7ceb3581.png";
import alokImage from "../../../attached_assets/generated_images/Alok Kumar.png"
import masoomaImage from "../../../attached_assets/generated_images/Masooma Elahi.png"
import manojImage from "../../../attached_assets/generated_images/Manoj.png"
import cyrillImage from "../../../attached_assets/generated_images/Cyril Samson.png"
import bhaskarImage from "../../../attached_assets/generated_images/Bhaskar Dasgupta (2).png"
import swapnilImage from "../../../attached_assets/generated_images/Swapnil Pawar.jpg"
import shivImage from "../../../attached_assets/generated_images/Shiv Chichani.jpg"

export default function AboutUs() {
  const teamMembers = [
    {
      name: "Alok Kumar",
      role: "Co-Founder & CEO",
      bio: "18 years in wealth management across India and UAE. Built RuDo to democratize advisory for NRIs stuck in the gap.",
      imageSrc: alokImage
    },
    {
      name: "Masooma Elahi",
      role: "Co-Founder & Chief People Officer",
      bio: "8+ years in HR and client engagement. Leads people and experience at RuDo, making wealth management more human.",
      imageSrc: masoomaImage
    },
    // {
    //   name: "Manoj Kaushik",
    //   role: "Head of Engineering",
    //   bio: "15+ years building fintech platforms. Leading cross-border wealth management technology for seamless client experience.",
    //   imageSrc: manojImage
    // },
    {
      name: "Cyrill Samson",
      role: "Compliance Manager",
      bio: "18+ years in financial compliance. Ensures institutional-grade oversight across UAE and India.",
      imageSrc: cyrillImage
    }
  ];

  const advisors = [
    {
      name: "Dr. Bhaskar Dasgupta",
      role: "Regulatory & Compliance",
      bio: "Former regulator. Expert in UAE-India regulatory frameworks and fiduciary standards.",
      imageSrc: bhaskarImage
    },
    {
      name: "Swapnil Pawar",
      role: "Investment Strategy",
      bio: "Decades in portfolio construction, factor investing, and multi-asset optimization.",
      imageSrc: swapnilImage
    },
    {
      name: "Shiv Chichani",
      role: "Investment Strategy",
      bio: "Expert in portfolio construction, factor investing, and multi-asset strategies.",
      imageSrc: shivImage
    }
  ];

  return (
    <div>
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Bridging the{" "}
              <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
                Advisory Gap
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Emerging and Affluent NRIs are too big for retail, too small for private banking. Managing wealth across borders with high-commission products or confusing DIY platforms.
            </p>
            <p className="text-xl font-semibold mt-4">You deserve better.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto mb-20">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                Democratize financial advisory for Emerging and Affluent NRIs. Help you build long-term wealth with clarity, confidence, and control.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">The RuDo Philosophy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We don't sell products we engineer portfolios. Most fund managers underperform their benchmarks. We focus on what works: multi-asset diversification and factor investing.
              </p>
            </Card>
          </div>

          <Card className="p-8 max-w-5xl mx-auto mb-20">
            <h2 className="text-2xl font-bold mb-4">Our Approach</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every asset evaluated through six lenses: Liquidity • Cost • Transparency • Risk • Flexibility • Diversification.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Wealth isn't built predicting markets it's built designing systems that work across them.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Makes Us Different</h2>
            <p className="text-lg text-muted-foreground">
              One platform, two markets. Transparent fees, zero commissions. Data-driven algorithms guided by human advisors. Dual-regulated across UAE and India. Built for NRIs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Team</h2>
              <p className="text-lg text-muted-foreground">
                Built by People Who've Been There
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {teamMembers.map((member, index) => (
                <TeamCard
                  key={index}
                  {...member}
                  testId={`team-${index}`}
                />
              ))}
            </div>

            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Advisory Board</h2>
              <p className="text-lg text-muted-foreground">
                Guided by Expertise. Governed by Standards.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {advisors.map((advisor, index) => (
                <TeamCard
                  key={index}
                  {...advisor}
                  testId={`advisor-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32 bg-card">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Dual-regulated. Fully Protected.
            </h2>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                {/* <div className="text-4xl mb-4">🇦🇪</div> */}
                <h3 className="font-semibold mb-2">FSRA, ADGM</h3>
                <p className="text-sm text-muted-foreground">
                  Licensed as Category 3C Investment Manager
                </p>
              </Card>
              <Card className="p-6">
                {/* <div className="text-4xl mb-4">🇮🇳</div> */}
                <h3 className="font-semibold mb-2">SEBI</h3>
                <p className="text-sm text-muted-foreground">
                  Registered Investment Adviser (RIA)
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-2xl font-bold mb-4">Our Promise</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Digital Advisory live today. Hybrid Advisory coming soon. Always: clarity over confusion, transparency over commissions.
              </p>
              <p className="font-semibold">
                One mission: Close the advisory gap for every global Indian.
              </p>
            </Card>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" data-testid="button-about-start">
                Start Building Wealth →
              </Button>
              <Button size="lg" variant="outline" data-testid="button-about-learn">
                Learn Our Approach →
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
