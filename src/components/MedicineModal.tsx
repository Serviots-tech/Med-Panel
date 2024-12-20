import React from 'react';
import { Medicine } from '../types/medicine';
import { XMarkIcon } from '@heroicons/react/16/solid';

interface MedicineModalProps {
    medicine: Medicine | null;
    onClose: () => void;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ medicine, onClose }) => {
    if (!medicine) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-96 md:w-3/4 lg:w-3/4 xl:w-2/3 max-h-screen overflow-y-auto relative">
                {/* Close Button */}
                <button
                    className="absolute top-4 right-4 text-gray-500 text-xl"
                    onClick={onClose}
                >
                    <XMarkIcon className="h-5 w-5" text-gray-500 />

                </button>
                <h2 className="text-2xl font-bold mb-4 text-center">Medicine Details</h2>
                <hr className='mt-5 mb-5 ' />

                {/* Medicine Details in Horizontal Layout */}
                <div className="space-y-4">
                    {/* Row 1: Medicine Name, Brand Name, Price */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Medicine Name</span>
                            <span>{medicine.medicineName}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Brand Name</span>
                            <span>{medicine.brandName}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Price</span>
                            <span>{medicine.price}</span>
                        </div>
                    </div>

                    {/* Row 2: Drug Category, Dosage Form, Strength */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Drug Category</span>
                            <span>{medicine.drugCategory}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Dosage Form</span>
                            <span>{medicine.dosageForm}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Strength</span>
                            <span>{medicine.strength}</span>
                        </div>
                    </div>

                    {/* Row 3: Manufacturer, Pack Size, Route of Administration */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Manufacturer</span>
                            <span>{medicine.manufacturer}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Pack Size</span>
                            <span>{medicine.packSize}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Route of Administration</span>
                            <span>{medicine.routeOfAdministration}</span>
                        </div>
                    </div>

                    {/* Row 4: Indications, Side Effects, Contraindications */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Indications</span>
                            <span>{medicine.indications}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Side Effects</span>
                            <span>{medicine.sideEffects}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Contraindications</span>
                            <span>{medicine.contraindications}</span>
                        </div>
                    </div>

                    {/* Row 5: Storage Conditions, Shelf Life, Prescription Required */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Storage Conditions</span>
                            <span>{medicine.storageConditions}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Shelf Life</span>
                            <span>{medicine.shelfLife}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Prescription Required</span>
                            <span>{medicine.prescriptionReq}</span>
                        </div>
                    </div>

                    {/* Row 6: Approval Info, Barcode SKU, Batch Number */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Approval Info</span>
                            <span>{medicine.approvalInfo}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Barcode SKU</span>
                            <span>{medicine.barcodeSKU}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Batch Number</span>
                            <span>{medicine.batchNumber}</span>
                        </div>
                    </div>

                    {/* Row 7: Interactions, Regulatory Approval, Country of Origin */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Interactions</span>
                            <span>{medicine.interactions}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Regulatory Approval</span>
                            <span>{medicine.regulatoryApproval}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Country of Origin</span>
                            <span>{medicine.countryOfOrigin}</span>
                        </div>
                    </div>

                    {/* Row 8: NDC, Distributor, Special Considerations */}
                    <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">NDC</span>
                            <span>{medicine.ndc}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Distributor</span>
                            <span>{medicine.distributor}</span>
                        </div>
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Special Considerations</span>
                            <span>{medicine.specialConsiderations}</span>
                        </div>
                    </div>

                    {/* Row 9: Expiry Date */}
                    {/* <div className="flex justify-between">
                        <div className="flex flex-col w-1/3">
                            <span className="font-semibold">Expiry Date</span>
                            <span>{medicine.expiryDate}</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>


    );
};

export default MedicineModal;
