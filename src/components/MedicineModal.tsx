import React from 'react';
import { Medicine } from '../types/medicine';
// import { XMarkIcon } from '@heroicons/react/16/solid';
import { Modal, Row, Col, Typography, Divider } from 'antd';

const { Text } = Typography;

interface MedicineModalProps {
    medicine: Medicine | null;
    onClose: () => void;
}

const MedicineModal: React.FC<MedicineModalProps> = ({ medicine, onClose }) => {
    if (!medicine) return null;

    return (
        <Modal
            title="Medicine Details"
            visible={true}
            onCancel={onClose}
            footer={null}
            width={700}
            bodyStyle={{ padding: '20px' }}
            className="rounded-lg"
        >
            <div className="space-y-6">
                {/* Medicine Details Section */}
                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Medicine Name :- </Text>
                        <Text>{medicine.medicineName}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Brand Name :- </Text>
                        <Text>{medicine.brandName}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Price :- </Text>
                        <Text>{medicine.price}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Generic Name :- </Text>
                        <Text>{medicine.GenericName}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Drug Category :- </Text>
                        <Text>{medicine.drugCategory}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Dosage Form :- </Text>
                        <Text>{medicine.dosageForm}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Strength :- </Text>
                        <Text>{medicine.strength}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Manufacturer :- </Text>
                        <Text>{medicine.manufacturer}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Pack Size :- </Text>
                        <Text>{medicine.packSize}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Route of Administration :- </Text>
                        <Text>{medicine.routeOfAdministration}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Indications :- </Text>
                        <Text>{medicine.indications}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Side Effects :- </Text>
                        <Text>{medicine.sideEffects}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Contraindications :- </Text>
                        <Text>{medicine.contraindications}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Storage Conditions :- </Text>
                        <Text>{medicine.storageConditions}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Shelf Life :- </Text>
                        <Text>{medicine.shelfLife}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Prescription Required :- </Text>
                        <Text>{medicine.prescriptionReq}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Approval Info :- </Text>
                        <Text>{medicine.approvalInfo}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Barcode SKU :- </Text>
                        <Text>{medicine.barcodeSKU}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Batch Number :- </Text>
                        <Text>{medicine.batchNumber}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Interactions :- </Text>
                        <Text>{medicine.interactions}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Therapeutic Class :- </Text>
                        <Text>{medicine.TherapeuticClass}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Country of Origin :- </Text>
                        <Text>{medicine.countryOfOrigin}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>NDC :- </Text>
                        <Text>{medicine.ndc}</Text>
                    </Col>
                    <Col span={8}>
                        <Text strong>Distributor :- </Text>
                        <Text>{medicine.distributor}</Text>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                    <Col span={8}>
                        <Text strong>Special Considerations :- </Text>
                        <Text>{medicine.specialConsiderations}</Text>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
};

export default MedicineModal;
