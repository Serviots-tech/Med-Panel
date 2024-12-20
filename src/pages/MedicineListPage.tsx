import React, { useEffect, useState } from 'react';
import { getMedicines, deleteMedicine } from '../services/medicine';
import { Medicine } from '../types/medicine';
import MedicineTable from '../components/MedicineTable';
import MedicineModal from '../components/MedicineModal';
import { TablePaginationConfig } from 'antd';
import { FilterValue, SorterResult } from 'antd/es/table/interface';

const MedicineListPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
    const [medicines, setMedicines] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setpageSize] = useState(10);
    const [totalRecords, setTotalRecords] = useState(0);


    // Fetching the list of medicines
    const fetchMedicines = async () => {
        try {

            const query = {
                currentPage,
                pageSize
            }
            const response = await getMedicines(query);

            if (response && Array.isArray(response.data)) {
                setMedicines(response.data);
                setCurrentPage(response?.pagination?.page)
                setTotalRecords(response?.pagination?.totalRecords)
                console.log("Fetched medicines:", response.pagination);
            } else {
                console.error('API response does not contain a valid medicines array:', response);
            }
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    // Fetch the medicines when the component is mounted or when page/pageSize changes
    useEffect(() => {
        fetchMedicines();
    }, [currentPage, pageSize]);


    // Handle opening the modal with medicine details
    const handleViewDetails = (medicine: Medicine) => {
        setSelectedMedicine(medicine);
        setIsModalOpen(true);
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMedicine(null);
    };

    // Handle deleting a medicine
    const handleDelete = async (medicine: Medicine) => {
        try {
            const isDeleted = await deleteMedicine(medicine.id);
            if (isDeleted) {
                setMedicines(medicines.filter(med => med.id !== medicine.id));
            }
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    // Handle page change
    const handlePageChange = (pagination: TablePaginationConfig,
        filters: Record<string, FilterValue | null>,
        sorter: SorterResult<Medicine>[],
    ) => {
        setCurrentPage(pagination?.current as number)
        setTotalRecords(pagination?.total as number)
        setpageSize(pagination?.pageSize as number)
    };

    return (
        <div className="max-w-6xl mx-auto p-5">
            <h1 className="text-3xl font-bold text-center">All Medicine List</h1>
            <hr className='mt-5' />
            <div>
                {/* Medicine Table */}
                <MedicineTable
                    medicines={medicines}
                    onViewDetails={handleViewDetails}
                    onDelete={handleDelete}
                    onAddNew={() => console.log("Add new medicine clicked")}
                    setMedicines={setMedicines}
                    handlePageChange={handlePageChange}
                    currentPage={currentPage}
                    totalRecords={totalRecords}
                    pagesize={pageSize}
                />

                {/* Modal for Medicine Details */}
                {isModalOpen && selectedMedicine && (
                    <MedicineModal
                        medicine={selectedMedicine}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
};

export default MedicineListPage;
