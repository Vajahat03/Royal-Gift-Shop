import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Search, 
  Edit3, 
  Trash2,
  Phone, 
  Mail, 
  MapPin, 
  ShoppingBag, 
  DollarSign, 
  X,
  FileText
} from 'lucide-react';
import { useGiftShopStore } from '../../hooks/useStore';
import { Customer } from '../../types';

export function CustomersPage() {
  const { customers, orders, addCustomer, updateCustomer, deleteCustomer } = useGiftShopStore();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [selectedCustomerForHistory, setSelectedCustomerForHistory] = useState<Customer | null>(null);

  const handleDeleteCustomer = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete customer "${name}"?`)) {
      deleteCustomer(id);
      if (editingCustomer?.id === id) {
        setIsModalOpen(false);
        setEditingCustomer(null);
      }
    }
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    notes: ''
  });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
    (c.phone && c.phone.includes(search))
  );

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setFormData({ name: '', phone: '', email: '', address: '', notes: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Customer) => {
    setEditingCustomer(c);
    setFormData({
      name: c.name,
      phone: c.phone || '',
      email: c.email || '',
      address: c.address || '',
      notes: c.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingCustomer) {
      updateCustomer(editingCustomer.id, formData);
    } else {
      addCustomer(formData);
    }
    setIsModalOpen(false);
  };

  const customerOrders = selectedCustomerForHistory
    ? orders.filter(o => o.customer_id === selectedCustomerForHistory.id)
    : [];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-charcoal-900">Customer Management</h1>
          <p className="text-xs text-charcoal-800/70">
            Directory of boutique clients, order frequency, delivery locations, and purchase histories.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="group flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-charcoal-900 text-white font-bold text-xs shadow-soft hover:bg-lavender-600 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-gold-400 group-hover:rotate-90 transition-transform" />
          <span>+ Add New Customer</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-lavender-200/80 shadow-soft">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-charcoal-800/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customer by name, email or phone..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300"
          />
        </div>
      </div>

      {/* Customers Grid */}
      {filteredCustomers.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-lavender-200 p-12 text-center shadow-soft">
          <Users className="w-12 h-12 text-lavender-400 mx-auto mb-3 opacity-60" />
          <h2 className="text-base font-bold text-charcoal-900 font-display">No Customers Registered</h2>
          <p className="text-xs text-charcoal-800/70 max-w-sm mx-auto mt-1 mb-4">
            Fabricated client records were wiped for clean testing. Add a real customer or quick guest below:
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 bg-lavender-600 text-white text-xs font-bold rounded-2xl shadow-soft hover:bg-lavender-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
          >
            + Create First Customer
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map(customer => (
          <div 
            key={customer.id} 
            className="bg-white rounded-3xl border border-lavender-200/90 shadow-soft hover:shadow-soft-lg transition p-6 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-base font-bold font-display text-charcoal-900">{customer.name}</h2>
                  <span className="text-[10px] text-charcoal-800/50">Client since {new Date(customer.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleOpenEdit(customer)}
                    className="p-1.5 rounded-xl text-charcoal-800 hover:bg-lavender-100 transition"
                    title="Edit Customer"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-lavender-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteCustomer(customer.id, customer.name)}
                    className="p-1.5 rounded-xl text-charcoal-800 hover:bg-rose-50 hover:text-rose-600 transition"
                    title="Delete Customer"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                  </button>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-1.5 text-xs text-charcoal-800/80">
                {customer.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-3.5 h-3.5 text-lavender-600 flex-shrink-0" />
                    <span>{customer.phone}</span>
                  </div>
                )}
                {customer.email && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-3.5 h-3.5 text-lavender-600 flex-shrink-0" />
                    <span className="truncate">{customer.email}</span>
                  </div>
                )}
                {customer.address && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-3.5 h-3.5 text-lavender-600 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2">{customer.address}</span>
                  </div>
                )}
              </div>

              {customer.notes && (
                <div className="p-2.5 rounded-xl bg-cream-50 border border-lavender-100 text-[11px] text-charcoal-800/80 italic">
                  "{customer.notes}"
                </div>
              )}
            </div>

            {/* Customer Stats & Action */}
            <div className="pt-3 border-t border-lavender-100 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-charcoal-800/60 block">Lifetime Orders</span>
                <strong className="text-charcoal-900 font-mono">{customer.total_orders || 0} orders</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-charcoal-800/60 block">Total Spend</span>
                <strong className="text-emerald-700 font-mono">${(customer.total_spent || 0).toFixed(2)}</strong>
              </div>
              <button
                onClick={() => setSelectedCustomerForHistory(customer)}
                className="px-2.5 py-1.5 rounded-xl bg-lavender-100 hover:bg-lavender-200 text-lavender-700 font-semibold text-[11px] transition"
              >
                History
              </button>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Add / Edit Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-lavender-200 shadow-soft-lg space-y-4">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <h2 className="text-lg font-bold font-display text-charcoal-900">
                {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
              </h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Customer Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lavender-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-charcoal-800 block mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 555-0199"
                    className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-charcoal-800 block mb-1">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="client@domain.com"
                    className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Delivery / Residence Address</label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, Suite, City..."
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-charcoal-800 block mb-1">Preferences & Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Loves gold ribbons, birthday is in October"
                  className="w-full px-3 py-2 bg-cream-50 border border-lavender-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2 border-t border-lavender-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-charcoal-800 hover:bg-lavender-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-lavender-500 text-white font-semibold shadow-soft hover:bg-lavender-600 transition"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Purchase History Modal */}
      {selectedCustomerForHistory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/40 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-lg w-full border border-lavender-200 shadow-soft-lg space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-lavender-100 pb-3">
              <div>
                <h2 className="text-lg font-bold font-display text-charcoal-900">
                  {selectedCustomerForHistory.name}'s History
                </h2>
                <p className="text-[11px] text-charcoal-800/70">
                  Total spent: ${(selectedCustomerForHistory.total_spent || 0).toFixed(2)}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCustomerForHistory(null)}
                className="p-1 rounded-xl text-charcoal-800 hover:bg-lavender-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {customerOrders.length === 0 ? (
              <div className="text-center py-8 text-charcoal-800/60 text-xs">
                No orders recorded for this customer yet.
              </div>
            ) : (
              <div className="space-y-3">
                {customerOrders.map(order => (
                  <div key={order.id} className="p-3.5 rounded-2xl bg-cream-50 border border-lavender-100 text-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-charcoal-900">{order.order_number}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        order.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-charcoal-800/70">
                      Placed on: {new Date(order.order_date).toLocaleDateString()} • Total: ${order.total_amount.toFixed(2)}
                    </div>

                    <div className="pt-2 border-t border-lavender-100 text-[11px] space-y-1">
                      {order.items.map((oi, i) => (
                        <div key={i} className="flex justify-between">
                          <span>{oi.recipe?.name} (x{oi.quantity})</span>
                          <span className="font-mono">${oi.subtotal.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
