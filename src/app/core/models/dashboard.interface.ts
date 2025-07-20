// Base item interface
export interface BaseItem {
  type: 'device' | 'sensor';
  icon: string;
  label: string;
}

export interface Device {
  type: 'device';
  label: string;
  state: boolean;
  icon: string;
}

export interface Sensor {
  type: 'sensor';
  label: string;
  value: string;
  unit: string;
  icon: string;
}

export type CardItem = Device | Sensor;

export interface Card {
  id: string;
  title: string;
  layout: 'verticalLayout' | 'horizontalLayout' | 'singleDevice';
  items: CardItem[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface DashboardData {
  tabs: Tab[];
}
