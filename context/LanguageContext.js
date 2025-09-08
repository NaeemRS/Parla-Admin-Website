"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const resources = {
  en: {
    table: {
      noData: "No data",
      name: "Name",
      dueDate: "Due Date",
      taskVisibility: "Task Visibility",
      assigner: "Assigner",
      assignedBy: "Assigned By",
      status: "Status",
      partnerName: "Partner Name",
      gender: "Gender",
      age: "Age",
      phone: "Phone",
      datetime: "Date",
      time: "Time",
      nextMeet: "Next Meet",
      address: "Address",
      purpose: "Purpose",
      serviceName: "Service Name",
      serviceCategory: "Category",
      appointmentNo: "App no",
      branchDetails: { firstName: "Partner" },
      city: "City",
      district: "District",
      price: "Price",
      type: "Type",
      country: "Address",
      authorized: "Authorized",
      contract: "Contract",
      duration: "Duration",
      contactPersonPhone: "Contact",
      startDate: "Start date",
      endDate: "End date",
      employees: "Employee",
      payment: "Payment",
      paid: "Paid",
      mail: "Mail",
      username: "Username",
      lastname: "Lastname",
      countryCol: "Country",
      cityCol: "City",
      districtCol: "District",
      town: "Town",
      signUpDate: "Sign up date",
      confirmation: "Confirmation",
      offers: "Offers",
      ratings: "Ratings",
      hiredBy: "Hired by",
      wage: "Wage",
      position: "Position",
      department: "Department",
    },
    tabs: {
      task: "Task",
      mentions: "Mentions",
      schedule: "Schedule",
      employee: "Employee",
      evaluation: "Evaluation",
      payment: "Payment",
      hair: "Hair",
      beauty: "Beauty",
      massage: "Massage",
      request: "Request",
      giftcards: "Gift cards",
      all: "All",
      incomplete: "Incomplete",
      complete: "Complete",
      new: "New",
      meets: "Meets",
    },
    taskHeader: {
      total: "Total",
      "starting with \"": "Starting with", // partial support if used
    },
    sidebar: {
      news: "News",
      task: "Task",
      appointments: "Appointments",
      message: "Message",
      notifications: "Notifications",
      offers: "Offers",
      statistics: "Statistics",
      finance: "Finance",
      offices: "Offices",
      employees: "Employees",
      search: "Search",
      users: "Users",
      partners: "Partners",
      map: "Map",
      scholarship: "Scholarship",
      settings: "Settings",
      signout: "Sign out",
    },
    header: {
      notifications: "Notifications",
      addNotifications: "Add Notifications",
      news: "News",
      addNews: "Add News",
      users: "Users",
      addUser: "Add user",
      appointment: "Appointment",
      addAppointment: "Add Appointment",
      addOffice: "Add Office",
      addOffer: "Add Offer",
      addPartner: "Add Partner",
      addEmployee: "Add Employee",
      addTask: "Add Task",
      addMeet: "Add Meet",
      search: "Search",
      settings: "Settings",
      profile: "Profile",
      signOut: "Sign Out",
      employee: "Employee",
      employeeNameAndLastName: "Employee name and last name",
    },
    filters: {
      country: "Country",
      selectCountry: "Select Country",
      city: "City",
      district: "District",
    },
    taskModal: {
      fillAll: "Please fill in all fields before submitting.",
      added: "Task Added Successfully",
      notAdded: "Task Not Added. Try Again",
      taskName: "Task Name",
      taskNamePlaceholder: "Enter task name",
      description: "Description",
      descriptionPlaceholder: "Add more details to this task...",
      assignedBy: "Assigned by",
      dueDate: "Due Date",
      assignee: "Assignee",
      submit: "Submit",
    },
    offers: {
      created: "Offer Created Successfully",
      failed: "Failed to create offer",
      error: "Something went wrong!",
      step1Done: "Step 1 completed successfully!",
      step2Done: "Step 2 completed successfully!",
      finalStepDone: "Final step completed!",
      addOffer: "Add offer",
      country: "Country",
      selectCountry: "Select country...",
      city: "City",
      selectCity: "Select city...",
      category: "Category",
      selectCategory: "Select category...",
      branches: "Branches",
      selectCountryCityFirst: "Select country & city first",
      selectBranches: "Select branches...",
      next: "Next",
      percentage: "Percentage (%)",
      fixed: "Default (Fixed Amount)",
      name: "Name",
      namePlaceholder: "Welcome spring",
      discountType: "Discount type",
      discount: "Discount",
      limitType: "Limit type",
      code: "Code",
      codePlaceholder: "1234-1234-1234-1234",
      startDate: "Start date",
      endDate: "End date",
      createdBy: "Created by",
      createdByPlaceholder: "Sibel Altinosy",
      quantity: "Quantity",
      quantityPlaceholder: "Enter quantity",
      repeat: "Repeat",
      selectRepeat: "Select repeat type",
      sendToApproval: "Send to approval",
    },
  },
  tr: {
    table: {
      noData: "Veri yok",
      name: "İsim",
      discountType: "İndirim türü",
      discount: "İndirim",
      limitType: "Limit türü",
      quantity: "Miktar",
      repeat: "Tekrar",
      code: "Kod",
      category: "Kategori",
      dueDate: "Bitiş Tarihi",
      taskVisibility: "Görev Görünürlüğü",
      assigner: "Atayan",
      assignedBy: "Atayan Kişi",
      status: "Durum",
      partnerName: "Partner Adı",
      gender: "Cinsiyet",
      age: "Yaş",
      phone: "Telefon",
      datetime: "Tarih",
      time: "Saat",
      nextMeet: "Sonraki Görüşme",
      address: "Adres",
      purpose: "Amaç",
      serviceName: "Hizmet Adı",
      serviceCategory: "Kategori",
      appointmentNo: "Randevu No",
      branchDetails: { firstName: "Partner" },
      city: "Şehir",
      district: "İlçe",
      price: "Fiyat",
      type: "Tür",
      country: "Adres",
      authorized: "Yetkili",
      contract: "Sözleşme",
      duration: "Süre",
      contactPersonPhone: "İletişim",
      startDate: "Başlangıç Tarihi",
      endDate: "Bitiş Tarihi",
      employees: "Çalışan",
      payment: "Ödeme",
      paid: "Ödendi",
      mail: "Mail",
      username: "Kullanıcı Adı",
      lastname: "Soyadı",
      countryCol: "Ülke",
      cityCol: "Şehir",
      districtCol: "İlçe",
      town: "Kasaba",
      signUpDate: "Kayıt Tarihi",
      confirmation: "Onay",
      offers: "Teklifler",
      ratings: "Puanlar",
      hiredBy: "İşe Alan",
      wage: "Maaş",
      position: "Pozisyon",
      department: "Departman",
    },
    tabs: {
      task: "Görev",
      mentions: "Bahsetmeler",
      schedule: "Program",
      employee: "Çalışan",
      evaluation: "Değerlendirme",
      payment: "Ödeme",
      hair: "Saç",
      beauty: "Güzellik",
      massage: "Masaj",
      request: "İstek",
      giftcards: "Hediye kartları",
      all: "Tümü",
      incomplete: "Tamamlanmamış",
      complete: "Tamamlandı",
      new: "Yeni",
      meets: "Görüşmeler",
    },
    taskHeader: {
      total: "Toplam",
      "starting with \"": "İle başlayan",
    },
    sidebar: {
      news: "Haberler",
      task: "Görev",
      appointments: "Randevular",
      message: "Mesaj",
      notifications: "Bildirimler",
      offers: "Teklifler",
      statistics: "İstatistikler",
      finance: "Finans",
      offices: "Ofisler",
      employees: "Çalışanlar",
      search: "Ara",
      users: "Kullanıcılar",
      partners: "Ortaklar",
      map: "Harita",
      scholarship: "Burs",
      settings: "Ayarlar",
      signout: "Çıkış",
    },
    header: {
      notifications: "Bildirimler",
      addNotifications: "Bildirim Ekle",
      news: "Haberler",
      addNews: "Haber Ekle",
      users: "Kullanıcılar",
      addUser: "Kullanıcı Ekle",
      appointment: "Randevu",
      addAppointment: "Randevu Ekle",
      addOffice: "Ofis Ekle",
      addOffer: "Teklif Ekle",
      addPartner: "Ortak Ekle",
      addEmployee: "Çalışan Ekle",
      addTask: "Görev Ekle",
      addMeet: "Görüşme Ekle",
      search: "Ara",
      settings: "Ayarlar",
      profile: "Profil",
      signOut: "Çıkış",
      employee: "Çalışan",
      employeeNameAndLastName: "Çalışan adı ve soyadı",
    },
    filters: {
      country: "Ülke",
      selectCountry: "Ülke Seçin",
      city: "Şehir",
      district: "İlçe",
    },
    taskModal: {
      fillAll: "Lütfen göndermeden önce tüm alanları doldurun.",
      added: "Görev Başarıyla Eklendi",
      notAdded: "Görev Eklenemedi. Tekrar Deneyin",
      taskName: "Görev Adı",
      taskNamePlaceholder: "Görev adını girin",
      description: "Açıklama",
      descriptionPlaceholder: "Bu göreve daha fazla detay ekleyin...",
      assignedBy: "Atayan",
      dueDate: "Bitiş Tarihi",
      assignee: "Atanan",
      submit: "Gönder",
    },
    offers: {
      created: "Teklif Başarıyla Oluşturuldu",
      failed: "Teklif oluşturulamadı",
      error: "Bir şeyler yanlış gitti!",
      step1Done: "1. adım başarıyla tamamlandı!",
      step2Done: "2. adım başarıyla tamamlandı!",
      finalStepDone: "Son adım tamamlandı!",
      addOffer: "Teklif ekle",
      country: "Ülke",
      selectCountry: "Ülke seçin...",
      city: "Şehir",
      selectCity: "Şehir seçin...",
      category: "Kategori",
      selectCategory: "Kategori seçin...",
      branches: "Şubeler",
      selectCountryCityFirst: "Önce ülke ve şehir seçin",
      selectBranches: "Şubeleri seçin...",
      next: "İleri",
      percentage: "Yüzde (%)",
      fixed: "Sabit Tutar",
      name: "Ad",
      namePlaceholder: "Bahar hoşgeldin",
      discountType: "İndirim türü",
      discount: "İndirim",
      limitType: "Limit türü",
      code: "Kod",
      codePlaceholder: "1234-1234-1234-1234",
      startDate: "Başlangıç tarihi",
      endDate: "Bitiş tarihi",
      createdBy: "Oluşturan",
      createdByPlaceholder: "Sibel Altinosy",
      quantity: "Miktar",
      quantityPlaceholder: "Miktar girin",
      repeat: "Tekrar",
      selectRepeat: "Tekrar türü seçin",
      sendToApproval: "Onaya gönder",
    },
  },
};

function getFromPath(obj, path) {
  try {
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  } catch {
    return undefined;
  }
}

export const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children, defaultLanguage = "en" }) {
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    try {
      const stored = typeof window !== "undefined" ? localStorage.getItem("language") : null;
      if (stored) {
        // Debug: initial load from storage
        console.log("LanguageContext: loaded from storage ->", stored);
        setLanguage(stored);
      } else {
        console.log("LanguageContext: using default ->", defaultLanguage);
      }
    } catch (_) {}
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== "undefined") localStorage.setItem("language", language);
      // Debug: language changed
      console.log("LanguageContext: language changed ->", language);
    } catch (_) {}
  }, [language]);

  const toggleLanguage = useCallback(() => {
    console.log("LanguageContext: toggle requested");
    setLanguage((prev) => (prev === "en" ? "tr" : "en"));
  }, []);

  const t = useCallback(
    (key, fallback) => {
      const fromActive = getFromPath(resources[language] || {}, key);
      if (fromActive) return fromActive;
      const fromEn = getFromPath(resources.en, key);
      return fromEn || fallback || key;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, toggleLanguage, t }), [language, toggleLanguage, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}


