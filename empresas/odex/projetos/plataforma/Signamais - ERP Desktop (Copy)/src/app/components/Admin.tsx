import React from 'react';
import { AdminUsers } from './admin/AdminUsers';
import { AdminPermissions } from './admin/AdminPermissions';
import { AdminAudit } from './admin/AdminAudit';
import { AdminBilling } from './admin/AdminBilling';
import { AdminGeneral } from './admin/AdminGeneral';
import { AdminPreferences } from './admin/AdminPreferences';
import { AdminIntegrations } from './admin/AdminIntegrations';

interface AdminProps {
  activeSection: string;
  initialAction?: string;
}

export function Admin({ activeSection, initialAction }: AdminProps) {
  const renderContent = () => {
    switch (activeSection) {
      case 'general':
        return <AdminGeneral />;
      case 'users':
        return <AdminUsers initialAction={initialAction === 'add-user' ? 'add-user' : undefined} />;
      case 'permissions':
        return <AdminPermissions />;
      case 'preferences':
        return <AdminPreferences />;
      case 'audit':
        return <AdminAudit />;
      case 'billing':
        return <AdminBilling />;
      case 'integrations':
        return <AdminIntegrations />;
      default:
        return <AdminGeneral />;
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 w-full max-w-[1600px] mx-auto gap-8">
      {renderContent()}
    </div>
  );
}
