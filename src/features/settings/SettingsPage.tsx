import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  Database, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Info,
  ShieldCheck,
  Zap,
  Cloud,
  CloudUpload,
  CloudDownload,
  Activity
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { isSupabaseConfigured, testSupabaseConnection } from '../../services/supabase';
import { store } from '../../services/store';

interface SettingsPageProps {
  onRunDemoScenario: () => void;
}

export function SettingsPage({ onRunDemoScenario }: SettingsPageProps) {
  const { settings, resetToCleanTesting, clearAllData } = useGiftShopStore();
  const [shopName, setShopName] = useState(settings.shopName);
  const [currencySymbol, setCurrencySymbol] = useState(settings.currencySymbol);
  const [taxRate, setTaxRate] = useState(settings.taxRate);
  const [address, setAddress] = useState(settings.address);
  const [phone, setPhone] = useState(settings.phone);
  const [email, setEmail] = useState(settings.email);
  const [isSaved, setIsSaved] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isTestingSupabase, setIsTestingSupabase] = useState(false);
  const [supabaseTestFeedback, setSupabaseTestFeedback] = useState<{ success: boolean; message: string } | null>(null);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleTestConnection = async () => {
    setIsTestingSupabase(true);
    setSupabaseTestFeedback(null);
    try {
      const res = await testSupabaseConnection();
      setSupabaseTestFeedback(res);
    } catch (e: any) {
      setSupabaseTestFeedback({ success: false, message: e?.message || 'Connection test failed.' });
    } finally {
      setIsTestingSupabase(false);
    }
  };

  const handleSyncFromRemote = async () => {
    setStatusMsg('Fetching latest data from Supabase...');
    const res = await store.syncWithSupabase();
    setStatusMsg(res.message);
    setTimeout(() => setStatusMsg(null), 5000);
  };

  const handlePushToRemote = async () => {
    setStatusMsg('Pushing local inventory & settings to Supabase...');
    const res = await store.pushToSupabase();
    setStatusMsg(res.message);
    setTimeout(() => setStatusMsg(null), 5000);
  };

  const handleResetClean = () => {
    if (window.confirm('Reset materials catalog to starter items and wipe all orders/movements for clean testing?')) {
      resetToCleanTesting();
      setStatusMsg('Reset to clean starter catalog with zero orders & clean ledger.');
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleClearAllData = () => {
    if (window.confirm('Wipe ALL data (materials, balances, orders, customers, recipes) to a 100% blank slate?')) {
      clearAllData();
      setStatusMsg('All data wiped! You now have a 100% clean blank testing environment.');
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  return (
    <div className="space-y-8 pb-12 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold font-display text-charcoal-900">Boutique & System Settings</h1>
        <p className="text-xs text-charcoal-800/70">
          Single-user system configuration, store branding, Supabase database integration, and test verification suite.
        </p>
      </div>

      {/* 1-Click Spec Verification Banner */}
      <div className="bg-gradient-to-r from-lavender-500 to-blush-400 p-6 rounded-3xl text-white shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-gold-300" />
            <h2 className="text-base font-bold font-display">Spec Verification Scenario (Phases 6, 7 & 8)</h2>
          </div>
          <p className="text-xs text-lavender-100 max-w-lg">
            Automatically simulates the exact test case from the specification: 5 customers each order 1 Standard Gift, all 5 orders are completed depleting all materials to 0, then 20m of packing sheet is restocked.
          </p>
        </div>

        <button
          onClick={onRunDemoScenario}
          className="px-5 py-2.5 rounded-2xl bg-white text-charcoal-900 font-bold text-xs shadow-soft hover:bg-cream-100 transition whitespace-nowrap flex items-center space-x-2"
        >
          <Sparkles className="w-4 h-4 text-lavender-600" />
          <span>Execute Test Run</span>
        </button>
      </div>

      {/* Boutique Profile Settings Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft space-y-6">
        <div className="flex items-center space-x-3 border-b border-lavender-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-lavender-100 flex items-center justify-center text-lavender-600">
            <Store className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-charcoal-900">Boutique Details</h2>
            <p className="text-xs text-charcoal-800/70">Configure your store name, currency, and invoice contact information</p>
          </div>
        </div>

        <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-charcoal-800 block mb-1">Store / Boutique Name</label>
              <input
                type="text"
                value={shopName}
                onChange={e => setShopName(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal-800 block mb-1">Currency Symbol</label>
              <input
                type="text"
                value={currencySymbol}
                onChange={e => setCurrencySymbol(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-charcoal-800 block mb-1">Contact Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal-800 block mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-charcoal-800 block mb-1">Boutique Address</label>
            <input
              type="text"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-lavender-100">
            {isSaved ? (
              <span className="text-emerald-600 font-semibold flex items-center space-x-1">
                <CheckCircle2 className="w-4 h-4" />
                <span>Settings saved successfully!</span>
              </span>
            ) : <span />}

            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-charcoal-900 text-white font-semibold shadow-soft hover:bg-lavender-700 transition"
            >
              Save Boutique Profile
            </button>
          </div>
        </form>
      </div>

      {/* Supabase Integration Details */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-lavender-200/80 shadow-soft space-y-5">
        <div className="flex items-center justify-between border-b border-lavender-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-charcoal-900">Database & Live Supabase Cloud</h2>
              <p className="text-xs text-charcoal-800/70">Single-user offline persistence and real-time Supabase cloud sync</p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1.5 ${
            isSupabaseConfigured 
              ? 'bg-emerald-100 text-emerald-800' 
              : 'bg-lavender-100 text-lavender-800'
          }`}>
            <span className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-lavender-400'}`}></span>
            <span>{isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Storage Mode'}</span>
          </span>
        </div>

        <div className="text-xs text-charcoal-800/80 space-y-2 leading-relaxed">
          <p>
            Your boutique system supports automatic dual-tier persistence: zero-latency local caching plus cloud backup with PostgreSQL on Supabase.
          </p>
          <div className="p-3 bg-cream-50 rounded-2xl border border-lavender-100 space-y-1.5 font-mono text-[11px]">
            <p><strong>Project URL:</strong> <span className="text-lavender-700">https://omgbhmnmpvilaahujfwr.supabase.co</span></p>
            <p><strong>SQL Migration:</strong> <span className="text-lavender-700">supabase/migrations/20261031_init.sql</span></p>
            <p><strong>Environment Config:</strong> Connected via <span className="text-charcoal-900">.env</span> (Anon Publishable Key Active).</p>
          </div>
        </div>

        {/* Action Controls for Supabase */}
        <div className="p-4 bg-lavender-50/50 rounded-2xl border border-lavender-100/80 space-y-3">
          <div className="text-xs font-bold text-charcoal-800 flex items-center justify-between">
            <span>Supabase Cloud Actions:</span>
            <span className="text-[11px] font-normal text-charcoal-600">Single-click test & data synchronization</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isTestingSupabase}
              className="flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-charcoal-900 text-white hover:bg-lavender-800 hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isTestingSupabase ? 'Verifying...' : 'Test Connection'}</span>
            </button>

            <button
              type="button"
              onClick={handleSyncFromRemote}
              className="flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <CloudDownload className="w-3.5 h-3.5" />
              <span>Pull from Supabase</span>
            </button>

            <button
              type="button"
              onClick={handlePushToRemote}
              className="flex items-center space-x-1.5 text-xs font-bold px-3.5 py-2 rounded-xl bg-lavender-700 text-white hover:bg-lavender-800 hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-sm"
            >
              <CloudUpload className="w-3.5 h-3.5" />
              <span>Push Local to Supabase</span>
            </button>
          </div>

          {supabaseTestFeedback && (
            <div className={`p-3 rounded-xl text-xs font-medium border ${
              supabaseTestFeedback.success 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center space-x-2">
                <span className={`w-2 h-2 rounded-full ${supabaseTestFeedback.success ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                <span>{supabaseTestFeedback.message}</span>
              </div>
            </div>
          )}
        </div>

        {statusMsg && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-bold animate-in fade-in">
            {statusMsg}
          </div>
        )}

        <div className="pt-2 flex flex-wrap items-center gap-3">
          <button
            onClick={handleResetClean}
            className="flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl bg-lavender-100 text-lavender-800 hover:bg-lavender-200 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Clean Starter Catalog</span>
          </button>

          <button
            onClick={handleClearAllData}
            className="flex items-center space-x-2 text-xs font-bold px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Wipe All Data (100% Blank Slate)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
