/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { MedicineFormInput } from '../types/medicine';
import { Button, Col, Row, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import InputField from './InputField';
import { invalidText, validateFormData } from '../helpers/utils';
import SelectDropdown from './SelectDropdown';
import { Image } from 'antd';
import { configData } from '../helpers/config';
import { countries } from "countries-list";
import { Loader } from './Loader';

interface MedicineFormProps {
    formData: MedicineFormInput;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    formError: any;
    setFormError: any
    isSubmitFormLoading: boolean;
    isLoading: boolean;
    doseFormData: any;
    fileList: any;
    setFileList: any;
    setFormData: any
}

export const MedicineForm: React.FC<MedicineFormProps> = ({ formData, setFormData, handleChange, handleSubmit, formError, setFormError, isSubmitFormLoading, isLoading, doseFormData, fileList, setFileList }) => {


    let isRemoving = false;
    const [hasError, setHasError] = useState(false);

    // const propsUpload = {
    //     name: 'file',
    //     accept: '.jpg,.jpeg,.png',
    //     maxCount: 4,
    //     fileList: fileList,
    //     beforeUpload: (file: any) => {
    //         return false; // Prevent automatic upload
    //     },
    //     onChange(info: any) {
    //         const { file, fileList: newFileList } = info;

    //         if (file?.size) {
    //             const isLt1M = file.size / 1024 / 1024 < 1;
    //             if (!isLt1M) {
    //                 toast.error('Image must be smaller than 1MB!');
    //                 return;
    //             }
    //         }

    //         if (!isRemoving) {
    //             // Filter valid files and limit the total count
    //             const updatedFileList = newFileList.slice(-4).filter((file: any) => file.size / 1024 / 1024 < 1);
    //             setFileList(updatedFileList);
    //         } else {
    //             isRemoving = false;
    //         }
    //     },
    //     onDrop: () => {
    //         setFile(null);
    //         setFileList([]);
    //     },
    //     onRemove: (file: any) => {
    //         isRemoving = true;
    //         setFileList((prevList: any[]) => prevList.filter((item) => item.uid !== file.uid));
    //     },
    // };



    const propsUpload = {
        name: 'file',
        accept: '.jpg,.jpeg,.png',
        maxCount: 4,
        fileList: fileList,
        beforeUpload: (file: any) => {
            return false; // Prevent automatic upload
        },
        onChange(info: any) {
            const { file, fileList: newFileList } = info;

            if (file?.size) {
                const isLt1M = file.size / 1024 / 1024 < 1;
                if (!isLt1M) {
                    toast.error('Image must be smaller than 1MB!');
                    return;
                }
            }

            if (!isRemoving) {
                // Filter valid files and limit the total count
                const updatedFileList = newFileList.slice(-4).filter((file: any) => file.size / 1024 / 1024 < 1);
                setFileList(updatedFileList);
            } else {
                // setIsRemoving(false);
                isRemoving = false
            }
        },
        onDrop: () => {
            setFileList([]);
        },
        onRemove: (file: any) => {
            // setIsRemoving(true);
            isRemoving = true
            setFileList((prevList: any[]) => prevList.filter((item) => item.uid !== file.uid));
        },
    };
    const handleChangeValue = (
        value: string | number | null | string[] | boolean,
        name: string,
        required: boolean,
        regex?: RegExp | null
    ) => {
        if (required && typeof value === 'string') {
            setHasError(invalidText(value));
        }
        if (required && Array.isArray(value) && value.length === 0) {
            setHasError(true);
        }

        if (typeof value === 'string' && regex) {
            const _regex = new RegExp(regex);
            setHasError(!_regex.test(value));
        }

        OnChange(value, name);
        // console.log("value",value)
    };

    const OnChange = (
        value: string | number | null | string[] | boolean,
        key: string,
    ) => {
        setFormData((prev: any) => {
            return {
                ...prev,
                [key]: value,
            };
        });
        const checkFormError = validateFormData(
            { [key]: value },
            { ...formError }
        );
        setFormError(checkFormError);
    };
    return (
        <div>
            {isLoading ? (
                <div className="spinner">
                    {/* Replace with an actual spinner component */}
                    <Loader />
                </div>
            ) : (
                <form className="bg-white p-6 rounded-lg shadow-md space-y-4">

                    <Row gutter={[50, 20]} >
                        <Col span={8}>
                            <InputField
                                name="medicineName"
                                value={formData?.medicineName}
                                label="Medicine Name"
                                required={true}
                                helperText="Medicine name is required"
                                placeholder='Medicine Name'
                                onChange={(value) => {
                                    handleChangeValue(
                                        value,
                                        'medicineName',
                                        true
                                    );
                                }}
                                // regex="^\d{10}$"
                                isError={formError.medicineName}
                                disabled={false}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="brandName"
                                value={formData?.brandName}
                                label="Brand Name"
                                required={true}
                                helperText="Brand name is required"
                                placeholder="Brand Name"
                                onChange={(value) => handleChangeValue(value, 'brandName', true)}
                                isError={formError.brandName}
                                disabled={false}
                            />
                        </Col>
                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Product Type"
                                options={[
                                    { label: 'Drug', value: 'Drug' },
                                    { label: 'Surgical', value: 'Surgical' },
                                    { label: 'Cosmetic', value: 'Cosmetic' },
                                    { label: 'Generic', value: 'Generic' },
                                    { label: 'Homeopathic', value: 'Homeopathic' },
                                    { label: 'Ayurvedic', value: 'Ayurvedic' },
                                    { label: 'OTC', value: 'OTC' }
                                ]}
                                value={formData.productType}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'productType', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Product type is required"
                                label="Product Type"
                                disabled={false}
                                isError={formError.productType}
                            />
                        </Col>

                        <Col span={8}>
                            <p className="mb-1 text-gray-700 font-semibold">
                                Image<span className="text-red-500"> *</span>
                            </p>
                            <Upload {...propsUpload}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>

                            {(Array.isArray(formData?.image) && !fileList.length) && (
                                <Row gutter={[16, 16]} justify="start" className='mt-10'>
                                    {formData.image.map((url: string, index: number) => (
                                        <Col span={6} key={index}>
                                            <Image
                                                src={`${configData?.s3baseURL || ''}${url}`} // Fallback for s3baseURL
                                                style={{
                                                    width: '100%', // Adjust width to fit the column
                                                    height: 'auto', // Maintain aspect ratio
                                                    objectFit: 'cover',
                                                }}
                                                preview={true}
                                            />
                                        </Col>
                                    ))}
                                </Row>
                            )}

                        </Col>

                        <Col span={8}>
                            <InputField
                                name="strength"
                                value={formData?.strength}
                                label="Strength"
                                required={true}
                                helperText="Strength is required"
                                placeholder="Strength"
                                onChange={(value) => handleChangeValue(value, 'strength', true)}
                                isError={formError.strength}
                                disabled={false}
                            />
                        </Col>
                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Drug Category"
                                options={[
                                    { label: 'Antibiotic', value: 'Antibiotic' },
                                    { label: 'Painkiller', value: 'Painkiller' },
                                    { label: 'Vitamin', value: 'Vitamin' },
                                    { label: 'Antifungal', value: 'Antifungal' },
                                    { label: 'Antiviral', value: 'Antiviral' }
                                ]}
                                value={formData.drugCategory}
                                onChange={(value: any) => {
                                    handleChangeValue(value, 'drugCategory', true);
                                }}
                                size="large"
                                required={true}
                                helperText="Drug category is required"
                                label="Drug Category"
                                disabled={false}
                                isError={formError.drugCategory}
                            />
                        </Col>

                        {/* Dosage Form */}
                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Dosage Form"
                                options={doseFormData?.map((item: any) => ({
                                    label: item.name,
                                    value: item.id
                                }))}
                                value={formData.doseFormId}
                                onChange={(value) => handleChangeValue(value, 'doseFormId', true)}
                                size="large"
                                required={true}
                                helperText="Dosage form is required"
                                label="Dosage Form"
                                disabled={false}
                                isError={formError.doseFormId}
                            />
                        </Col>

                        {/* Manufacturer */}
                        <Col span={8}>
                            <InputField
                                name="manufacturer"
                                value={formData.manufacturer}
                                label="Manufacturer"
                                required={true}
                                helperText="Manufacturer is required"
                                placeholder="Manufacturer"
                                onChange={(value) => handleChangeValue(value, 'manufacturer', true)}
                                isError={formError.manufacturer}
                                disabled={false}
                            />
                        </Col>

                        {/* Pack Size */}
                        <Col span={8}>
                            <InputField
                                name="packSize"
                                value={formData.packSize}
                                label="Pack Size"
                                required={true}
                                helperText="Pack size is required"
                                placeholder="Pack Size"
                                onChange={(value) => handleChangeValue(value, 'packSize', true)}
                                isError={formError.packSize}
                                disabled={false}
                            />
                        </Col>

                        {/* Price */}
                        <Col span={8}>
                            <InputField
                                name="price"
                                value={formData.price}
                                label="Price"
                                required={true}
                                helperText="Price is required"
                                placeholder="Price"
                                type="number"
                                onChange={(value) => handleChangeValue(value, 'price', true)}
                                isError={formError.price}
                                disabled={false}
                            />
                        </Col>

                        {/* Route of Administration */}
                        <Col span={8}>
                            <InputField
                                name="routeOfAdministration"
                                value={formData.routeOfAdministration}
                                label="Route of Administration"
                                required={true}
                                helperText="Route of administration is required"
                                placeholder="Route of Administration"
                                onChange={(value) => handleChangeValue(value, 'routeOfAdministration', true)}
                                isError={formError.routeOfAdministration}
                                disabled={false}
                            />
                        </Col>

                        {/* Therapeutic Class */}
                        <Col span={8}>
                            <InputField
                                name="TherapeuticClass"
                                value={formData.TherapeuticClass}
                                label="Therapeutic Class"
                                required={true}
                                helperText="Therapeutic class is required"
                                placeholder="Therapeutic Class"
                                onChange={(value) => handleChangeValue(value, 'TherapeuticClass', true)}
                                isError={formError.TherapeuticClass}
                                disabled={false}
                            />
                        </Col>

                        {/* Indications */}
                        <Col span={8}>
                            <InputField
                                name="indications"
                                value={formData.indications}
                                label="Indications"
                                required={true}
                                helperText="Indications are required"
                                placeholder="Indications"
                                onChange={(value) => handleChangeValue(value, 'indications', true)}
                                isError={formError.indications}
                                disabled={false}
                            />
                        </Col>

                        {/* Side Effects */}
                        <Col span={8}>
                            <InputField
                                name="sideEffects"
                                value={formData.sideEffects}
                                label="Side Effects"
                                required={true}
                                helperText="Side effects are required"
                                placeholder="Side Effects"
                                onChange={(value) => handleChangeValue(value, 'sideEffects', true)}
                                isError={formError.sideEffects}
                                disabled={false}
                            />
                        </Col>

                        {/* Contraindications */}
                        <Col span={8}>
                            <InputField
                                name="contraindications"
                                value={formData.contraindications}
                                label="Contraindications"
                                required={true}
                                helperText="Contraindications are required"
                                placeholder="Contraindications"
                                onChange={(value) => handleChangeValue(value, 'contraindications', true)}
                                isError={formError.contraindications}
                                disabled={false}
                            />
                        </Col>
                        <Col span={8}>
                            <InputField
                                name="storageConditions"
                                value={formData.storageConditions}
                                label="Storage Conditions"
                                required={true}
                                helperText={formError.storageConditions ? "Storage Conditions is required" : ""}
                                placeholder="Storage Conditions"
                                onChange={(value) => handleChangeValue(value, 'storageConditions', true)}
                                isError={!!formError.storageConditions}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="shelfLife"
                                value={formData.shelfLife}
                                label="Shelf Life"
                                required={true}
                                helperText={formError.shelfLife ? "Shelf Life is required" : ""}
                                placeholder="Shelf Life"
                                onChange={(value) => handleChangeValue(value, 'shelfLife', true)}
                                isError={!!formError.shelfLife}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Prescription Required"
                                options={[
                                    { label: 'Select', value: 'Select' },
                                    { label: 'YES', value: 'YES' },
                                    { label: 'NO', value: 'NO' }
                                ]}
                                value={formData.prescriptionReq}
                                onChange={(value) => handleChangeValue(value, 'prescriptionReq', true)}
                                size="large"
                                required={true}
                                helperText={formError.prescriptionReq ? "Prescription Required is required" : ""}
                                label="Prescription Required"
                                disabled={false}
                                isError={!!formError.prescriptionReq}
                            />
                        </Col>

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Approval Info"
                                options={[
                                    { label: 'Select', value: 'Select' },
                                    { label: 'FDA', value: 'FDA' },
                                    { label: 'EMA', value: 'EMA' }
                                ]}
                                value={formData.approvalInfo}
                                onChange={(value) => handleChangeValue(value, 'approvalInfo', true)}
                                size="large"
                                required={true}
                                helperText={formError.approvalInfo ? "Approval Info is required" : ""}
                                label="Approval Info"
                                disabled={false}
                                isError={!!formError.approvalInfo}
                            />
                        </Col>


                        <Col span={8}>
                            <InputField
                                name="barcodeSKU"
                                value={formData.barcodeSKU || ''}
                                label="Barcode SKU (Unique) or GST In"
                                required={true}
                                helperText={formError.barcodeSKU ? "Barcode SKU is required" : ""}
                                placeholder="Barcode SKU (Unique)"
                                onChange={(value) => handleChangeValue(value, 'barcodeSKU', true)}
                                isError={!!formError.barcodeSKU}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="batchNumber"
                                value={formData.batchNumber}
                                label="Batch Number"
                                required={true}
                                helperText={formError.batchNumber ? "Batch Number is required" : ""}
                                placeholder="Batch Number"
                                onChange={(value) => handleChangeValue(value, 'batchNumber', true)}
                                isError={!!formError.batchNumber}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="interactions"
                                value={formData.interactions}
                                label="Drug Interactions"
                                required={true}
                                helperText={formError.interactions ? "Drug Interactions are required" : ""}
                                placeholder="Drug Interactions"
                                onChange={(value) => handleChangeValue(value, 'interactions', true)}
                                isError={!!formError.interactions}
                                disabled={false}
                            />
                        </Col>

                        {/* <Col span={8}>
                            <InputField
                                name="countryOfOrigin"
                                value={formData.countryOfOrigin}
                                label="Country of Origin"
                                required={true}
                                helperText={formError.countryOfOrigin ? "Country of Origin is required" : ""}
                                placeholder="Country of Origin"
                                onChange={(value) => handleChangeValue(value, 'countryOfOrigin', true)}
                                isError={!!formError.countryOfOrigin}
                                disabled={false}
                            />
                        </Col> */}

                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select Country"
                                options={[
                                    { label: 'Select', value: 'Select' },
                                    ...Object.keys(countries).map(countryCode => ({
                                        label: `${countryCode} - ${(countries as any)[countryCode].name}`,
                                        value: countryCode,
                                    })),
                                ]}
                                value={formData.countryOfOrigin}
                                onChange={(value) => handleChangeValue(value, 'countryOfOrigin', true)}
                                size="large"
                                required={true}
                                helperText={formError.countryOfOrigin ? "country of origin is required" : ""}
                                label="country Of Origin"
                                disabled={false}
                                isError={!!formError.countryOfOrigin}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="ndc"
                                value={formData.ndc}
                                label="NDC"
                                required={true}
                                helperText={formError.ndc ? "NDC is required" : ""}
                                placeholder="NDC"
                                onChange={(value) => handleChangeValue(value, 'ndc', true)}
                                isError={!!formError.ndc}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="distributor"
                                value={formData.distributor}
                                label="Distributor"
                                required={true}
                                helperText={formError.distributor ? "Distributor is required" : ""}
                                placeholder="Distributor"
                                onChange={(value) => handleChangeValue(value, 'distributor', true)}
                                isError={!!formError.distributor}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="specialConsiderations"
                                value={formData.specialConsiderations}
                                label="Special Considerations"
                                required={true}
                                helperText={formError.specialConsiderations ? "Special Considerations are required" : ""}
                                placeholder="Special Considerations"
                                onChange={(value) => handleChangeValue(value, 'specialConsiderations', true)}
                                isError={!!formError.specialConsiderations}
                                disabled={false}
                            />
                        </Col>

                        <Col span={8}>
                            <InputField
                                name="scheduleType"
                                value={formData.scheduleType}
                                label="Schedule Type"
                                required={true}
                                helperText={formError.scheduleType ? "Schedule Type is required" : ""}
                                placeholder="Enter Schedule Type (e.g., Daily, Weekly, Monthly)"
                                onChange={(value) => handleChangeValue(value, 'scheduleType', true)}
                                isError={!!formError.scheduleType}
                                disabled={false}
                            />
                        </Col>
                        <Col span={8}>
                            <SelectDropdown
                                placeholder="Select GST Percentage"
                                options={Array.from({ length: 29 }, (_, index) => ({
                                    label: `${index}%`,
                                    value: index
                                }))}
                                value={String(formData.gstPercentage)}
                                onChange={(value) => {
                                    handleChangeValue(value, 'gstPercentage', true);
                                }}
                                size="large"
                                required={true}
                                helperText="GST percentage is required"
                                label="GST Percentage"
                                disabled={false}
                                isError={formError.gstPercentage}
                            />
                        </Col>



                    </Row>


                    {/* </div> */}
                    <div className="flex justify-center">
                        <Button
                            // htmlType="submit"
                            type='primary'
                            onClick={handleSubmit}
                            loading={isSubmitFormLoading}
                        // className="bg-blue-500 text-white p-2 rounded-md w-full max-w-xs hover:bg-blue-600"
                        >
                            {formData.id ? 'Update' : 'Add'} Medicine
                        </Button>
                    </div>
                </form>
            )
            };
        </div>
    );

}