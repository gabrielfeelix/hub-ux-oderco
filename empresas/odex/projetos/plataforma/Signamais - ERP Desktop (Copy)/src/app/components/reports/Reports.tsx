import React from 'react';
import { ReportsOverview } from './ReportsOverview';
import { ReportsByPeriod } from './ReportsByPeriod';
import { ReportsByUser } from './ReportsByUser';
import { ReportsByDocType } from './ReportsByDocType';
import { ReportsCredits } from './ReportsCredits';

interface ReportsProps {
  activeView: string;
}

export function Reports({ activeView }: ReportsProps) {
  switch (activeView) {
    case 'overview':
      return <ReportsOverview />;
    case 'period':
      return <ReportsByPeriod />;
    case 'user':
      return <ReportsByUser />;
    case 'doctype':
      return <ReportsByDocType />;
    case 'credits':
      return <ReportsCredits />;
    default:
      return <ReportsOverview />;
  }
}