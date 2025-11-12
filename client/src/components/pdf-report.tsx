// import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
// import { Button } from '@/components/ui/button';
// import { Download } from 'lucide-react';
// import type { ProfileResult } from '@shared/schema';

// const styles = StyleSheet.create({

//   portfolioHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0A0E1A',
//     marginBottom: 15,
//     textAlign: 'center',
//   },
//   chartContainer: {
//     alignItems: 'center',
//     marginVertical: 20,
//   },
//   metricsContainer: {
//     backgroundColor: '#F8FAFC',
//     borderRadius: 8,
//     padding: 15,
//     marginTop: 15,
//   },
//   metricRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 8,
//   },
//   metricLabel: {
//     fontSize: 12,
//     color: '#64748B',
//   },
//   metricValue: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#0F172A',
//   },

// // ... rest of the styles ...

//   page: {
//     padding: 40,
//     backgroundColor: '#FFFFFF',
//     fontFamily: 'Helvetica',
//   },
//   header: {
//     marginBottom: 30,
//     borderBottom: '2 solid #1A5F7A',
//     paddingBottom: 15,
//   },
//   companyName: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1A5F7A',
//     marginBottom: 5,
//   },
//   reportTitle: {
//     fontSize: 14,
//     color: '#666666',
//   },
//   profileSection: {
//     marginTop: 25,
//     marginBottom: 25,
//   },
//   profileTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#0A0E1A',
//     marginBottom: 8,
//   },
//   profileTagline: {
//     fontSize: 12,
//     color: '#C9A574',
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#1A5F7A',
//     marginTop: 20,
//     marginBottom: 10,
//     textTransform: 'uppercase',
//   },
//   text: {
//     fontSize: 11,
//     color: '#333333',
//     lineHeight: 1.6,
//     marginBottom: 8,
//   },
//   scoreRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 6,
//     paddingVertical: 4,
//     borderBottom: '1 solid #E5E7EB',
//   },
//   scoreLabel: {
//     fontSize: 11,
//     color: '#666666',
//   },
//   scoreValue: {
//     fontSize: 11,
//     fontWeight: 'bold',
//     color: '#1A5F7A',
//   },
//   bulletPoint: {
//     fontSize: 11,
//     color: '#333333',
//     marginBottom: 6,
//     paddingLeft: 15,
//   },
//   allocationBox: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#F3F4F6',
//     padding: 15,
//     marginVertical: 15,
//     borderRadius: 4,
//   },
//   allocationItem: {
//     alignItems: 'center',
//   },
//   allocationLabel: {
//     fontSize: 10,
//     color: '#666666',
//     marginBottom: 4,
//   },
//   allocationValue: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#1A5F7A',
//   },
//   footer: {
//     position: 'absolute',
//     bottom: 30,
//     left: 40,
//     right: 40,
//     textAlign: 'center',
//     fontSize: 9,
//     color: '#999999',
//     borderTop: '1 solid #E5E7EB',
//     paddingTop: 10,
//   },
// });

// interface PDFReportProps {
//   profileResult: ProfileResult;
//   scores: {
//     capacityScore: number;
//     toleranceScore: number;
//     timeScore: number;
//     experienceScore: number;
//     totalScore: number;
//   };
//   userName?: string;
// }

// function InvestmentReportDocument({ profileResult, scores, userName }: PDFReportProps) {
//   const date = new Date().toLocaleDateString('en-US', { 
//     year: 'numeric', 
//     month: 'long', 
//     day: 'numeric' 
//   });

//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         {/* Header */}
//         <View style={styles.header}>
//           <Text style={styles.companyName}>RuDo Wealth</Text>
//           <Text style={styles.reportTitle}>Investment Risk Profile Assessment Report</Text>
//           <Text style={[styles.reportTitle, { marginTop: 5 }]}>Generated on {date}</Text>
//           {userName && <Text style={[styles.reportTitle, { marginTop: 3 }]}>Prepared for: {userName}</Text>}
//         </View>

//         {/* Profile Summary */}
//         <View style={styles.profileSection}>
//           <Text style={styles.profileTitle}>{profileResult.title}</Text>
//           <Text style={styles.profileTagline}>{profileResult.tagline}</Text>
//           <Text style={styles.text}>{profileResult.description}</Text>
//         </View>

//         {/* Key Metrics */}
//         <View>
//           <Text style={styles.sectionTitle}>Key Investment Metrics</Text>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Expected Annual Return</Text>
//             <Text style={styles.scoreValue}>{profileResult.expectedReturn}</Text>
//           </View>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Risk Level</Text>
//             <Text style={styles.scoreValue}>{profileResult.riskLevel}</Text>
//           </View>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Volatility Expectation</Text>
//             <Text style={styles.scoreValue}>{profileResult.volatility}</Text>
//           </View>
//         </View>

//         {/* Recommended Portfolio Allocation */}
//         <View>
//           <Text style={styles.sectionTitle}>Recommended Portfolio Allocation</Text>
//           <View style={styles.allocationBox}>
//             <View style={styles.allocationItem}>
//               <Text style={styles.allocationLabel}>Equity</Text>
//               <Text style={styles.allocationValue}>{profileResult.allocation.equity}%</Text>
//             </View>
//             <View style={styles.allocationItem}>
//               <Text style={styles.allocationLabel}>Debt</Text>
//               <Text style={styles.allocationValue}>{profileResult.allocation.debt}%</Text>
//             </View>
//             <View style={styles.allocationItem}>
//               <Text style={styles.allocationLabel}>Alternatives</Text>
//               <Text style={styles.allocationValue}>{profileResult.allocation.alternatives}%</Text>
//             </View>
//           </View>
//         </View>

//         {/* Score Breakdown */}
//         <View>
//           <Text style={styles.sectionTitle}>Assessment Score Breakdown</Text>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Risk Capacity Score</Text>
//             <Text style={styles.scoreValue}>{scores.capacityScore} / 30</Text>
//           </View>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Risk Tolerance Score</Text>
//             <Text style={styles.scoreValue}>{scores.toleranceScore} / 36</Text>
//           </View>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Time Horizon Score</Text>
//             <Text style={styles.scoreValue}>{scores.timeScore} / 20</Text>
//           </View>
//           <View style={styles.scoreRow}>
//             <Text style={styles.scoreLabel}>Investment Experience Score</Text>
//             <Text style={styles.scoreValue}>{scores.experienceScore} / 10</Text>
//           </View>
//           <View style={[styles.scoreRow, { borderTop: '2 solid #1A5F7A', marginTop: 10, paddingTop: 10 }]}>
//             <Text style={[styles.scoreLabel, { fontWeight: 'bold' }]}>Total Score</Text>
//             <Text style={[styles.scoreValue, { fontSize: 14 }]}>{scores.totalScore} / 96</Text>
//           </View>
//         </View>

//         {/* Profile Traits */}
//         <View>
//           <Text style={styles.sectionTitle}>Your Profile Characteristics</Text>
//           {profileResult.traits.map((trait: string, index: number) => (
//             <Text key={index} style={styles.bulletPoint}>• {trait}</Text>
//           ))}
//         </View>

//         {/* Behavioral Insights */}
//         <View>
//           <Text style={styles.sectionTitle}>Behavioral Insights</Text>
//           <Text style={[styles.text, { fontWeight: 'bold', marginTop: 5 }]}>Market Volatility Response:</Text>
//           <Text style={styles.text}>{profileResult.behavioralInsights.volatility}</Text>
//           <Text style={[styles.text, { fontWeight: 'bold', marginTop: 8 }]}>Decision Making Style:</Text>
//           <Text style={styles.text}>{profileResult.behavioralInsights.decisionMaking}</Text>
//         </View>

//         {/* Best Suited For */}
//         <View>
//           <Text style={styles.sectionTitle}>Best Suited Investment Products</Text>
//           {profileResult.bestSuitedFor.map((item: string, index: number) => (
//             <Text key={index} style={styles.bulletPoint}>• {item}</Text>
//           ))}
//         </View>

//         {/* Less Suited For */}
//         <View>
//           <Text style={styles.sectionTitle}>Less Suitable Products</Text>
//           {profileResult.lessSuitedFor.map((item: string, index: number) => (
//             <Text key={index} style={styles.bulletPoint}>• {item}</Text>
//           ))}
//         </View>

//         {/* Next Steps */}
//         <View>
//           <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
//           <Text style={styles.text}>{profileResult.nextSteps}</Text>
//         </View>

//         {/* Disclaimer */}
//         <View style={styles.footer}>
//           <Text>This assessment is for informational purposes only and does not constitute financial advice.</Text>
//           <Text style={{ marginTop: 3 }}>Please consult with a qualified financial advisor before making investment decisions.</Text>
//         </View>

//          {/* Enhanced Recommended Portfolio Section */}
//         <View style={{ marginTop: 20 }}>
//           <Text style={styles.portfolioHeader}>Recommended Portfolio</Text>
          
//           {/* Portfolio Allocation */}
//           <View style={styles.chartContainer}>
//             <View style={{ 
//               width: 200, 
//               height: 200, 
//               borderRadius: 100, 
//               backgroundColor: '#F3F4F6',
//               justifyContent: 'center',
//               alignItems: 'center',
//               marginBottom: 20,
//               border: '1 solid #E2E8F0'
//             }}>
//               {/* This is a simplified Donut chart using circles */}
//               <View style={{ 
//                 position: 'absolute',
//                 width: 180,
//                 height: 180,
//                 borderRadius: 90,
//                 backgroundColor: '#FFFFFF',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//               }}>
//                 <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#0F172A' }}>
//                   {profileResult.allocation.equity}%
//                 </Text>
//                 <Text style={{ fontSize: 10, color: '#64748B' }}>Equity</Text>
//               </View>
              
//               {/* These would be segments in a real chart */}
//               <View style={{ 
//                 position: 'absolute',
//                 width: 200,
//                 height: 200,
//                 borderRadius: 100,
//                 border: `20px solid #4CD9B0`,
//                 borderBottomColor: 'transparent',
//                 borderRightColor: 'transparent',
//                 transform: 'rotate(0deg)'
//               }} />
//               <View style={{ 
//                 position: 'absolute',
//                 width: 200,
//                 height: 200,
//                 borderRadius: 100,
//                 border: `20px solid #FFC857`,
//                 borderTopColor: 'transparent',
//                 borderRightColor: 'transparent',
//                 transform: 'rotate(120deg)'
//               }} />
//               <View style={{ 
//                 position: 'absolute',
//                 width: 200,
//                 height: 200,
//                 borderRadius: 100,
//                 border: `20px solid #A78BFA`,
//                 borderTopColor: 'transparent',
//                 borderLeftColor: 'transparent',
//                 transform: 'rotate(240deg)'
//               }} />
//             </View>

//             {/* Legend */}
//             <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 15, marginBottom: 20 }}>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <View style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: '#4CD9B0', marginRight: 5 }} />
//                 <Text style={{ fontSize: 10 }}>Equity: {profileResult.allocation.equity}%</Text>
//               </View>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <View style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: '#FFC857', marginRight: 5 }} />
//                 <Text style={{ fontSize: 10 }}>Debt: {profileResult.allocation.debt}%</Text>
//               </View>
//               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                 <View style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: '#A78BFA', marginRight: 5 }} />
//                 <Text style={{ fontSize: 10 }}>Alternatives: {profileResult.allocation.alternatives}%</Text>
//               </View>
//             </View>
//           </View>

//           {/* Key Metrics */}
//           <View style={styles.metricsContainer}>
//             <View style={styles.metricRow}>
//               <Text style={styles.metricLabel}>Expected Annual Return</Text>
//               <Text style={[styles.metricValue, { color: '#10B981' }]}>
//                 {profileResult.expectedReturn}
//               </Text>
//             </View>
//             <View style={styles.metricRow}>
//               <Text style={styles.metricLabel}>Risk Level</Text>
//               <Text style={styles.metricValue}>{profileResult.riskLevel}</Text>
//             </View>
//             <View style={[styles.metricRow, { marginBottom: 0 }]}>
//               <Text style={styles.metricLabel}>Volatility</Text>
//               <Text style={styles.metricValue}>{profileResult.volatility}</Text>
//             </View>
//           </View>
//         </View>

//         {/* ... rest of the existing sections ... */}
//       </Page>
//     </Document>
//   );
// }

// export function PDFReportDownload({ profileResult, scores, userName }: PDFReportProps) {
//   const fileName = `RuDo-Wealth-Investment-Profile-${new Date().toISOString().split('T')[0]}.pdf`;

//   return (
//     <PDFDownloadLink
//       document={<InvestmentReportDocument profileResult={profileResult} scores={scores} userName={userName} />}
//       fileName={fileName}
//     >
//       {({ loading }) => (
//         <Button 
//           variant="outline" 
//           className="w-full gap-2"
//           disabled={loading}
//           data-testid="button-download-pdf"
//         >
//           <Download className="w-4 h-4" />
//           {loading ? 'Generating PDF...' : 'Download Full Report (PDF)'}
//         </Button>
//       )}
//     </PDFDownloadLink>
//   );
// }


import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Svg,
  Path,
} from '@react-pdf/renderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import type { ProfileResult } from '@shared/schema';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
    borderBottom: '2 solid #1A5F7A',
    paddingBottom: 15,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A5F7A',
    marginBottom: 5,
  },
  reportTitle: {
    fontSize: 14,
    color: '#666666',
  },
  profileSection: {
    marginTop: 25,
    marginBottom: 25,
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A0E1A',
    marginBottom: 8,
  },
  profileTagline: {
    fontSize: 12,
    color: '#C9A574',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1A5F7A',
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 11,
    color: '#333333',
    lineHeight: 1.6,
    marginBottom: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    paddingVertical: 4,
    borderBottom: '1 solid #E5E7EB',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#666666',
  },
  scoreValue: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1A5F7A',
  },
  bulletPoint: {
    fontSize: 11,
    color: '#333333',
    marginBottom: 6,
    paddingLeft: 15,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#999999',
    borderTop: '1 solid #E5E7EB',
    paddingTop: 10,
  },
  portfolioHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A0E1A',
    marginBottom: 15,
    textAlign: 'center',
  },
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  metricsContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 15,
    marginTop: 15,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748B',
  },
  metricValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
});

/* === Donut Chart Helper Functions === */
function polarToCartesian(cx: number, cy: number, r: number, angle: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function describeDonutSlice(cx: number, cy: number, rOuter: number, rInner: number, start: number, end: number) {
  const largeArc = end - start <= 180 ? 0 : 1;
  const outerStart = polarToCartesian(cx, cy, rOuter, end);
  const outerEnd = polarToCartesian(cx, cy, rOuter, start);
  const innerStart = polarToCartesian(cx, cy, rInner, start);
  const innerEnd = polarToCartesian(cx, cy, rInner, end);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 1 ${innerEnd.x} ${innerEnd.y}`,
    'Z',
  ].join(' ');
}

function DonutChart({
  equity,
  debt,
  alternatives,
  size = 160,
  innerSize = 90,
}: {
  equity: number;
  debt: number;
  alternatives: number;
  size?: number;
  innerSize?: number;
}) {
  const total = equity + debt + alternatives || 1;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size / 2;
  const rInner = innerSize / 2;

  const segments = [
    { color: '#4CD9B0', value: equity },
    { color: '#FFC857', value: debt },
    { color: '#A78BFA', value: alternatives },
  ];

  let angle = 0;
  const paths = segments
    .filter((s) => s.value > 0)
    .map((s, i) => {
      const start = angle;
      const end = angle + (s.value / total) * 360;
      angle = end;
      const d = describeDonutSlice(cx, cy, rOuter, rInner, start, end);
      return <Path key={i} d={d} fill={s.color} />;
    });

  return (
    <Svg width={size} height={size}>
      <Path d={describeDonutSlice(cx, cy, rOuter, rInner, 0, 360)} fill="#E5E7EB" />
      {paths}
    </Svg>
  );
}

/* === PDF Main Component === */
interface PDFReportProps {
  profileResult: ProfileResult;
  scores: {
    capacityScore: number;
    toleranceScore: number;
    timeScore: number;
    experienceScore: number;
    totalScore: number;
  };
  userName?: string;
}

function InvestmentReportDocument({ profileResult, scores, userName }: PDFReportProps) {
  const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const { equity = 0, debt = 0, alternatives = 0 } = profileResult.allocation || {};

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* === HEADER === */}
        <View style={styles.header}>
          <Text style={styles.companyName}>RuDo Wealth</Text>
          <Text style={styles.reportTitle}>Investment Risk Profile Assessment Report</Text>
          <Text style={[styles.reportTitle, { marginTop: 5 }]}>Generated on {date}</Text>
          {userName && <Text style={[styles.reportTitle, { marginTop: 3 }]}>Prepared for: {userName}</Text>}
        </View>

        {/* === PROFILE SUMMARY === */}
        <View style={styles.profileSection}>
          <Text style={styles.profileTitle}>{profileResult.title}</Text>
          <Text style={styles.profileTagline}>{profileResult.tagline}</Text>
          <Text style={styles.text}>{profileResult.description}</Text>
        </View>

        {/* === RECOMMENDED PORTFOLIO (DONUT) === */}
        <View style={{ marginTop: 25 }}>
          <Text style={styles.portfolioHeader}>Recommended Portfolio</Text>

          <View style={styles.chartContainer}>
            <DonutChart equity={equity} debt={debt} alternatives={alternatives} />

            {/* Center Text */}
            <View
              style={{
                position: 'absolute',
                top: 70,
                left: 70,
                width: 80,
                height: 80,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#0F172A' }}>100%</Text>
              <Text style={{ fontSize: 9, color: '#64748B' }}>Portfolio</Text>
            </View>

            {/* Legend */}
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <View style={{ width: 12, height: 12, backgroundColor: '#4CD9B0', marginRight: 5 }} />
                <Text style={{ fontSize: 10 }}>Equity: {equity}%</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                <View style={{ width: 12, height: 12, backgroundColor: '#FFC857', marginRight: 5 }} />
                <Text style={{ fontSize: 10 }}>Debt: {debt}%</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 12, height: 12, backgroundColor: '#A78BFA', marginRight: 5 }} />
                <Text style={{ fontSize: 10 }}>Alternatives: {alternatives}%</Text>
              </View>
            </View>
          </View>

          {/* Portfolio Metrics */}
          <View style={styles.metricsContainer}>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Expected Annual Return</Text>
              <Text style={[styles.metricValue, { color: '#10B981' }]}>{profileResult.expectedReturn}</Text>
            </View>
            <View style={styles.metricRow}>
              <Text style={styles.metricLabel}>Risk Level</Text>
              <Text style={styles.metricValue}>{profileResult.riskLevel}</Text>
            </View>
            <View style={[styles.metricRow, { marginBottom: 0 }]}>
              <Text style={styles.metricLabel}>Volatility</Text>
              <Text style={styles.metricValue}>{profileResult.volatility}</Text>
            </View>
          </View>
        </View>

        {/* === KEY METRICS === */}
        <View>
          <Text style={styles.sectionTitle}>Key Investment Metrics</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Expected Annual Return</Text>
            <Text style={styles.scoreValue}>{profileResult.expectedReturn}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Risk Level</Text>
            <Text style={styles.scoreValue}>{profileResult.riskLevel}</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Volatility Expectation</Text>
            <Text style={styles.scoreValue}>{profileResult.volatility}</Text>
          </View>
        </View>

        {/* === SCORE BREAKDOWN === */}
        <View>
          <Text style={styles.sectionTitle}>Assessment Score Breakdown</Text>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Risk Capacity Score</Text>
            <Text style={styles.scoreValue}>{scores.capacityScore} / 30</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Risk Tolerance Score</Text>
            <Text style={styles.scoreValue}>{scores.toleranceScore} / 36</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Time Horizon Score</Text>
            <Text style={styles.scoreValue}>{scores.timeScore} / 20</Text>
          </View>
          <View style={styles.scoreRow}>
            <Text style={styles.scoreLabel}>Investment Experience Score</Text>
            <Text style={styles.scoreValue}>{scores.experienceScore} / 10</Text>
          </View>
          <View style={[styles.scoreRow, { borderTop: '2 solid #1A5F7A', marginTop: 10, paddingTop: 10 }]}>
            <Text style={[styles.scoreLabel, { fontWeight: 'bold' }]}>Total Score</Text>
            <Text style={[styles.scoreValue, { fontSize: 14 }]}>{scores.totalScore} / 96</Text>
          </View>
        </View>

        {/* === PROFILE CHARACTERISTICS === */}
        <View>
          <Text style={styles.sectionTitle}>Your Profile Characteristics</Text>
          {profileResult.traits.map((trait, i) => (
            <Text key={i} style={styles.bulletPoint}>• {trait}</Text>
          ))}
        </View>

        {/* === BEHAVIORAL INSIGHTS === */}
        <View>
          <Text style={styles.sectionTitle}>Behavioral Insights</Text>
          <Text style={[styles.text, { fontWeight: 'bold', marginTop: 5 }]}>Market Volatility Response:</Text>
          <Text style={styles.text}>{profileResult.behavioralInsights.volatility}</Text>
          <Text style={[styles.text, { fontWeight: 'bold', marginTop: 8 }]}>Decision Making Style:</Text>
          <Text style={styles.text}>{profileResult.behavioralInsights.decisionMaking}</Text>
        </View>

        {/* === BEST & LESS SUITED === */}
        <View>
          <Text style={styles.sectionTitle}>Best Suited Investment Products</Text>
          {profileResult.bestSuitedFor.map((item, i) => (
            <Text key={i} style={styles.bulletPoint}>• {item}</Text>
          ))}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Less Suitable Products</Text>
          {profileResult.lessSuitedFor.map((item, i) => (
            <Text key={i} style={styles.bulletPoint}>• {item}</Text>
          ))}
        </View>

        {/* === NEXT STEPS === */}
        <View>
          <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
          <Text style={styles.text}>{profileResult.nextSteps}</Text>
        </View>

        





        {/* === FOOTER === */}
        <View style={styles.footer}>
          <Text>This assessment is for informational purposes only and does not constitute financial advice.</Text>
          <Text style={{ marginTop: 3 }}>
            Please consult with a qualified financial advisor before making investment decisions.
          </Text>
        </View>
      </Page>
    </Document>
  );
}

/* === DOWNLOAD BUTTON === */
export function PDFReportDownload({ profileResult, scores, userName }: PDFReportProps) {
  const fileName = `RuDo-Wealth-Investment-Profile-${new Date().toISOString().split('T')[0]}.pdf`;

  return (
    <PDFDownloadLink
      document={<InvestmentReportDocument profileResult={profileResult} scores={scores} userName={userName} />}
      fileName={fileName}
    >
      {({ loading }) => (
        <Button variant="outline" className="w-full gap-2" disabled={loading}>
          <Download className="w-4 h-4" />
          {loading ? 'Generating PDF...' : 'Download Full Report (PDF)'}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
