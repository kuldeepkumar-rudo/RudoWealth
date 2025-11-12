import AboutUs from '../AboutUs';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function AboutUsExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <AboutUs />
      </div>
    </ThemeProvider>
  );
}
