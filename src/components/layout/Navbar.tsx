import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Sparkles, 
  Users, 
  ShoppingBag, 
  Truck, 
  FileText, 
  BarChart3, 
  Settings, 
  Eye, 
  HelpCircle,
  Database
} from 'lucide-react';
import { isSupabaseConfigured } from '../../services/supabase';

export type NavTab = 
  | 'dashboard' 
  | 'inventory' 
  | 'recipes' 
  | 'orders' 
  | 'customers' 
  | 'restocking' 
  | 'ledger' 
  | 'reports' 
  | 'settings';

interface NavbarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  onView3D: () => void;
  onRunDemoScenario: () => void;
}

export function Navbar({ activeTab, onTabChange, onView3D, onRunDemoScenario }: NavbarProps) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'recipes', label: 'Gift Recipes', icon: Sparkles },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'restocking', label: 'Restocking', icon: Truck },
    { id: 'ledger', label: 'Stock Ledger', icon: FileText },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#F3E3DC] shadow-sm">
      {/* Top Brand Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTabChange('dashboard')}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#9E2A47] to-[#D49B4B] p-0.5 shadow-sm">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#9E2A47]" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-[#2B181E] font-serif tracking-tight leading-none">
                Petite Maison
              </h1>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-[#FDF4E7] text-[#9E2A47] px-2 py-0.5 rounded-full border border-[#D49B4B]/30">
                Single-User Edition
              </span>
            </div>
            <p className="text-xs text-[#7A6269]">Artisanal Gift Boutique & Inventory System</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center space-x-2.5">
          {/* 3D Boutique Quick View Button */}
          <button
            onClick={onView3D}
            className="flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl bg-white hover:bg-[#FDF4E7] text-[#9E2A47] border border-[#F3E3DC] shadow-soft hover:shadow-md hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Explore 3D Architectural Miniature Boutique"
          >
            <Eye className="w-3.5 h-3.5 text-[#9E2A47]" />
            <span className="hidden sm:inline">Explore 3D Boutique</span>
          </button>

          {/* Database Sync Badge */}
          <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#F3E3DC] text-xs text-[#2B181E] shadow-xs">
            <Database className="w-3.5 h-3.5 text-[#9E2A47]" />
            <span>{isSupabaseConfigured ? 'Supabase Live' : 'Local Storage Mode'}</span>
            <span className="w-2 h-2 rounded-full bg-[#1F8A65] animate-pulse" />
          </div>

          {/* 1-Click Spec Verification Simulation */}
          <button
            onClick={onRunDemoScenario}
            className="flex items-center space-x-1.5 text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-[#9E2A47] to-[#7E1F38] text-white shadow-soft hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            title="Runs the 5-Customer Depletion & Restock demo scenario"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden lg:inline">Simulation Demo</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar border-t border-[#F3E3DC]/60">
        <nav className="flex space-x-1.5 py-2">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id as NavTab)}
                className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95 ${
                  isActive
                    ? 'bg-[#9E2A47] text-white shadow-[0_4px_14px_rgba(158,42,71,0.3)]'
                    : 'text-[#7A6269] hover:bg-[#FDF4E7] hover:text-[#2B181E]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-[#9E2A47]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
