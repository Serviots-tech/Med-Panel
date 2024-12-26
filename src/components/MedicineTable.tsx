import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { Button, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ConfirmDeleteModal from '../components/buttons/ConfirmDeleteModal';
import { deleteMedicine } from '../services/medicine';
import { Medicine } from '../types/medicine';
import { PermissionContext } from './AuthLayout';
import AddUserModal from './AddUserModal';
import './MedicineTable.css';

interface MedicineTableProps {
    medicines: Medicine[];
    onViewDetails: (medicine: Medicine) => void;
    onDelete: (medicine: Medicine) => Promise<void>;
    onAddNew: () => void;
    setMedicines: React.Dispatch<React.SetStateAction<Medicine[]>>;
    handlePageChange: (
        pagination: any,  // This is the pagination configuration object
        filters: any,  // This is for column filters
        sorter: any,  // This is for sorting columns

    ) => void;
    currentPage: number;
    totalRecords: number;
    pagesize: number;
    isLoading:boolean
}

const MedicineTable: React.FC<MedicineTableProps> = ({ medicines, onViewDetails, isLoading, onAddNew, setMedicines, handlePageChange, currentPage, totalRecords, pagesize }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
    const [medicineToDelete, setMedicineToDelete] = useState<Medicine | null>(null);
    const navigate = useNavigate();
    const context = useContext(PermissionContext);

    const [isDeleteLoading, setIsDeleteLoading] = useState(false)


    const handleDeleteClick = (medicine: Medicine) => {
        setMedicineToDelete(medicine);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {

        try {
            setIsDeleteLoading(true)
            if (medicineToDelete) {
                const isDeleted = await deleteMedicine(medicineToDelete.id);
                toast.success("Medicine deleted successfully");
                if (isDeleted) {
                    setMedicines((prevMedicines) =>
                        prevMedicines.filter((item) => item.id !== medicineToDelete.id)
                    );
                }
            }
        } catch (e: any) {
            console.log("🚀 ~ handleConfirmDelete ~ e:", e)

        } finally {
            setIsDeleteLoading(false)
            setIsModalOpen(false);
            setMedicineToDelete(null);
        }
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
                    </Button>
                    <Link to={`/add-medicine/${medicine.id}`}>
                        <Button
                            icon={<PencilIcon className="h-5 w-5" />}
                            type="link"
                        >
                        </Button>
                    </Link>
                    {context.userRole === "ADMIN" && <Button
                        icon={<TrashIcon className="h-5 w-5" />}
                        onClick={() => handleDeleteClick(medicine)}
                        type="link"
                        danger
                    >
                    </Button>}
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-4">
            {/* Add New Button */}
            <div className="flex justify-between mb-4">
                <div>
                    <Button
                        type="primary"
                        icon={<PlusIcon className="h-5 w-5 mr-2" />}
                        onClick={() => {
                            onAddNew();
                            navigate('/add-medicine');
                        }}
                    >
                        Add New Medicine
                    </Button>
                </div>
                <div className="flex space-x-4">
                    {context.userRole === "ADMIN" && (
                        <Button
                            type="primary"
                            onClick={() => {
                                setIsAddUserModalOpen(true)
                            }}
                        >
                            Add User
                        </Button>
                    )}
                    <Button
                        type="primary"
                        onClick={() => {
                            localStorage.removeItem("accessToken");
                            navigate("/login");
                            toast.success("User logged out successfully.")
                        }}
                    >
                        Log out
                    </Button>
                </div>

            </div>


            {/* Ant Design Table */}
            <Table
                columns={columns}
                dataSource={medicines}
                loading={isLoading}
                rowKey="id"
                onChange={handlePageChange}
                pagination={{
                    total: totalRecords,
                    pageSize: pagesize,
                    current: currentPage,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '50'],
                }}
                bordered // Adds border around the table
                className="custom-table" // Custom class for additional styles
            />


            {/* Confirmation Modal */}
            <ConfirmDeleteModal
                open={isModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                isDeleteLoading={isDeleteLoading}
                medicineName={medicineToDelete?.medicineName || ""}
            />
            <AddUserModal
                isAddUserModelOpen={isAddUserModalOpen}
                setIsAddUserModelOpen={setIsAddUserModalOpen}
            />
        </div>
    );
};

export default MedicineTable;

