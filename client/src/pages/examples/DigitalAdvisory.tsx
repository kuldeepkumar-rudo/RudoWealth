import DigitalAdvisory from '../DigitalAdvisory';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function DigitalAdvisoryExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <DigitalAdvisory />
      </div>
    </ThemeProvider>
  );
}
