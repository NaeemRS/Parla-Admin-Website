'use client';

import { useState, useContext, useEffect } from 'react';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import { ThemeContext } from '@/context/ThemeContext';

/*─────────────────────────────*/
/* Re-usable little components */
/*─────────────────────────────*/
const TextInput = ({ label, value, onChange, type = 'text', theme, placeholder }) => (
    <div>
        <label className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-[#161616]'}`}>
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            className={`w-full rounded-full py-2.5 px-3 mt-1 ${theme === 'dark' ? 'bg-[#2A2A2A] text-white' : 'bg-[#E5E5E5] text-[#161616]'}`}
        />
    </div>
);

const SelectField = ({ label, value, onChange, options, theme, placeholder }) => (
    <div>
        <label className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-[#161616]'}`}>
            {label}
        </label>
        <select
            value={value}
            onChange={onChange}
            className={`w-full rounded-full py-2.5 px-3 mt-1 appearance-none ${theme === 'dark' ? 'bg-[#2A2A2A] text-white' : 'bg-[#E5E5E5] text-[#161616]'}`}
        >
            <option value=''>{placeholder || `Select ${label}`}</option>
            {options.map((o) => (
                <option key={o.value} value={o.value}>
                    {o.label}
                </option>
            ))}
        </select>
    </div>
);

const FilePill = ({ file, onRemove, theme }) =>
    file ? (
        <div className={`w-full rounded-full flex items-center justify-between px-3 py-2 ${theme === 'dark' ? 'bg-[#2A2A2A]' : 'bg-[#E5E5E5]'}`}>
            <span className='flex items-center gap-2 truncate'>
                <Icon icon='mdi:file' /> {file.name}
            </span>
            <button onClick={onRemove}>
                <Icon icon='heroicons:x-mark' />
            </button>
        </div>
    ) : null;

/*─────────────────────────────*/
/*           MODAL             */
/*─────────────────────────────*/
export default function EmployeeModal({ isOpen = false, onClose = () => { } }) {
    const { theme } = useContext(ThemeContext);

    /* ----------------- state ----------------- */
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [triggerApi, setTriggerApi] = useState(false);

    /* step-1 profile  */
    const [profileImage, setProfileImage] = useState(null);
    const [profilePreview, setProfilePreview] = useState(null);

    /* step-6 docs */
    const [cv, setCv] = useState(null);
    const [wageSlip, setWageSlip] = useState(null);
    const [idCard, setIdCard] = useState(null);
    const [diploma, setDiploma] = useState(null);

    /* step-7 debit */
const [debitItem, setDebitItem] = useState({ name: '', code: '' });

    /* all text inputs */
    const [formData, setFormData] = useState({
        /* step-1 */
        name: '',
        lastname: '',
        gender: '',
        type: '',
        /* step-2 */
        district: '',
        town: '',
        street: '',
        streetNumber: '',
        /* step-3 */
        office: '',
        door: '',
        salary: '',
        paymentDay: '',
        commission: '',
        /* step-4 */
        confirmationDate: '',
        confirmBy: '',
        startDate: '',
        resignationDate: '',
        /* step-5 */
        emergencyContact: '',
        phone: '',
        contact: '',
        hiredBy: '',
        department: '',
        position: '',
        /* step-6 */
        commissionPercentage: '',
    });

    const updateField = (k, v) => setFormData((p) => ({ ...p, [k]: v }));

    /* ---------------- image upload ------------ */
    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) return toast.error('Choose an image');
        if (file.size > 5 * 1024 * 1024) return toast.error('Max 5 MB');
        setProfileImage(file);

        const reader = new FileReader();
        reader.onload = (ev) => setProfilePreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    const filePicker = (setter) => (e) => {
        const f = e.target.files?.[0];
        if (!f) return;
        if (f.size > 5 * 1024 * 1024) return toast.error('Max 5 MB');
        setter(f);
    };

    /* --------------- VALIDATION --------------- */
    const isStep1Valid = formData.name && formData.lastname && formData.gender && formData.type && profileImage;
    const isStep2Valid = formData.district && formData.town && formData.street && formData.streetNumber;
    const isStep3Valid = formData.office && formData.door && formData.salary && formData.paymentDay && formData.commission !== '';
    const isStep4Valid = formData.confirmationDate && formData.confirmBy && formData.startDate && formData.resignationDate;
    const isStep5Valid = formData.emergencyContact && formData.phone && formData.contact && formData.hiredBy && formData.department && formData.position;
    const isStep6Valid = formData.commissionPercentage && cv && wageSlip && idCard && diploma;
    const isStep7Valid = debitItem.name && debitItem.code;


    const stepGood = [false, isStep1Valid, isStep2Valid, isStep3Valid, isStep4Valid, isStep5Valid, isStep6Valid, isStep7Valid][step];

    /* --------------- API call ----------------- */
    useEffect(() => {
        if (!triggerApi) return;

        const addEmployee = async () => {
            setLoading(true);
            const fd = new FormData();
            Object.entries(formData).forEach(([k, v]) => v && fd.append(k, v));
            profileImage && fd.append('profileImage', profileImage);
            cv && fd.append('cv', cv);
            wageSlip && fd.append('wageSlip', wageSlip);
            idCard && fd.append('idCard', idCard);
            diploma && fd.append('diploma', diploma);
            fd.append('debitItems', JSON.stringify(debitItems));

            try {
                const token = localStorage.getItem('token');
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BASE_URL || 'https://api.example.com'}/api/Admin/Employee/AddEmployee`,
                    {
                        method: 'POST',
                        headers: {
                            'ngrok-skip-browser-warning': 'true',
                            ...(token && { Authorization: `Bearer ${token}` }),
                        },
                        body: fd,
                    }
                );

                const data = await res.json();
                if (res.ok || data?.status === 200) {
                    toast.success('Employee added!');
                    closeModal();
                } else toast.error(data?.message || 'Failed');
            } catch (err) {
                console.error(err);
                toast.error('Network error');
            } finally {
                setLoading(false);
                setTriggerApi(false);
            }
        };

        addEmployee();
    }, [triggerApi]);

    /* --------------- helpers ------------------ */
    const next = () => {
        if (!stepGood) return toast.error('Fill all required fields');
        setStep((s) => Math.min(s + 1, 7));
    };
    const prev = () => (step > 1 ? setStep((s) => s - 1) : closeModal());
    const save = () => {
        if (!(isStep1Valid && isStep2Valid && isStep3Valid && isStep4Valid && isStep5Valid && isStep6Valid && isStep7Valid))
            return toast.error('Complete all steps');
        setTriggerApi(true);
    };

    const closeModal = () => {
        onClose();
        setStep(1);
        setProfileImage(null);
        setProfilePreview(null);
        setCv(null);
        setWageSlip(null);
        setIdCard(null);
        setDiploma(null);
        setDebitItems([{ name: '', code: '' }]);
        setFormData((p) => {
            const blank = {};
            Object.keys(p).forEach((k) => (blank[k] = ''));
            return blank;
        });
    };

    const StepIndicator = () => (
        <div className='flex items-center gap-2'>
            {Array.from({ length: 7 }).map((_, i) => {
                const n = i + 1;
                return (
                    <div key={n} className='flex items-center gap-2'>
                        <div className={`w-4 h-4 rounded-full ${n <= step ? 'bg-orange-500' : 'bg-gray-300'}`} />
                        {n !== 7 && <div className={`w-6 h-[2px] rounded ${n < step ? 'bg-orange-500' : 'bg-gray-300'}`} />}
                    </div>
                );
            })}
        </div>
    );

    /* --------------- RENDER ------------------- */
    if (!isOpen) return null;

    return (
        <>
            <Toaster position='top-center' />
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-[99] p-4'>
                <div className={`rounded-2xl shadow-2xl w-full max-w-3xl pb-4 flex flex-col ${theme === 'dark' ? 'bg-[#1F1F1F] text-white' : 'bg-white'}`}>
                    {/* Header */}
                    <div className={`border-b flex items-center gap-4 p-3 ${theme === 'dark' ? 'border-[#262626]' : 'border-gray-200'}`}>
                        <button onClick={prev}>
                            <Icon icon='heroicons:arrow-left' className='w-6 h-6' />
                        </button>
                        <h2 className='text-lg font-semibold'>Add employee</h2>
                    </div>

                    {/* Body */}
                    <div className='p-4 space-y-6'>

                        {/* ───────── Step-1 ───────── */}
                        {step === 1 && (
                            <>
                                {/* profile photo */}
                                <div className='flex flex-col items-center'>
                                    <div className='relative w-24 h-24 mb-4'>
                                        <div className={`w-24 h-24 rounded-full flex items-center justify-center overflow-hidden ${profilePreview ? '' : 'bg-black'}`}>
                                            {profilePreview ? (
                                                <img src={profilePreview} alt='preview' className='w-full h-full object-cover' />
                                            ) : (
                                                <Icon icon='heroicons:user' className='w-12 h-12 text-white' />
                                            )}
                                        </div>
                                    </div>
                                    <div className='relative'>
                                        <input type='file' accept='image/*' onChange={handleImageUpload} className='absolute inset-0 opacity-0 cursor-pointer' id='profileInput' />
                                        <button
                                            className={`px-4 py-2 rounded-full text-sm font-medium border-2 border-dashed ${theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'
                                                }`}
                                            onClick={() => document.getElementById('profileInput').click()}
                                        >
                                            <Icon icon='heroicons:camera' className='w-4 h-4 mr-2' />
                                            {profilePreview ? 'Change photo' : 'Upload photo'}
                                        </button>
                                    </div>
                                    {profileImage && <p className='text-xs mt-2 truncate'>{profileImage.name}</p>}
                                </div>

                                <TextInput label='Name' value={formData.name} onChange={(e) => updateField('name', e.target.value)} theme={theme} />
                                <TextInput label='Lastname' value={formData.lastname} onChange={(e) => updateField('lastname', e.target.value)} theme={theme} />

                                {/* gender */}
                                <div>
                                    <label className='text-xl font-medium'>Gender</label>
                                    <div className='flex gap-6 mt-3'>
                                        {['male', 'female'].map((g) => (
                                            <label key={g} className='flex items-center cursor-pointer'>
                                                <input type='radio' name='gender' value={g} checked={formData.gender === g} onChange={(e) => updateField('gender', e.target.value)} className='w-5 h-5 text-orange-500' />
                                                <span className='ml-2 capitalize'>{g}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                {/* type */}
                                <SelectField
                                    label='Type'
                                    value={formData.type}
                                    onChange={(e) => updateField('type', e.target.value)}
                                    options={[
                                        { value: 'manager', label: 'Manager' },
                                        { value: 'finance-manager', label: 'Finance Manager' },
                                        { value: 'hr', label: 'HR' },
                                        { value: 'project-manager', label: 'Project Manager' },
                                        { value: 'team-lead', label: 'Team Lead' },
                                        { value: 'developer', label: 'Developer' },
                                        { value: 'designer', label: 'Designer' },
                                        { value: 'qa-engineer', label: 'QA Engineer' },
                                        { value: 'marketing', label: 'Marketing' },
                                        { value: 'sales', label: 'Sales' },
                                        { value: 'support', label: 'Customer Support' },
                                    ]}
                                    theme={theme}
                                />
                            </>
                        )}

                        {/* ───────── Step-2 ───────── */}
                        {step === 2 && (
                            <>
                                {['district', 'town', 'street', 'streetNumber'].map((k) => (
                                    <TextInput key={k} label={k.charAt(0).toUpperCase() + k.slice(1)} value={formData[k]} onChange={(e) => updateField(k, e.target.value)} theme={theme} />
                                ))}
                            </>
                        )}

                        {/* ───────── Step-3 ───────── */}
                        {step === 3 && (
                            <>
                                <TextInput label='Office' value={formData.office} onChange={(e) => updateField('office', e.target.value)} theme={theme} />
                                <TextInput label='Door' value={formData.door} onChange={(e) => updateField('door', e.target.value)} theme={theme} />

                                <SelectField
                                    label='Salary'
                                    value={formData.salary}
                                    onChange={(e) => updateField('salary', e.target.value)}
                                    options={[
                                        { value: 'wage', label: 'Wage' },
                                        { value: 'monthly', label: 'Monthly' },
                                        { value: 'yearly', label: 'Yearly' },
                                    ]}
                                    theme={theme}
                                />

                                <TextInput type='date' label='Payment day' value={formData.paymentDay} onChange={(e) => updateField('paymentDay', e.target.value)} theme={theme} placeholder='Payment day' />

                                {/* commission yes/no */}
                                <div>
                                    <label className='text-xl font-medium'>Commission</label>
                                    <div className='flex gap-6 mt-3'>
                                        {['yes', 'no'].map((v) => (
                                            <label key={v} className='flex items-center cursor-pointer'>
                                                <input type='radio' name='commission' value={v} checked={formData.commission === v} onChange={(e) => updateField('commission', e.target.value)} className='w-5 h-5 text-orange-500' />
                                                <span className='ml-2 capitalize'>{v}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        {/* ───────── Step-4 ───────── */}
                        {step === 4 && (
                            <>
                                <TextInput type='date' label='Confirmation date' value={formData.confirmationDate} onChange={(e) => updateField('confirmationDate', e.target.value)} theme={theme} />
                                <TextInput label='Confirm by' value={formData.confirmBy} onChange={(e) => updateField('confirmBy', e.target.value)} theme={theme} />
                                <TextInput type='date' label='Start date' value={formData.startDate} onChange={(e) => updateField('startDate', e.target.value)} theme={theme} />
                                <TextInput type='date' label='Resignation date' value={formData.resignationDate} onChange={(e) => updateField('resignationDate', e.target.value)} theme={theme} />
                            </>
                        )}

                        {/* ───────── Step-5 ───────── */}
                        {step === 5 && (
                            <>
                                <TextInput label='Emergency contact' value={formData.emergencyContact} onChange={(e) => updateField('emergencyContact', e.target.value.replace(/\D/g, ''))} theme={theme} type='tel' />
                                <TextInput label='Phone' value={formData.phone} onChange={(e) => updateField('phone', e.target.value.replace(/\D/g, ''))} theme={theme} type='tel' placeholder='+90555…' />
                                <TextInput label='Contact' value={formData.contact} onChange={(e) => updateField('contact', e.target.value.replace(/\D/g, ''))} theme={theme} type='tel' />
                                <TextInput label='Hired by' value={formData.hiredBy} onChange={(e) => updateField('hiredBy', e.target.value)} theme={theme} />
                                <TextInput label='Department' value={formData.department} onChange={(e) => updateField('department', e.target.value)} theme={theme} />
                                <TextInput label='Position' value={formData.position} onChange={(e) => updateField('position', e.target.value)} theme={theme} />
                            </>
                        )}

                        {/* ───────── Step-6 ───────── */}
                        {step === 6 && (
                            <>
                                <TextInput label='Commission percentage' value={formData.commissionPercentage} onChange={(e) => updateField('commissionPercentage', e.target.value)} theme={theme} placeholder='40%' />

                                {[
                                    ['CV', cv, setCv],
                                    ['Monthly wage slips', wageSlip, setWageSlip],
                                    ['ID (front & back photo)', idCard, setIdCard],
                                    ['Diploma', diploma, setDiploma],
                                ].map(([lbl, fileState, setter]) => (
                                    <div key={lbl}>
                                        <label className='text-xl font-medium'>{lbl}</label>
                                        {!fileState ? (
                                            <label
                                                className={`w-full mt-1 rounded-full py-2.5 px-3 flex items-center gap-2 cursor-pointer border-2 border-dashed ${theme === 'dark' ? 'border-gray-600 text-gray-300' : 'border-gray-300 text-gray-600'
                                                    }`}
                                            >
                                                <Icon icon='heroicons:paper-clip' />
                                                <span>Upload {lbl}</span>
                                                <input hidden type='file' accept='application/pdf,image/*' onChange={filePicker(setter)} />
                                            </label>
                                        ) : (
                                            <FilePill file={fileState} onRemove={() => setter(null)} theme={theme} />
                                        )}
                                    </div>
                                ))}
                            </>
                        )}

                        {/* ───────── Step-7 ───────── */}
                        {step === 7 && (
                            <>
                                <h3 className='text-xl font-semibold'>Debit</h3>

                                <TextInput
                                    label='Item name'
                                    value={debitItem.name}
                                    onChange={(e) => setDebitItem({ ...debitItem, name: e.target.value })}
                                    theme={theme}
                                />

                                <TextInput
                                    label='Code / serial'
                                    value={debitItem.code}
                                    onChange={(e) => setDebitItem({ ...debitItem, code: e.target.value })}
                                    theme={theme}
                                />
                            </>
                        )}
                        {/* Footer nav */}
                        <div className='flex justify-between items-center pt-6'>
                            <StepIndicator />
                            {step < 7 ? (
                                <button
                                    onClick={next}
                                    disabled={!stepGood}
                                    className={`px-6 py-2 rounded-full font-medium flex items-center gap-2 ${stepGood ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Continue <Icon icon='heroicons:chevron-right' className='w-4 h-4' />
                                </button>
                            ) : (
                                <button
                                    onClick={save}
                                    disabled={!stepGood || loading}
                                    className={`px-6 py-2 rounded-full font-medium ${stepGood && !loading ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                                >
                                    {loading ? 'Saving…' : 'Save'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}