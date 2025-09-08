'use client';
import { useEffect, useState, useContext } from 'react';
import { Icon } from '@iconify/react';
import { ThemeContext } from '@/context/ThemeContext';
import toast from 'react-hot-toast';

/* tiny pill */
const Pill = ({ val, theme }) => (
  <div
    className={`w-full rounded-full py-2.5 px-4 text-sm truncate ${
      theme === 'dark' ? 'bg-[#2A2A2A] text-white' : 'bg-[#E5E5E5] text-[#161616]'
    }`}
  >
    {val ?? '—'}
  </div>
);

export default function AppointmentDetailsModal({ isOpen, onClose, appointmentId }) {
  const { theme = 'light' } = useContext(ThemeContext) || {};
  const [loading, setLoading]       = useState(false);
  const [appointment, setAppointment] = useState(null);

  /* fetch each time id or open changes */
  useEffect(() => {
    if (!isOpen || !appointmentId) return;

    const fetchOne = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Appointment/single/${appointmentId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true',
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );
        const json = await res.json();
        if (res.ok && json?.data) {
          setAppointment(json.data);
        } else {
          toast.error(json?.message || 'Unable to load appointment');
          onClose();
        }
      } catch (err) {
        console.error(err);
        toast.error('Network error');
        onClose();
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [isOpen, appointmentId]);

  if (!isOpen) return null;

  const FIELDS = [
    ['Name', 'name'],
    ['Lastname (only first letter)', 'lastname'],
    ['Appointment no', 'number'],
    ['Service category', 'service'],
    ['Gender', 'gender'],
    ['Appointment date', 'appDate'],
    ['Appointment time', 'appTime'],
    ['Creation date', 'createdDate'],
    ['Creation time', 'createdTime'],
    ['Free cancelation', 'freeCancelDate'],
    ['Free cancelation', 'freeCancelTime'],
    ['Cancelation fee (It will be different for each service)', 'cancelationFee'],
  ];

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4'>
      <div
        className={`w-full max-w-md sm:max-w-2xl rounded-2xl shadow-xl flex flex-col ${
          theme === 'dark' ? 'bg-[#1F1F1F] text-white' : 'bg-white'
        }`}
      >
        {/* header */}
        <div
          className={`flex items-center gap-4 p-4 border-b ${
            theme === 'dark' ? 'border-[#262626]' : 'border-gray-200'
          }`}
        >
          <button onClick={onClose}>
            <Icon icon='heroicons:arrow-left' className='w-6 h-6' />
          </button>
          <h2 className='text-lg font-semibold'>Appointment details</h2>
        </div>

        {/* body */}
        {loading ? (
          <div className='flex justify-center items-center py-10'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500' />
          </div>
        ) : appointment ? (
          <div className='p-4 overflow-auto'>
            <div className='flex flex-col sm:flex-row gap-6'>
              {/* avatar */}
              <div className='flex-shrink-0 flex flex-col items-center'>
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden ${
                    appointment.avatar ? '' : theme === 'dark' ? 'bg-black' : 'bg-[#161616]'
                  }`}
                >
                  {appointment.avatar ? (
                    <img src={appointment.avatar} alt='avatar' className='object-cover w-full h-full' />
                  ) : (
                    <Icon icon='heroicons:user' className='w-12 h-12 text-white' />
                  )}
                </div>
              </div>

              {/* grid */}
              <div className='flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4'>
                {FIELDS.map(([lbl, key]) => (
                  <div key={key}>
                    <p className='text-sm mb-1'>{lbl}</p>
                    <Pill val={appointment[key]} theme={theme} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className='p-6 text-center'>No data</div>
        )}
      </div>
    </div>
  );
}