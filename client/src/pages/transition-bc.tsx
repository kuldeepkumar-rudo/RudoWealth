import SectionTransition from "./section-transition";

export default function TransitionBC() {
  return (
    <SectionTransition
      completedSection="B"
      progress={85}
      completedTitle="Investment Preferences"
      nextSectionTitle="your financial safety net"
      nextSectionDescription="Understanding your current obligations helps us recommend the right balance"
      nextRoute="/assessment/12"
    />
  );
}
