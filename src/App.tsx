import React, { useRef, useState } from 'react';
import { BoutiqueHero } from './three/BoutiqueHero';
import { Navbar, NavTab } from './components/layout/Navbar';
import { DashboardPage } from './features/dashboard/DashboardPage';
import { InventoryPage } from './features/inventory/InventoryPage';
import { RecipesPage } from './features/recipes/RecipesPage';
import { CustomersPage } from './features/customers/CustomersPage';
import { OrdersPage } from './features/orders/OrdersPage';
import { RestockingPage } from './features/restocking/RestockingPage';
import { LedgerPage } from './features/ledger/LedgerPage';
import { ReportsPage } from './features/reports/ReportsPage';
import { SettingsPage } from './features/settings/SettingsPage';
import { ItemStockModal } from './components/modals/ItemStockModal';
import { useGiftShopStore } from './hooks/useStore';
import confetti from 'canvas-confetti';

export function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isNewRestockModalOpen, setIsNewRestockModalOpen] = useState(false);
  const [selectedMaterialForModal, setSelectedMaterialForModal] = useState<string | null>(null);
  const [demoBannerMessage, setDemoBannerMessage] = useState<string | null>(null);

  const { runSpecDepletionScenario } = useGiftShopStore();
  const operationsRef = useRef<HTMLDivElement>(null);

  const scrollToOperations = () => {
    if (operationsRef.current) {
      operationsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollTo3D = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRunDemoScenario = () => {
    const res = runSpecDepletionScenario();
    setDemoBannerMessage(res.message);
    setActiveTab('orders');
    scrollToOperations();

    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8873B5', '#F5C9D6', '#C9A66B', '#C9B8E8']
      });
    } catch (e) {}

    setTimeout(() => {
      setDemoBannerMessage(null);
    }, 10000);
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col font-sans selection:bg-lavender-300 selection:text-charcoal-900">
      {/* 1. CINEMATIC 3D INTERIOR BOUTIQUE JOURNEY (Door first, then inside exploring the three walls) */}
      <section id="boutique-3d-journey">
        <BoutiqueHero 
          onEnterDashboard={scrollToOperations}
          onSelectItem={(matId) => setSelectedMaterialForModal(matId)} 
        />
      </section>

      {/* 2. ENTERPRISE INVENTORY & MANAGEMENT DASHBOARD (No Authentication Barrier) */}
      <div ref={operationsRef} className="relative z-20 min-h-screen flex flex-col bg-[#FFF9F5]">
        <Navbar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onView3D={scrollTo3D} 
          onRunDemoScenario={handleRunDemoScenario}
        />

        {/* Demo Scenario Notification Banner */}
        {demoBannerMessage && (
          <div className="bg-gradient-to-r from-emerald-600 to-lavender-600 text-white px-4 py-3 text-xs font-semibold flex items-center justify-between shadow-md">
            <div className="max-w-7xl mx-auto flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>{demoBannerMessage}</span>
            </div>
            <button 
              onClick={() => setDemoBannerMessage(null)}
              className="text-white hover:text-lavender-200 text-sm font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Workspace Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {activeTab === 'dashboard' && (
            <DashboardPage 
              onNavigate={setActiveTab}
              onOpenNewOrder={() => { setActiveTab('orders'); setIsNewOrderModalOpen(true); }}
              onOpenNewRestock={() => { setActiveTab('restocking'); setIsNewRestockModalOpen(true); }}
            />
          )}

          {activeTab === 'inventory' && <InventoryPage />}
          {activeTab === 'recipes' && <RecipesPage />}
          {activeTab === 'customers' && <CustomersPage />}

          {activeTab === 'orders' && (
            <OrdersPage 
              isCreateModalOpen={isNewOrderModalOpen} 
              setIsCreateModalOpen={setIsNewOrderModalOpen} 
            />
          )}

          {activeTab === 'restocking' && (
            <RestockingPage 
              isModalOpen={isNewRestockModalOpen} 
              setIsModalOpen={setIsNewRestockModalOpen} 
            />
          )}

          {activeTab === 'ledger' && <LedgerPage />}
          {activeTab === 'reports' && <ReportsPage />}
          {activeTab === 'settings' && <SettingsPage onRunDemoScenario={handleRunDemoScenario} />}
        </main>

        {/* Boutique Footer */}
        <footer className="mt-auto border-t border-lavender-200 bg-white/70 backdrop-blur-sm py-6 text-center text-xs text-charcoal-800/60">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p>© {new Date().getFullYear()} Petite Maison Gift Boutique. All stock movements & recipes are atomically tracked.</p>
            <div className="flex items-center space-x-4">
              <button onClick={scrollTo3D} className="hover:text-lavender-600 transition font-medium">
                Return to 3D Interior
              </button>
              <span>•</span>
              <button onClick={() => setActiveTab('ledger')} className="hover:text-lavender-600 transition font-medium">
                Audit Ledger
              </button>
            </div>
          </div>
        </footer>
      </div>

      {/* 3. INTERACTIVE 3D ITEM STOCK & MONTH-WISE ORDER HISTORY MODAL */}
      {selectedMaterialForModal && (
        <ItemStockModal 
          materialId={selectedMaterialForModal} 
          onClose={() => setSelectedMaterialForModal(null)} 
          onQuickRestock={(matId) => {
            setSelectedMaterialForModal(null);
            setActiveTab('restocking');
            setIsNewRestockModalOpen(true);
            scrollToOperations();
          }}
        />
      )}
    </div>
  );
}

export default App;
