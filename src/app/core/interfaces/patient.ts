export interface Patient {
    id?: number;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    entryDate: string;
    emergencyNumber: string; // Cambiado a string para coincidir con la API
    genderId: number;
    statusId: number;
    allergies: Allergy[];
    diseases: Disease[]; 
    medicalHistories: MedicalHistory[];
}

export interface MedicalHistory {
    name: string;
    detectionDate: Date | null;
    historyTypesId: number;
}

export interface Disease {
    name: string;
    actualStateId: number;
}

export interface Allergy {
    name: string;
    allergicReaction: string;
}

export interface PatientResponse {
    success: boolean,
    message: string,
    patient: Patient;
    patients?: Patient[];
}


