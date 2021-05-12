/* eslint-disable @typescript-eslint/naming-convention */
export interface HospitalData {
  available_capacity: number;
  date: string;
  min_age_limit: number;
  session_id: string;
  slots: any;
  sessions: any;
  vaccine: string;
  fee_type: string;
  eachSession: any;
}
export interface HospitalSlot {
  center_id: any;
  name: any;
  address: any;
  state_name: any;
  district_name: any;
  block_name: any;
  pincode: any;
  lat: any;
  long: any;
  from: any;
  to: any;
  fee_type: any;
  sessions: any;
}
