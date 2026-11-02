import { useEffect, useState, useSyncExternalStore } from 'react';
import { store } from '../services/store';

export function useGiftShopStore() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  return {
    materials: store.getMaterials(),
    balances: store.getBalances(),
    customers: store.getCustomers(),
    recipes: store.getRecipes(),
    orders: store.getOrders(),
    restocks: store.getRestocks(),
    movements: store.getMovements(),
    settings: store.getState().settings,
    
    // Actions
    addMaterial: store.addMaterial.bind(store),
    updateMaterial: store.updateMaterial.bind(store),
    deleteMaterial: store.deleteMaterial.bind(store),
    addCustomer: store.addCustomer.bind(store),
    updateCustomer: store.updateCustomer.bind(store),
    deleteCustomer: store.deleteCustomer.bind(store),
    addRecipe: store.addRecipe.bind(store),
    updateRecipe: store.updateRecipe.bind(store),
    deleteRecipe: store.deleteRecipe.bind(store),
    calculateRequiredMaterials: store.calculateRequiredMaterials.bind(store),
    createOrder: store.createOrder.bind(store),
    reserveOrderStock: store.reserveOrderStock.bind(store),
    releaseOrderReservation: store.releaseOrderReservation.bind(store),
    completeOrder: store.completeOrder.bind(store),
    createRestock: store.createRestock.bind(store),
    adjustInventory: store.adjustInventory.bind(store),
    recordMaterialReturn: store.recordMaterialReturn.bind(store),
    runSpecDepletionScenario: store.runSpecDepletionScenario.bind(store),
    resetToDemoDefaults: store.resetToDemoDefaults.bind(store),
    clearAllData: store.clearAllData.bind(store),
    resetToCleanTesting: store.resetToCleanTesting.bind(store),
    addSampleProduct: store.addSampleProduct.bind(store),
  };
}
