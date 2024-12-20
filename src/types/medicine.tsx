// Enum for Drug Category, matching Prisma's schema
export type DrugCategory = 'Antibiotic' | 'Painkiller' | 'Vitamin' | 'Antifungal' | 'Antiviral' | 'Select';

// Enum for Dosage Form, matching Prisma's schema
export type DosageForm = 'Tablet' | 'Capsule' | 'Liquid' | 'Ointment' | 'Injection' | 'Select';
type Float = number;

// Medicine interface reflecting the Prisma schema
export interface Medicine {
    id: string;
    medicineName: string;
    brandName: string;
    drugCategory: DrugCategory;
    dosageForm: DosageForm;
    strength: string;
    manufacturer: string;
    packSize: string;
    price: Float;
    routeOfAdministration: string;
    indications: string;
    sideEffects: string;
    contraindications: string;
    storageConditions: string;
    shelfLife: string;
    prescriptionReq: string;
    approvalInfo: string;
    barcodeSKU?: string;
    batchNumber: string;
    interactions: string;
    regulatoryApproval: string;
    countryOfOrigin: string;
    ndc: string;
    distributor: string;
    specialConsiderations: string;
    expiryDate: Date | null;
}

// Type for Medicine form input, used when creating or updating a medicine
export interface MedicineFormInput {
    [x: string]: any;
    medicineName: string;
    brandName: string;
    drugCategory: DrugCategory;
    dosageForm: DosageForm;
    strength: string;
    manufacturer: string;
    packSize: string;
    price: Float;
    routeOfAdministration: string;
    indications: string;
    sideEffects: string;
    contraindications: string;
    storageConditions: string;
    shelfLife: string;
    prescriptionReq: string;
    approvalInfo: string;
    barcodeSKU?: string;
    batchNumber: string;
    interactions: string;
    regulatoryApproval: string;
    countryOfOrigin: string;
    ndc: string;
    distributor: string;
    specialConsiderations: string;
    expiryDate: Date | null;
}
