import TeamCard from '../TeamCard';

export default function TeamCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <TeamCard
          name="Alok Kumar"
          role="Co-Founder & CEO"
          bio="18 years in wealth management across India and UAE. Built RuDo to democratize advisory for NRIs."
          testId="team-card-alok"
        />
      </div>
    </div>
  );
}
