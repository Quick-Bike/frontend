export interface BookedSlot {
  pickUpDate: string;
  pickUpTime: string;
  dropOffDate: string;
  dropOffTime: string;
}

export interface Vehicle {
  _id: string;
  id: string;
  image: string;
  name: string;
  type: string;
  details: string;
  price: number;
  oldPrice: number;
  bookedSlots: BookedSlot[];
  availableFrom?: string | null;
}
export interface VehicleState {
  all: Vehicle[];
  filtered: Vehicle[];
  loader: boolean;
  availableBikes: Vehicle[];
}
