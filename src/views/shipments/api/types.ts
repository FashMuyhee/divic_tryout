export interface Shipment {
  shippingId: string;
  destination: Address;
  origin: Address;
  phoneNo: string;
  status: ShipmentStatus;
}

type Address = {
  city: string;
  address: string;
};

export type ShipmentStatus = 'received' | 'error' | 'delivered' | 'on hold' | 'canceled';
