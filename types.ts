
export type Gender = 'male' | 'female' | 'other';
export type VerificationStatus = 'pending' | 'verified' | 'rejected';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  password?: string; // Optional for security if needed, but keeping it for this demo
  gender: Gender;
  age: number;
  casteEthnicity: string;
  district: string;
  countryResidence: string;
  occupation: string;
  education: string;
  height: string;
  recentPhotoURL: string;
  citizenshipPhotoURL: string;
  paymentScreenshotURL: string;
  isPaid: boolean;
  paymentMethod?: string;
  preferredPartnerGender: Gender;
  preferredAgeRange: string;
  preferredCasteCommunity: string;
  preferredCountry: string;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  registrationDate: string;
  bio?: string;
  phone?: string;
}

export interface MatchResult extends UserProfile {
  score: number;
}
