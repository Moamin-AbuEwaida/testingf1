export interface Driver {
  driver_number: number;
  broadcast_name: string;
  full_name: string;
  name_acronym: string;
  team_name: string;
  team_colour: string;
  first_name: string;
  last_name: string;
  headshot_url: string | null;
  country_code: string;
  session_key: number;
  meeting_key: number;
}

export interface Meeting {
  meeting_key: number;
  meeting_name: string;
  meeting_official_name: string;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  country_flag: string;
  circuit_key: number;
  circuit_short_name: string;
  circuit_type: string;
  circuit_info_url: string;
  circuit_image: string;
  gmt_offset: string;
  date_start: string;
  date_end: string;
  year: number;
  is_cancelled: boolean;
}

export interface Session {
  session_key: number;
  session_name: string;
  date_start: string;
  date_end: string;
  gmt_offset: string;
  session_type: string;
  meeting_key: number;
  location: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  year: number;
}

export interface Position {
  session_key: number;
  meeting_key: number;
  driver_number: number;
  date: string;
  position: number;
}

export interface Lap {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  i1_speed: number;
  i2_speed: number;
  st_speed: number;
  date_start: string;
  lap_duration: number;
  is_pit_out_lap: boolean;
  duration_sector_1: number;
  duration_sector_2: number;
  duration_sector_3: number;
  segments_sector_1: number[];
  segments_sector_2: number[];
  segments_sector_3: number[];
  lap_number: number;
}

export interface CarData {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  date: string;
  rpm: number;
  speed: number;
  n_gear: number;
  throttle: number;
  drs: number;
  brake: number;
}

export interface ChampionshipDriver {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  position_start: number;
  position_current: number;
  points_start: number;
  points_current: number;
}

export interface ChampionshipTeam {
  meeting_key: number;
  session_key: number;
  team_name: string;
  position_start: number;
  position_current: number;
  points_start: number;
  points_current: number;
}
