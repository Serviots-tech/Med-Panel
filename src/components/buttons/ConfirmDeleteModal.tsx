import React from 'react';

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    medicineName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm, medicineName }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg w-full sm:w-96 md:w-2/3 lg:w-1/2 xl:w-1/3">
                <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
                <p>Do you really want to delete the medicine "{medicineName}"? This action cannot be undone.</p>
                <div className="mt-4 flex justify-end space-x-4">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={onConfirm}
                    >
                        Yes, Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDeleteModal;
