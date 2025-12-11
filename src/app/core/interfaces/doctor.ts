export interface Doctor {
    id?: number;
    firstName: string;
    lastName: string;
    employmentStart: string;
    professionalLicense: string;
    graduationInstitution: string;
    currentWorkplace: string;
    email: string;
    password: string;
    genderId: number;
}

export interface DoctorResponse {
    id?: number;
    firstName: string;
    lastName: string;
    employmentStart: string;
    professionalLicense: string;
    graduationInstitution: string;
    currentWorkplace: string;
    email: string;
}