import { CouponType } from '@/config/enums';

export interface INestedObject {
  [key: string]: INestedObject | any;
}
export interface IMatchData {
  data: INestedObject;
  isLoading: boolean;
  isError?: any;
}

export interface IFixtureProps {
  status: string;
  fixtureId: string;
}

export interface ITabPanels {
  currentTab: number;
  index: number;
  content: JSX.Element;
}

export interface ITabItems {
  tab: string;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
  active: boolean;
  isWhite: boolean;
}

export interface ICountry {
  name: string;
}

export interface ILeague {
  id?: any;
  name: string;
  image_path: string;
  fixtures: Array<{
    league?: {
      country?: ICountry;
    };
    state?: {
      state: string;
    };
  }>;
  image: string;
}
export interface Score {
  description: string;
  score?: {
    participant: string;
    goals: number;
  };
}
export interface IMatch {
  id: string;
  state: { state: string; short_name: string };
  scores: Score;
  starting_at_timestamp: number;
  periods: Array<{
    minutes: string;
  }>;
  participants: Array<{
    minutes: string;
    meta: { location: string };

    short_code: string;
    image_path: string;
    name: string;
  }>;
}

export interface Coupon {
  id: string;
  name: string;
  type: CouponType;
  slug: string;
  amount?: string;
  code?: string;
}

export interface Address {
  customerName?: string;
  phoneNumber?: string;
  country?: string;
  state?: string;
  city?: string;
  zip?: string;
  street?: string;
}

export interface GoogleMapLocation {
  lat?: number;
  lng?: number;
  street_number?: string;
  route?: string;
  street_address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
  formattedAddress?: string;
}

export type ProductColor = {
  name?: string;
  code?: string;
};

export interface CartItem {
  id: number;
  name: string;
  slug?: string;
  description?: string;
  image: string;
  color?: ProductColor | null;
  price: number;
  salePrice?: number;
  quantity: number;
  size: number;
  stock?: number;
  discount?: number;
}

export type Product = {
  id: number;
  slug?: string;
  title: string;
  description?: string;
  price: number;
  sale_price?: number;
  thumbnail: string;
  colors?: ProductColor[];
  sizes?: number[];
  base64?: string;
};

export type PosProduct = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  salePrice: number;
  quantity: number;
  size: number;
  discount?: number;
  base64?: string;
};

export interface CalendarEvent {
  id?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  title: string;
  description?: string;
  location?: string;
}
