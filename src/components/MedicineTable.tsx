import React, { useState } from 'react';
import { Medicine } from '../types/medicine';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Link } from 'react-router-dom';
import { deleteMedicine } from '../services/medicine';
import ConfirmDeleteModal from '../components/buttons/ConfirmDeleteModal';
import { toast } from 'react-toastify';
import { Table, Button } from 'antd';

interface MedicineTableProps {
    medicines: Medicine[];
    onViewDetails: (medicine: Medicine) => void;
    onDelete: (medicine: Medicine) => Promise<void>;
    onAddNew: () => void;
    setMedicines: React.Dispatch<React.SetStateAction<Medicine[]>>;
}

const MedicineTable: React.FC<MedicineTableProps> = ({ medicines, onViewDetails, onAddNew, setMedicines }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(null);

    const handleDeleteClick = (medicine: Medicine) => {
        setMedicineToDelete(medicine);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (medicineToDelete) {
            const isDeleted = await deleteMedicine(medicineToDelete.id);
            toast.success("Medicine deleted successfully");
            if (isDeleted) {
                setMedicines((prevMedicines) =>
                    prevMedicines.filter((item) => item.id !== medicineToDelete.id)
                );
            }
        }
        setIsModalOpen(false);
        setMedicineToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setMedicineToDelete(null);
    };

    // Columns for the Ant Design Table
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            render: (_text: string, _record: Medicine, index: number) => index + 1,
        },
        {
            title: 'Medicine Name',
            dataIndex: 'medicineName',
            key: 'medicineName',
        },
        {
            title: 'Brand Name',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, medicine: Medicine) => (
                <div className="flex justify-center space-x-2">
                    <Button
                        icon={<EyeIcon className="h-5 w-5" />}
                        onClick={() => onViewDetails(medicine)}
                        type="link"
                    >
                        View
                    </Button>
                    <Link to={`/add-medicine/${medicine.id}`}>
                        <Button
                            icon={<PencilIcon className="h-5 w-5" />}
                            type="link"
                        >
                            Edit
                        </Button>
                    </Link>
                    <Button
                        icon={<TrashIcon className="h-5 w-5" />}
                        onClick={() => handleDeleteClick(medicine)}
                        type="link"
                        danger
                    >
                        Delete
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Add New Button */}
            <div className="text-center mb-4">
                <Link to={'/add-medicine'} className='flex items-center'>
                    <Button
                        type="primary"
                        icon={<PlusIcon className="h-5 w-5 mr-2" />}
                        onClick={onAddNew}
                    >
                        Add New Medicine
                    </Button>
                </Link>
            </div>

            {/* Ant Design Table */}
            <Table
                columns={columns}
                dataSource={medicines}
                rowKey="id"
                pagination={false}
            />

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                {/* Pagination could be added here if needed */}
            </div>

            {/* Confirmation Modal */}
            <ConfirmDeleteModal
                open={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                medicineName={medicineToDelete?.medicineName || ""}
            />
        </div>
    );
};

export default MedicineTable;
