// Core database entity types
export interface Cabin {
  id: number;
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: string;
  created_at: string;
}

export interface Guest {
  id: number;
  fullName: string;
  email: string;
  nationality: string;
  nationalID: string;
  countryFlag: string;
  country?: string;
  created_at: string;
}

export interface Booking {
  id: number;
  startDate: string;
  endDate: string;
  numNights: number;
  numGuests: number;
  cabinPrice: number;
  extrasPrice: number;
  totalPrice: number;
  status: "unconfirmed" | "checked-in" | "checked-out";
  hasBreakfast: boolean;
  isPaid: boolean;
  observations?: string;
  cabinId: number;
  guestId: number;
  created_at: string;
}

export interface Settings {
  id: number;
  minBookingLength: number;
  maxBookingLength: number;
  maxNumberOfGuestPerBooking: number;
  breakfastPrice: number;
}

// Related entities with joins
export interface BookingWithGuest extends Booking {
  guests: Pick<Guest, "fullName" | "email" | "nationality" | "countryFlag">;
}

export interface BookingWithCabin extends Booking {
  cabins: Pick<Cabin, "name" | "maxCapacity">;
}

export interface BookingWithGuestAndCabin extends Booking {
  guests: Guest;
  cabins: Cabin;
}