import { InventoryItemDef, InventoryCategory } from '../types';

export const INVENTORY_CATEGORIES: InventoryCategory[] = [
  'Kitchen',
  'Bedroom',
  'Living Room',
  'Electronics',
  'Office Items',
  'Others'
];

export const INVENTORY_ITEMS: InventoryItemDef[] = [
  // Kitchen
  { id: 'gas_stove', name: 'Gas Stove', category: 'Kitchen', iconName: 'Flame' },
  { id: 'mixer', name: 'Mixer / Grinder', category: 'Kitchen', iconName: 'Zap' },
  { id: 'microwave', name: 'Microwave Oven', category: 'Kitchen', iconName: 'Box' },
  { id: 'utensils', name: 'Utensil Box', category: 'Kitchen', iconName: 'Package' },
  { id: 'dining_table', name: 'Dining Table & Chairs', category: 'Kitchen', iconName: 'Utensils' },
  { id: 'fridge', name: 'Refrigerator', category: 'Kitchen', iconName: 'Refrigerator' },

  // Bedroom
  { id: 'bed', name: 'Bed Frame (King/Queen)', category: 'Bedroom', iconName: 'Bed' },
  { id: 'mattress', name: 'Mattress', category: 'Bedroom', iconName: 'Layers' },
  { id: 'wardrobe', name: 'Wardrobe / Almirah', category: 'Bedroom', iconName: 'DoorClosed' },
  { id: 'study_table', name: 'Study / Computer Table', category: 'Bedroom', iconName: 'Laptop' },
  { id: 'tv_unit', name: 'TV Unit Cabinet', category: 'Bedroom', iconName: 'Tv' },

  // Living Room
  { id: 'sofa', name: 'Sofa Set (3+1+1)', category: 'Living Room', iconName: 'Armchair' },
  { id: 'center_table', name: 'Center Table / Teapoy', category: 'Living Room', iconName: 'Square' },
  { id: 'living_tv', name: 'Living Room TV', category: 'Living Room', iconName: 'Tv' },
  { id: 'chair', name: 'Recliner / Accent Chair', category: 'Living Room', iconName: 'Armchair' },
  { id: 'showcase', name: 'Showcase / Crockery Unit', category: 'Living Room', iconName: 'Grid' },

  // Electronics
  { id: 'led_tv', name: 'LED / Smart TV (55"+)', category: 'Electronics', iconName: 'Tv' },
  { id: 'washing_machine', name: 'Washing Machine', category: 'Electronics', iconName: 'Wind' },
  { id: 'ac', name: 'Air Conditioner (Split/Window)', category: 'Electronics', iconName: 'Sun' },
  { id: 'desktop_computer', name: 'Desktop PC & Monitor', category: 'Electronics', iconName: 'Monitor' },
  { id: 'laptop', name: 'Laptop Bag / Stand', category: 'Electronics', iconName: 'Laptop' },
  { id: 'printer', name: 'Printer / Scanner', category: 'Electronics', iconName: 'Printer' },

  // Office Items
  { id: 'office_chair', name: 'Ergonomic Office Chair', category: 'Office Items', iconName: 'Armchair' },
  { id: 'office_table', name: 'Executive Office Desk', category: 'Office Items', iconName: 'Layout' },
  { id: 'documents_box', name: 'Document Archives Box', category: 'Office Items', iconName: 'FileText' },
  { id: 'office_computers', name: 'Workstation PCs', category: 'Office Items', iconName: 'Cpu' },
  { id: 'office_boxes', name: 'Standard Moving Box', category: 'Office Items', iconName: 'Package' },

  // Others
  { id: 'bike', name: 'Motorcycle / Bike', category: 'Others', iconName: 'Bike' },
  { id: 'scooter', name: 'Scooter / Scooty', category: 'Others', iconName: 'Bike' },
  { id: 'plants', name: 'Garden Pots & Plants', category: 'Others', iconName: 'Flower2' },
  { id: 'cycles', name: 'Bicycle / Kids Cycle', category: 'Others', iconName: 'Bike' },
  { id: 'suitcases', name: 'Luggage / Suitcases', category: 'Others', iconName: 'Briefcase' }
];
