import { ExclamationCircleOutlined } from '@ant-design/icons';

import React from 'react';
import { Modal } from 'antd';

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    itemName?: string;
    isDeleteLoading:boolean;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ open, onClose, onConfirm, itemName,isDeleteLoading }) => {
    return (
        <Modal
            title="Are you sure?"
            visible={open}
            onCancel={onClose}
            onOk={onConfirm}
            okText="Yes, Delete"
            cancelText="Cancel"
            okButtonProps={{ danger: true,loading:isDeleteLoading }}
        >
            <div className="flex justify-center mb-4">
                <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
            </div>
            <p>
                Are you sure you want to permanently delete the  <strong>{itemName}</strong> from your list?
                This action cannot be undone and the data will be lost forever.
            </p>
        </Modal>
    );
};

export default ConfirmDeleteModal;
