import { Booking } from '../types';

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'HPM-2026-9482',
    createdAt: '2026-07-29T10:30:00Z',
    details: {
      moveType: 'between-cities',
      fromCity: 'Hassan',
      toCity: 'Bengaluru',
      name: 'Ramesh Gowda',
      phone: '+91 98450 12345',
      email: 'ramesh.gowda@gmail.com',
      movingDate: '2026-08-05',
      houseType: '2 BHK',
      currentFloor: '1st',
      destFloor: '2nd',
      inventory: {
        sofa: 1,
        bed: 2,
        fridge: 1,
        led_tv: 1,
        washing_machine: 1,
        dining_table: 1,
        utensils: 4,
        office_boxes: 8
      }
    },
    cost: {
      packing: 3500,
      loading: 2400,
      transport: 7500,
      gst: 2412,
      total: 15812,
      advance: 500
    },
    status: 'Confirmed',
    paymentStatus: 'Paid Advance (₹500)',
    transactionId: 'pay_P89324h8x2391'
  },
  {
    id: 'HPM-2026-9481',
    createdAt: '2026-07-28T14:15:00Z',
    details: {
      moveType: 'within-city',
      fromCity: 'Vidya Nagar, Hassan',
      toCity: 'BM Road, Hassan',
      name: 'Dr. Ananya Shetty',
      phone: '+91 99001 88421',
      email: 'dr.ananya@shettyclinic.in',
      movingDate: '2026-08-01',
      houseType: '3 BHK',
      currentFloor: 'Ground',
      destFloor: '1st',
      inventory: {
        sofa: 1,
        bed: 3,
        wardrobe: 2,
        fridge: 1,
        ac: 2,
        plants: 6,
        suitcases: 4
      }
    },
    cost: {
      packing: 4200,
      loading: 2800,
      transport: 3000,
      gst: 1800,
      total: 11800,
      advance: 500
    },
    status: 'In Transit',
    paymentStatus: 'Paid Advance (₹500)',
    transactionId: 'pay_P77123j9y4401'
  },
  {
    id: 'HPM-2026-9479',
    createdAt: '2026-07-26T09:00:00Z',
    details: {
      moveType: 'between-cities',
      fromCity: 'Hassan',
      toCity: 'Mysuru',
      name: 'Venkatesh Prasad',
      phone: '+91 97412 55900',
      email: 'venky.prasad@outlook.com',
      movingDate: '2026-07-29',
      houseType: '1 BHK',
      currentFloor: '2nd',
      destFloor: 'Ground',
      inventory: {
        bed: 1,
        sofa: 1,
        bike: 1,
        fridge: 1,
        laptop: 1
      }
    },
    cost: {
      packing: 2200,
      loading: 1800,
      transport: 4500,
      gst: 1530,
      total: 10030,
      advance: 500
    },
    status: 'Delivered',
    paymentStatus: 'Paid Full',
    transactionId: 'pay_P55432x1z9920'
  }
];
