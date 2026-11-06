import React from 'react';
import { Metadata } from 'next';
import VideoShowcaseView from '@/components/videos/VideoShowcaseView';

export const metadata: Metadata = {
  title: 'Video Showcase & Live Engineering Kinematics | Neptune Automatic',
  description:
    'Watch live crash tests, 0.9s boom barrier kinematic demonstrations, automated hydraulic bollard deployments, and smart parking telemetry in action.',
  keywords: [
    'Neptune Automatic Videos',
    'Boom Barrier Crash Test Video',
    'Hydraulic Bollard Impact Test',
    'FASTag Parking Management Video',
    'Access Automation Kinematics',
  ],
};

export default function VideosPage() {
  return <VideoShowcaseView />;
}
