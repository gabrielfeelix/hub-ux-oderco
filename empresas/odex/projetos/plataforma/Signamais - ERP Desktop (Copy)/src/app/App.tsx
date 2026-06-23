import React, { useState } from "react";
import { Layout } from "@/app/components/Layout";
import { DocumentsList } from "@/app/components/DocumentsList";
import { LoginScreen } from "@/app/components/LoginScreen";
import { Dashboard } from "@/app/components/Dashboard";
import { OnboardingSetupModal } from "@/app/components/OnboardingSetupModal";

// Define the structure of a View
export interface DashboardView {
  id: string;
  name: string;
  widgets: string[];
}

export default function App() {
  const [activeFolder, setActiveFolder] = useState(
    "Caixa de entrada",
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [startOnboarding, setStartOnboarding] = useState(false);
  const [showOnboardingSetup, setShowOnboardingSetup] =
    useState(false);

  // Navigation State
  const [activeTab, setActiveTab] = useState("Início");
  const [adminAction, setAdminAction] = useState<
    string | undefined
  >(undefined);
  const [triggerNewEnvelope, setTriggerNewEnvelope] =
    useState(false);

  // Clear admin action when changing tabs or after a timeout to prevent re-opening on manual navigation
  React.useEffect(() => {
    if (adminAction && activeTab !== "Adm") {
      setAdminAction(undefined);
    }
  }, [activeTab]);

  // Custom Views State
  const [views, setViews] = useState<DashboardView[]>([
    {
      id: "overview",
      name: "Visão Geral",
      widgets: [
        "priority",
        "tasks",
        "recent",
        "favorites",
        "results",
      ],
    },
  ]);
  const [activeViewId, setActiveViewId] = useState("overview");

  const handleAddView = (name: string, widgets: string[]) => {
    const newView: DashboardView = {
      id: `view-${Date.now()}`,
      name,
      widgets,
    };
    setViews([...views, newView]);
    setActiveViewId(newView.id);
  };

  const handleEditView = (
    viewId: string,
    name: string,
    widgets: string[],
  ) => {
    setViews(
      views.map((v) =>
        v.id === viewId ? { ...v, name, widgets } : v,
      ),
    );
  };

  const handleDeleteView = (viewId: string) => {
    setViews(views.filter((v) => v.id !== viewId));
    if (activeViewId === viewId) {
      setActiveViewId("overview");
    }
  };

  const activeView =
    views.find((v) => v.id === activeViewId) || views[0];

  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={() => setIsLoggedIn(true)}
        onStartOnboarding={() => {
          setIsLoggedIn(true);
          setStartOnboarding(true);
        }}
        onSignupComplete={() => {
          setIsLoggedIn(true);
          setShowOnboardingSetup(true);
        }}
      />
    );
  }

  return (
    <>
      <OnboardingSetupModal
        isOpen={showOnboardingSetup}
        onComplete={(data) => {
          setShowOnboardingSetup(false);

          if (data?.action === "new-envelope") {
            setActiveTab("Documentos");
            setTriggerNewEnvelope(true);
            // Reset trigger after a delay to allow re-triggering if needed later?
            // For now, simple set is enough as this is a one-time flow from onboarding.
          } else if (data?.action === "setup-team") {
            setActiveTab("Adm");
            setAdminAction("add-user");
          } else {
            // Default: Start Tour if no specific action taken
            setStartOnboarding(true);
          }
        }}
      />
      <Layout
        activeFolder={activeFolder}
        onFolderChange={setActiveFolder}
        onLogout={() => setIsLoggedIn(false)}
        customViews={views}
        activeViewId={activeViewId}
        activeViewWidgets={activeView.widgets}
        onViewSelect={setActiveViewId}
        onAddView={handleAddView}
        onEditView={handleEditView}
        onDeleteView={handleDeleteView}
        startOnboarding={startOnboarding}
        onStartOnboarding={() => setStartOnboarding(true)}
        onOnboardingComplete={() => setStartOnboarding(false)}
        // Navigation Props
        activeTab={activeTab}
        onTabChange={setActiveTab}
        initialAdminAction={adminAction}
        initialTriggerNewEnvelope={triggerNewEnvelope}
      >
        <DocumentsList activeFolder={activeFolder} />
      </Layout>
    </>
  );
}