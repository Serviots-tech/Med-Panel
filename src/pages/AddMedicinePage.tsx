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
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { hasFormError, validateFormData } from '../helpers/utils';
import { Loader } from '../components/Loader';

const AddMedicinePage: React.FC = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState<any>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    console.log("🚀 ~ fileList:", fileList)
    // const [hasError, setHasError] = useState(false);
    // const [documentName, setDocumentName] = useState('');
    // const [isSubmitClick, setIsSubmitClick] = useState(false);

    // Step 1: Define the state for form data
    const [formData, setFormData] = useState<MedicineFormInput>({
        medicineName: '',
        brandName: '',
        GenericName: '',
        drugCategory: '',
        dosageForm: '',
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
        prescriptionReq: '',
        approvalInfo: '',
        barcodeSKU: '',
        batchNumber: '',
        interactions: '',
        countryOfOrigin: '',
        ndc: '',
        distributor: '',
        specialConsiderations: '',
        scheduleType:'',
        gstPercentage:0
        // expiryDate: null,
    });

    const [formError, setFormError] = useState<any>({
        medicineName: false,
        brandName: false,
        GenericName: false,
        drugCategory: false,
        dosageForm: false,
        strength: false,
        manufacturer: false,
        packSize: false,
        price: false,
        routeOfAdministration: false,
        TherapeuticClass: false,
        indications: false,
        sideEffects: false,
        contraindications: false,
        storageConditions: false,
        shelfLife: false,
        prescriptionReq: false,
        approvalInfo: false,
        barcodeSKU: false,
        batchNumber: false,
        interactions: false,
        countryOfOrigin: false,
        ndc: false,
        distributor: false,
        specialConsiderations: false,
        scheduleType:false,
        gstPercentage:false
        // expiryDate: null,
    });

    const [isSubmitFormLoading, setIsSubmitFormLoading] = useState(false)


    // Store validation errors
    // const [errors, setErrors] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(false);

    // Fetch existing medicine data if id is provided
    useEffect(() => {
        if (id) {
            const fetchMedicine = async () => {

                try {
                    setLoading(true); // Start loading
                    const response = await getMedicineById(id);
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


    // Step 3: Handle form submission
    const handleSubmit = async () => {

        // e.preventDefault();
        const checkFormError = validateFormData(
			{
				...formData,
			},
			{ ...formError }
		);
		// checkFormError = {
		// 	...checkFormError,
		// 	employeeTPIN: !/^\d{10}$/.test(taxationDetails.employeeTPIN),
		// };

		setFormError(checkFormError);

		if (hasFormError(checkFormError)) {
			return;
		} else {


        try {

            const finalData = new FormData();

            setIsSubmitFormLoading(true)
            // Ensure price is a valid number (float)
            if (formData?.price) {
                formData.price = parseFloat(formData.price.toString()); // Convert string to float
            }

            // Handle any invalid price (NaN or non-numeric)
            if (isNaN(formData?.price)) {
                formData.price = 0;
            }

            if(!(formData?.image as any)?.length && fileList.length < 3){
                toast.error("upload minimum 3 images")
                return
            }

            for (const [key, value] of Object.entries(formData)) {
                finalData.append(key, value);
            }


            fileList.forEach((file) => {
                finalData.append('files', file.originFileObj);
            });
            // finalData.append('files', file);

            // Remove the `id` field from the form data if it's included
            const { id } = formData;

            if (id) {
                // Update existing medicine
                await updateMedicine(id, finalData);
            } else {
                // Add new medicine
                await createMedicine(finalData);
            }
            // Redirect to the medicines list page after the operation
            navigate('/');

            if (loading) {
                return <Loader/>;
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
                scheduleType:'',
                gstPercentage:0
                // expiryDate: null,
            });

        } catch (error) {
            console.error("Error submitting the form:", error);
            toast.error('Error adding medicine');
        }
        finally {
            setIsSubmitFormLoading(false)
        }
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
                formError={formError}
                setFormError={setFormError}
                formData={formData}
                setFormData={setFormData}
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
