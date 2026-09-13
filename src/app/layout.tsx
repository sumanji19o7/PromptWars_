import type { Metadata } from 'next';
import './globals.css';
import { ClickSpark } from '@/components/ClickSpark';
import { Persistent3DBackground } from '@/components/3d/Persistent3DBackground';
import { CubesSideRails } from '@/components/CubesSideRails';
import SplashCursor from '@/components/SplashCursor';

export const metadata: Metadata = {
  title: 'StudyFlow — Turn Lectures into Exam-Ready Revision Packs',
  description:
    'AI-powered student revision workspace that transforms lecture slides and notes into structured study guides, key concepts, question banks, and last-minute exam cram sheets.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased dark"
    >
      <body className="min-h-full flex flex-col bg-[#0a0b10] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative">
        <Persistent3DBackground />
        <CubesSideRails />
        <ClickSpark
          sparkColor="#ffffff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
          easing="ease-out"
          extraScale={1}
        />
        <SplashCursor
          SPLAT_RADIUS={0.10}
          SPLAT_FORCE={2400}
          DENSITY_DISSIPATION={4.5}
          VELOCITY_DISSIPATION={2.5}
        />
        <div className="relative z-10 flex-1 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
