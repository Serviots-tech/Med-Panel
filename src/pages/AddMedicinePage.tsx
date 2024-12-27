/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { MedicineForm } from '../components/MedicineForm';
import { MedicineFormInput } from '../types/medicine'; // import your types
import {
     createMedicine,
     getMedicineById, 
    updateMedicine 
} from '../services/medicine';
import { toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

const AddMedicinePage: React.FC = () => {

    const { id } = useParams();
    // const navigate = useNavigate();

    const [file, setFile] = useState<any>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    // const [hasError, setHasError] = useState(false);
    // const [documentName, setDocumentName] = useState('');
    // const [isSubmitClick, setIsSubmitClick] = useState(false);

    // Step 1: Define the state for form data
    const [formData, setFormData] = useState<MedicineFormInput>({
        medicineName: '',
        brandName: '',
        GenericName: '',
        drugCategory: 'Select',
        dosageForm: 'Select',
        strength: '',
        manufacturer: '',
        packSize: '',
        price: 0,
        routeOfAdministration: '',
        TherapeuticClass: '',
        indications: '',
        sideEffects: '',
        contraindications: '',
        storageConditions: '',
        shelfLife: '',
        prescriptionReq: 'Select',
        approvalInfo: 'Select',
        barcodeSKU: '',
        batchNumber: '',
        interactions: '',
        countryOfOrigin: '',
        ndc: '',
        distributor: '',
        specialConsiderations: '',
        // expiryDate: null,
    });

    const [isSubmitFormLoading, setIsSubmitFormLoading] = useState(false)


    // Store validation errors
    const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch existing medicine data if id is provided
    useEffect(() => {
        if (id) {
            const fetchMedicine = async () => {

                try {
                    setLoading(true); // Start loading
                    const response = await getMedicineById(id);
                    console.log("🚀 ~ fetchMedicine ~ response:", response)
                    if (response) {
                        setFormData(response?.data);
                    }
                } catch (e: any) {
                    console.log("🚀 ~ fetchMedicine ~ e:", e)

                }
                finally {
                    setLoading(false); // Stop loading
                }
            };
            fetchMedicine();
        }
    }, [id]);

    // Step 2: Handle form data changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = (): boolean => {
        const newErrors: any = {};
        let isValid = true;

        // Required Fields Validation
        if (!formData.medicineName.trim()) {
            newErrors.medicineName = 'Medicine name is required';
            isValid = false;
        }

        if (!formData.brandName.trim()) {
            newErrors.brandName = 'Brand name is required';
            isValid = false;
        }

        if (!formData.GenericName.trim()) {
            newErrors.GenericName = 'Brand name is required';
            isValid = false;
        }

        if (!formData.strength.trim()) {
            newErrors.strength = 'Strength is required';
            isValid = false;
        }

        if (!formData.manufacturer.trim()) {
            newErrors.manufacturer = 'Manufacturer is required';
            isValid = false;
        }

        if (!formData.packSize.trim()) {
            newErrors.packSize = 'Pack size is required';
            isValid = false;
        }

        if (formData.price <= 0 || isNaN(formData.price)) {
            newErrors.price = 'Price must be greater than 0 and a valid number';
            isValid = false;
        }

        if (!formData.routeOfAdministration.trim()) {
            newErrors.routeOfAdministration = 'Route of administration is required';
            isValid = false;
        }

        if (!formData.shelfLife.trim()) {
            newErrors.shelfLife = 'Shelf life is required';
            isValid = false;
        }

        if (!formData.indications.trim()) {
            newErrors.indications = 'Indications are required';
            isValid = false;
        }

        if (!formData.sideEffects.trim()) {
            newErrors.sideEffects = 'Side effects are required';
            isValid = false;
        }

        if (!formData.contraindications.trim()) {
            newErrors.contraindications = 'Contraindications are required';
            isValid = false;
        }

        if (!formData.storageConditions.trim()) {
            newErrors.storageConditions = 'Storage conditions are required';
            isValid = false;
        }

        if (!formData.batchNumber.trim()) {
            newErrors.batchNumber = 'Batch number is required';
            isValid = false;
        }

        if (!formData.interactions.trim()) {
            newErrors.interactions = 'Interactions are required';
            isValid = false;
        }

        if (!formData.countryOfOrigin.trim()) {
            newErrors.countryOfOrigin = 'Country of origin is required';
            isValid = false;
        }

        if (!formData.ndc.trim()) {
            newErrors.ndc = 'NDC is required';
            isValid = false;
        }

        if (!formData.distributor.trim()) {
            newErrors.distributor = 'Distributor is required';
            isValid = false;
        }

        // Optional Fields Validation
        if (formData.barcodeSKU && formData.barcodeSKU.trim().length === 0) {
            newErrors.barcodeSKU = 'Barcode SKU must be valid if provided';
            isValid = false;
        }

        if (formData.specialConsiderations && formData.specialConsiderations.trim().length === 0) {
            newErrors.specialConsiderations = 'Special considerations must be valid if provided';
            isValid = false;
        }

        // Dropdown Selections Validation
        if (formData.drugCategory === 'Select') {
            newErrors.drugCategory = 'Drug category is required';
            isValid = false;
        }

        if (formData.dosageForm === 'Select') {
            newErrors.dosageForm = 'Dosage form is required';
            isValid = false;
        }

        if (formData.prescriptionReq === 'Select') {
            newErrors.prescriptionReq = 'Prescription Requirement form is required';
            isValid = false;
        }

        if (formData.approvalInfo === 'Select') {
            newErrors.approvalInfo = 'Approval information is required';
            isValid = false;
        }


        setErrors(newErrors);
        return isValid;
    };

    // Step 3: Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        // Validate the form before submitting
        if (!validateForm()) {
            return;
        }

        try {

            const finalData = new FormData();
            
            console.log("🚀 ~ handleSubmit ~ finalData:", finalData)
            setIsSubmitFormLoading(true)
            // Ensure price is a valid number (float)
            if (formData.price) {
                formData.price = parseFloat(formData.price.toString()); // Convert string to float
            }

            // Handle any invalid price (NaN or non-numeric)
            if (isNaN(formData.price)) {
                formData.price = 0;
            }

            for (const [key, value] of Object.entries(formData)) {
                finalData.append(key, value);
            }

            finalData.append('file', file);

            // Remove the `id` field from the form data if it's included
            const { id, ...dataToSubmit } = formData;

            if (id) {
                // Update existing medicine
                await updateMedicine(id, dataToSubmit);
            } else {
                // Add new medicine
                await createMedicine(finalData);
            }
            // Redirect to the medicines list page after the operation
            // navigate('/');

            if (loading) {
                return <div>Loading...</div>;
            }

            // Reset the form after successful submission
            setFormData({
                medicineName: '',
                brandName: '',
                GenericName: '',
                drugCategory: 'Select',
                dosageForm: 'Select',
                strength: '',
                manufacturer: '',
                packSize: '',
                price: 0,
                routeOfAdministration: '',
                TherapeuticClass: '',
                indications: '',
                sideEffects: '',
                contraindications: '',
                storageConditions: '',
                shelfLife: '',
                prescriptionReq: 'Select',
                approvalInfo: 'Select',
                barcodeSKU: '',
                batchNumber: '',
                interactions: '',
                countryOfOrigin: '',
                ndc: '',
                distributor: '',
                specialConsiderations: '',
                // expiryDate: null,
            });

        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error('Error adding medicine');
        }
        finally {
            setIsSubmitFormLoading(false)
        }
    };


    // const handleSubmit = async () => {
    //     setIsSubmitClick(true);
    //     let _documentName = documentName.trim();
    //     if (invalidText(documentName)) {
    //         setHasError(true);
    //         return;
    //     }
    //     _documentName = _documentName.replace(/ /g, '_');
    //     if (!file) {
    //         return;
    //     }
    //     try {
    //         setIsLoading(true);
    //         let formData = new FormData();
    //         formData.append('documentName', _documentName);
    //         formData.append('employeeId', employeeId);
    //         formData.append('file', file);
    //         await employeeApi.uploadEmployeeDocument(formData);
    //         // await postApi('/employee/upload-docs', formData, true);
    //         fetchDocumentData();

    //     } catch (error: any) {
    //         const message = error?.response?.data?.error?.description || 'Something went wrong in upload document';
    //         toastText(message, 'error');
    //     } finally {
    //         setIsLoading(false);
    //         handleModalCancel()
    //     }
    // };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-2 mt-2">
                <Link to={'/'}>
                    <button
                        className=" text-gray rounded-lg flex items-center justify-center"
                    >
                        <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    </button>
                </Link>
                {id ? 'Edit' : 'Add'} Medicine</h1>
            <hr />
            {/* Step 4: Pass formData and handlers to the MedicineForm component */}
            <MedicineForm
                errors={errors}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                isLoading={loading}
                isSubmitFormLoading={isSubmitFormLoading}
                setFileList={setFileList}
                fileList={fileList}
                file={file}
                setFile={setFile}
            />
        </div>
    );
};

export default AddMedicinePage;
