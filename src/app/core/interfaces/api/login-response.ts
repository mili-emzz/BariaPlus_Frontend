export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  doctor: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    professionalLicenseNumber: string;
  }
}
