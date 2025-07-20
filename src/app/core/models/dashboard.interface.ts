// Base item interface
export interface BaseItem {
  type: 'device' | 'sensor';
  icon: string;
  label: string;
}

// Device interface
export interface Device extends BaseItem {
  type: 'device';
  state: boolean;
}

// Sensor interface
export interface Sensor extends BaseItem {
  type: 'sensor';
  value: {
    amount: number;
    unit: string;
  };
}

// Card interface
export interface Card {
  id: string;
  title: string;
  layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout';
  items: (Device | Sensor)[];
}

// Tab interface
export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

// Dashboard data
export interface DashboardData {
  tabs: Tab[];
}
