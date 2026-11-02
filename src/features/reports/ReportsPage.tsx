import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Download, 
  DollarSign, 
  Package, 
  Users, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  CartesianGrid 
} from 'recharts';

export function ReportsPage() {
  const { materials, balances, orders, customers, movements, restocks } = useGiftShopStore();

  const [dateRange, setDateRange] = useState('All Time');

  // 1. Material Consumption Calculation from movements
  const consumptionByMaterial = materials.map(mat => {
    const consumed = movements
      .filter(m => m.material_id === mat.id && m.movement_type === 'production_consumption')
      .reduce((sum, m) => sum + Math.abs(m.quantity), 0);

    const restocked = movements
      .filter(m => m.material_id === mat.id && (m.movement_type === 'restock' || m.movement_type === 'initial_stock'))
      .reduce((sum, m) => sum + m.quantity, 0);

    return {
      name: mat.name,
      consumed,
      restocked,
      unit: mat.unit
    };
  });

  // 2. Inventory Valuation Breakdown
  const valuationByCategory = materials.reduce((acc: any, mat) => {
    const bal = balances.find(b => b.material_id === mat.id);
    const value = (bal ? bal.physical_quantity : 0) * mat.unit_cost;
    acc[mat.category] = (acc[mat.category] || 0) + value;
    return acc;
  }, {});

  const pieData = Object.keys(valuationByCategory).map(cat => ({
    name: cat,
    value: Number(valuationByCategory[cat].toFixed(2))
  }));

  const PIE_COLORS = ['#8873B5', '#C9B8E8', '#F5C9D6', '#C9A66B', '#5A8A62'];

  // 3. Customer Top Spenders
  const topCustomers = [...customers]
    .sort((a, b) => (b.total_spent || 0) - (a.total_spent || 0))
    .slice(0, 5);

  const totalSalesRevenue = orders
    .filter(o => o.status === 'completed')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const exportCSV = () => {
    const rows = [
      ['Material', 'Category', 'Physical Stock', 'Reserved Stock', 'Available Stock', 'Unit Cost', 'Total Valuation'],
      ...balances.map(b => {
        const m = materials.find(mat => mat.id === b.material_id);
        const val = b.physical_quantity * (m?.unit_cost || 0);
        return [
          m?.name || '',
          m?.category || '',
          b.physical_quantity,
          b.reserved_quantity,
          b.available_quantity,
          m?.unit_cost || 0,
          val.toFixed(2)
        ];
      })
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `petite_maison_inventory_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">Reports & Business Analytics</h1>
          <p className="text-xs text-charcoal-800/70">
            Real-time material consumption, sales revenue breakdown, and inventory valuation metrics.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center space-x-2 px-4 py-2.5 rounded-2xl bg-charcoal-900 text-white font-semibold text-xs shadow-soft hover:bg-lavender-700 transition"
        >
          <Download className="w-4 h-4 text-gold-300" />
          <span>Export Inventory CSV</span>
        </button>
      </div>

      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-800/70 block mb-1">Total Sales Revenue</span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            ${totalSalesRevenue.toFixed(2)}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            From {orders.filter(o => o.status === 'completed').length} completed orders
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-800/70 block mb-1">Restocking Spend</span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            ${restocks.reduce((sum, r) => sum + r.total_cost, 0).toFixed(2)}
          </div>
          <span className="text-[11px] text-lavender-700 font-semibold mt-1 block">
            Across {restocks.length} supplier shipments
          </span>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <span className="text-xs font-semibold text-charcoal-800/70 block mb-1">Total Ledger Movements</span>
          <div className="text-3xl font-display font-bold text-charcoal-900">
            {movements.length} <span className="text-sm font-normal text-charcoal-800/60">entries</span>
          </div>
          <span className="text-[11px] text-charcoal-800/70 mt-1 block">
            100% complete audit trail
          </span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Material Consumption vs Restocking Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">Material Usage vs Restock</h2>
              <p className="text-xs text-charcoal-800/70">Historical consumption vs total replenishments</p>
            </div>
            <BarChart3 className="w-4 h-4 text-lavender-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={consumptionByMaterial} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip 
                  formatter={(val: any, name: any) => [`${val} units`, name === 'consumed' ? 'Total Consumed' : 'Total Restocked']}
                  contentStyle={{ backgroundColor: '#FFF9F2', borderRadius: '12px', border: '1px solid #C9B8E8' }}
                />
                <Bar dataKey="consumed" name="Consumed" fill="#E06D8A" radius={[6, 6, 0, 0]} />
                <Bar dataKey="restocked" name="Restocked" fill="#8873B5" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Valuation by Category Pie Chart */}
        <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-charcoal-900 font-display">Inventory Value By Category</h2>
              <p className="text-xs text-charcoal-800/70">Current capital held in physical raw materials</p>
            </div>
            <PieIcon className="w-4 h-4 text-lavender-600" />
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            {pieData.length === 0 ? (
              <span className="text-xs text-charcoal-800/60">No inventory valuation data</span>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={45}
                    paddingAngle={4}
                    label={({ name, percent }: any) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(val: any) => [`$${val}`, 'Value']}
                    contentStyle={{ backgroundColor: '#FFF9F2', borderRadius: '12px', border: '1px solid #C9B8E8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Top Customer Leaderboard */}
      <div className="bg-white p-6 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-charcoal-900 font-display">Top Boutique Clients</h2>
            <p className="text-xs text-charcoal-800/70">Highest spending customers by lifetime completed order volume</p>
          </div>
          <Users className="w-4 h-4 text-lavender-600" />
        </div>

        <div className="space-y-3">
          {topCustomers.map((cust, idx) => (
            <div key={cust.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-cream-50 border border-lavender-100 text-xs">
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-lavender-200 text-lavender-800 font-bold flex items-center justify-center text-xs">
                  {idx + 1}
                </span>
                <div>
                  <strong className="text-charcoal-900 block">{cust.name}</strong>
                  <span className="text-[11px] text-charcoal-800/60">{cust.phone || cust.email}</span>
                </div>
              </div>

              <div className="text-right">
                <strong className="text-emerald-700 font-mono text-sm block">${(cust.total_spent || 0).toFixed(2)}</strong>
                <span className="text-[10px] text-charcoal-800/60">{cust.total_orders || 0} orders</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
