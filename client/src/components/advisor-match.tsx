import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Linkedin, Building2, MapPin, Award, TrendingUp } from "lucide-react";
import type { Advisor } from "@shared/schema";

interface AdvisorMatchProps {
  profileType: string;
  networthLevel: string;
}

export function AdvisorMatch({ profileType, networthLevel }: AdvisorMatchProps) {
  const { data: advisors, isLoading } = useQuery<Advisor[]>({
    queryKey: ["/api/advisors/matched", profileType, networthLevel],
    queryFn: async () => {
      const response = await fetch(`/api/advisors/matched?profileType=${profileType}&networthLevel=${networthLevel}`);
      if (!response.ok) throw new Error("Failed to fetch advisors");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </Card>
    );
  }

  if (!advisors || advisors.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-sm text-muted-foreground text-center py-4">
          No advisors currently available for your profile. Please check back soon.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {advisors.map((advisor) => (
        <Card key={advisor.id} className="p-6 hover-elevate" data-testid={`card-advisor-${advisor.id}`}>
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-foreground" data-testid={`text-advisor-name-${advisor.id}`}>
                  {advisor.name}
                </h3>
                <p className="text-sm text-muted-foreground">{advisor.title}</p>
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Building2 className="w-3 h-3" />
                  <span>{advisor.company}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{advisor.location}</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-foreground leading-relaxed">{advisor.bio}</p>

            {/* Credentials & Experience */}
            <div className="flex flex-wrap gap-2">
              {(advisor.credentials as string[]).map((credential, idx) => (
                <Badge key={idx} variant="secondary" data-testid={`badge-credential-${idx}`}>
                  {credential}
                </Badge>
              ))}
              <Badge variant="outline">
                <TrendingUp className="w-3 h-3 mr-1" />
                {advisor.yearsExperience} years exp.
              </Badge>
            </div>

            {/* Specializations */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2">Specializations:</p>
              <div className="flex flex-wrap gap-2">
                {(advisor.specializations as string[]).map((spec, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {spec}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Min Investment */}
            {advisor.minInvestment && (
              <p className="text-xs text-muted-foreground">
                Minimum portfolio size: ${advisor.minInvestment.toLocaleString()} USD
              </p>
            )}

            {/* Contact Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              <Button variant="default" size="sm" className="gap-2" data-testid={`button-email-${advisor.id}`}>
                <Mail className="w-4 h-4" />
                <a href={`mailto:${advisor.contactEmail}`} className="no-underline">
                  Email
                </a>
              </Button>
              {advisor.contactPhone && (
                <Button variant="outline" size="sm" className="gap-2" data-testid={`button-phone-${advisor.id}`}>
                  <Phone className="w-4 h-4" />
                  <a href={`tel:${advisor.contactPhone}`} className="no-underline">
                    Call
                  </a>
                </Button>
              )}
              {advisor.linkedIn && (
                <Button variant="outline" size="sm" className="gap-2" data-testid={`button-linkedin-${advisor.id}`}>
                  <Linkedin className="w-4 h-4" />
                  <a href={`https://${advisor.linkedIn}`} target="_blank" rel="noopener noreferrer" className="no-underline">
                    LinkedIn
                  </a>
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
