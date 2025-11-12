import TrustBadge from '../TrustBadge';
import { Shield } from 'lucide-react';

export default function TrustBadgeExample() {
  return (
    <div className="p-8 bg-background">
      <TrustBadge
        icon={Shield}
        text="FSRA-regulated"
        testId="trust-badge-fsra"
      />
    </div>
  );
}
