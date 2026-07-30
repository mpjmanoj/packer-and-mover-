export type MoveType = 'within-city' | 'between-cities';

export type HouseType = '1 BHK' | '2 BHK' | '3 BHK' | 'Villa' | 'Office';

export type FloorLevel = 'Ground' | '1st' | '2nd' | '3rd' | '4th+';

export type InventoryCategory = 
  | 'Kitchen'
  | 'Bedroom'
  | 'Living Room'
  | 'Electronics'
  | 'Office Items'
  | 'Others';

export interface InventoryItemDef {
  id: string;
  name: string;
  category: InventoryCategory;
  iconName: string;
}

export interface BookingDetails {
  moveType: MoveType;
  fromCity: string;
  toCity: string;
  name: string;
  phone: string;
  email: string;
  movingDate: string;
  houseType: HouseType;
  currentFloor: FloorLevel;
  destFloor: FloorLevel;
  inventory: Record<string, number>;
}

export interface CostBreakdown {
  packing: number;
  loading: number;
  transport: number;
  gst: number;
  total: number;
  advance: number;
}

export interface Booking {
  id: string;
  createdAt: string;
  details: BookingDetails;
  cost: CostBreakdown;
  status: 'Confirmed' | 'In Transit' | 'Delivered' | 'Cancelled';
  paymentStatus: 'Paid Advance (₹500)' | 'Paid Full' | 'Pending';
  transactionId?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  moveType: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}
