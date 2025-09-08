'use client';
import { useMemo, useState } from 'react';
import UserDatadTable from '@/components/tabels/UserDatadTable';
import { Icon } from '@iconify/react';
import AppointmentDetailsModal from '@/components/modal/AppointmentDetailsModal';

const appointmentColumns = [
    { label: 'Partner', key: 'partner', sortable: true },
    { label: 'Branch', key: 'branch', sortable: true },
    { label: 'Services', key: 'service', sortable: true },
    { label: 'Category', key: 'category', sortable: true },
    { label: 'App no', key: 'appNo', sortable: true },
    { label: 'App date', key: 'appDate', sortable: true },
    { label: 'Time', key: 'appTime', sortable: true },
    { label: 'Free cancelation', key: 'freeCancelDate', sortable: true },
    { label: 'Free', key: 'cancelationFee', sortable: true },
    { label: 'Edit date', key: 'editDate', sortable: true },
    { label: 'City', key: 'city', sortable: true },
    { label: 'Price', key: 'price', sortable: true },
    { label: 'Status', key: 'status', sortable: true },
];

const mockAppointments = [
    {
        id: 'A-001',
        partner: 'Marsav',
        branch: 'Eminönü',
        service: 'Hair',
        category: 'Hair',
        appNo: 'Y23 ASD01',
        appDate: '29.03.2025',
        appTime: '09:00',
        freeCancelDate: '28.03.2025',
        cancelationFee: '300 TL',
        editDate: '28.03.2025',
        city: 'City',
        price: 'USD200.11',
        status: 'Active',
    },
];

export default function UserSetting({ user, onBack }) {
    const [activeTab, setActiveTab] = useState('appointments');
    const [category, setCategory] = useState('All');

    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const filteredAppointments = useMemo(() => {
        if (category === 'All') return mockAppointments;
        return mockAppointments.filter((a) => a.category === category);
    }, [category]);

    const handleOpenAppointmentModal = (appointment) => {
        setSelectedAppointment(appointment);
        setIsAppointmentModalOpen(true);
    };

    const handleCloseAppointmentModal = () => {
        setIsAppointmentModalOpen(false);
        setSelectedAppointment(null);
    };

    const handleSaveAppointment = (updatedAppointment) => {
        console.log('Save appointment:', updatedAppointment);
        handleCloseAppointmentModal();
    };

    return (
        <div className="p-4 md:p-6">
            <button
                onClick={onBack}
                className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
            >
                <Icon icon="mdi:arrow-left" className="w-4 h-4" />
                Back to Users
            </button>
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                        {(user?.name || user?.username || 'U')?.toString()?.charAt(0)?.toUpperCase()} </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl md:text-2xl font-semibold">
                                {`${user?.firstName || 'Name '} ${user?.lastName || 'Lastname'} `}
                            </h1>
                            <div className="flex items-center text-orange-500 text-sm"> <Icon icon="mdi:star" />
                                <Icon icon="mdi:star" /> <Icon icon="mdi:star" /> <Icon icon="mdi:star" />
                                <Icon icon="mdi:star-outline" /> <span className="ml-2 text-gray-500">27 ratings</span>
                            </div>
                        </div>
                        <div className="mt-2 flex gap-2">
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">Mars</span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">Venus</span>
                            <span className="px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-700">@{user?.username || 'username'}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Tabs */}
            <div className="mt-6 border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                    {[
                        { key: 'appointments', label: 'Appointments' },
                        { key: 'profile', label: 'Profile' },
                        { key: 'settings', label: 'Settings' },
                    ].map((t) => (
                        <button
                            key={t.key}
                            onClick={() => setActiveTab(t.key)}
                            className={`pb-3 text-sm font-medium border-b-2 ${activeTab === t.key
                                ? 'border-orange-500 text-orange-600'
                                : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Tab content */}
            {activeTab === 'appointments' && (
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="font-medium">All</span>
                            <span>({filteredAppointments.length})</span>
                        </div>
                        <div className="flex gap-2">
                            {['Hair', 'Beauty', 'Massage'].map((c) => (
                                <button
                                    key={c}
                                    onClick={() => setCategory(c)}
                                    className={`px-3 py-1 rounded-full text-sm ${category === c
                                        ? 'bg-[#FF6B00] text-white'
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                        }`}
                                >
                                    {c}
                                </button>
                            ))}
                            <button
                                onClick={() => setCategory('All')}
                                className={`px-3 py-1 rounded-full text-sm ${category === 'All'
                                    ? 'bg-gray-800 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                All
                            </button>
                        </div>
                    </div>

                    {/* ✅ row click opens modal */}
                    <UserDatadTable
                        columns={appointmentColumns}
                        data={filteredAppointments}
                        showCheckboxes={false}
                        rowClickable={true}
                        onRowClick={handleOpenAppointmentModal}
                    />
                </div>
            )}

            {/* Appointment Modal */}
            <AppointmentDetailsModal
                isOpen={isAppointmentModalOpen}
                onClose={handleCloseAppointmentModal}
                onSave={handleSaveAppointment}
                appointment={selectedAppointment}
            />
        </div>
    );
}
