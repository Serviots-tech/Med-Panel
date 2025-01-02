// Enum for Drug Category, matching Prisma's schema
export type DrugCategory = 'Antibiotic' | 'Painkiller' | 'Vitamin' | 'Antifungal' | 'Antiviral' | 'Select';

// Enum for Dosage Form, matching Prisma's schema
type Float = number;

export type PrescriptionReq = "YES" | "NO" | "Select";

export type ApprovalInfo = "FDA" | "EMA" | "Select"


// Medicine interface reflecting the Prisma schema
export interface Medicine {
    id: string;
    medicineName: string;
    brandName: string;
    productType: string;
    drugCategory: string;
    doseFormId: string;
    strength: string;
    manufacturer: string;
    packSize: string;
    price: Float;
    routeOfAdministration: string;
    TherapeuticClass: string;
    indications: string;
    sideEffects: string;
    contraindications: string;
    storageConditions: string;
    shelfLife: string;
    prescriptionReq: string;
    approvalInfo: string;
    barcodeSKU: string; // unique
    batchNumber: string;
    interactions: string;
    countryOfOrigin: string;
    ndc: string;
    distributor: string;
    specialConsiderations: string;
    image?:string;
    scheduleType:string;
    gstPercentage:number
    // expiryDate: Date | null;
}

// Type for Medicine form input, used when creating or updating a medicine
export interface MedicineFormInput {
    id?:string;
    medicineName: string;
    brandName: string;
    productType: string;
    drugCategory: string;
    doseFormId: string;
    strength: string;
    manufacturer: string;
    packSize: string;
    price: Float;
    routeOfAdministration: string;
    TherapeuticClass: string;
    indications: string;
    sideEffects: string;
    contraindications: string;
    storageConditions: string;
    shelfLife: string;
    prescriptionReq: string;
    approvalInfo: string;
    barcodeSKU: string;
    batchNumber: string;
    interactions: string;
    countryOfOrigin: string;
    ndc: string;
    distributor: string;
    specialConsiderations: string;
    image?:string;
    scheduleType:string;
    gstPercentage:number

    // expiryDate: Date | null;
}
