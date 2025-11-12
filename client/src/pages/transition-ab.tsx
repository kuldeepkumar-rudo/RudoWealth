import SectionTransition from "./section-transition";

export default function TransitionAB() {
  return (
    <SectionTransition
      completedSection="A"
      progress={50}
      completedTitle="Financial Foundation"
      nextSectionTitle="your investment approach"
      nextSectionDescription="Your investment personality and goals shape your ideal portfolio strategy"
      nextRoute="/assessment/8"
    />
  );
}
