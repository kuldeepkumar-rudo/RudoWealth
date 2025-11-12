import Header from '../Header';
import { ThemeProvider } from '../ThemeProvider';

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
      </div>
    </ThemeProvider>
  );
}
