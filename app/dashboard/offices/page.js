"use client";
import CountrySelector from "@/components/common/CountrySelector";
import OfficesDatadTable from "@/components/common/OfficesDatadTable";
import TaskHeader from "@/components/common/TaskHeader";
import { officesColumns } from "@/components/content/ContentData";
import OfficesModal from "@/components/modal/OfficesModal";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Header from "../../../components/Header";
import { useLanguage } from "@/context/LanguageContext";
import Loader from "@/components/Loader";

// ⬇️ Make sure this path matches your project structure
import Paginate from "@/components/common/Paginate";

const Index = () => {
  const { t } = useLanguage();
  // Table and UI states
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [offices, setOffices] = useState([]);
  const [loading, setLoading] = useState(false);

  const { theme } = useContext(ThemeContext);
  const [country, setCountry] = useState(null);
  const [city, setCity] = useState(null); // ✅ added to fix setCity usage
  const [search, setSearch] = useState("");
  const [callApi, setCallApi] = useState(false);

  // ✅ Hold the items for the current page
  const [pagedOffices, setPagedOffices] = useState([]);

  // ✅ Fetch offices from API
  useEffect(() => {
    const handleGetOffices = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/Admin/Office/Get-Offices`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true",
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          }
        );

        const data = await response.json();
        console.log("📦 API Raw Response:", data);

        if (data.status === 200) {
          setOffices(data?.data || []);
          console.log("✅ Offices Loaded:", data?.data);
        } else {
          toast.error("Failed to fetch offices");
        }
      } catch (error) {
        console.error("❌ API Error:", error);
        toast.error("Offices Not Fetched. Please Try Again");
      } finally {
        setLoading(false);
      }
    };

    handleGetOffices();
  }, [callApi]);

  // ✅ Apply filters (country + search)
  const filteredOffices = useMemo(() => {
    console.log("🔍 Current Filters:", { country, search });

    const result = offices.filter((office) => {
      const matchCountry = country
        ? office.countryCode === country.value || office.country === country.label
        : true;

      const s = search?.toLowerCase();
      const matchSearch = s
        ? office.name?.toLowerCase().includes(s) ||
          office.city?.toLowerCase().includes(s)
        : true;

      return matchCountry && matchSearch;
    });

    console.log("📊 Filtered Offices:", result);
    return result;
  }, [offices, country, search]);

  // Modal functions
  const openOfficesModal = () => setIsOpen(true);
  const closeOfficesModal = () => setIsOpen(false);

  return (
    <>
      <Header
        title={t('sidebar.offices')}
        buttonLabel={t('header.addOffice')}
        onButtonClick={openOfficesModal}
        onSearch={setSearch} // 👈 live search
      />

      <div className="md:p-5 mt-5 p-2">
        <div className="flex items-center justify-between mb-4">
          <TaskHeader title="Total" count={filteredOffices.length} />

          <div className="flex items-center gap-4">
            <CountrySelector
              countryValue={country}
              onCountryChange={(val) => {
                console.log("🌍 Country Selected:", val);
                setCountry(val);
              }}
              onCityChange={(val) => {
                console.log("🏙️ City Selected:", val);
                setCity(val);
              }}
            />
          </div>
        </div>

        <div className="mt-5">
          {loading ? (
            <Loader />
          ) : (
            <OfficesDatadTable
              columns={officesColumns}
              // 👇 Use paginated items if available, otherwise show full filtered list
              data={pagedOffices.length ? pagedOffices : filteredOffices}
              selectedRows={selectedRows}
              showCheckboxes={false}
              onRowSelect={(rows) => {
                console.log("✅ Rows Selected:", rows);
                setSelectedRows(rows);
              }}
            />
          )}

          <div className="flex justify-center items-center mt-4">
            {/* 👇 Wire up your Paginate component */}
            {filteredOffices.length >= 6 && (
            <Paginate
              data={filteredOffices}
              onPageDataChange={setPagedOffices}
              // itemsPer
              
             // Page={10} // uncomment if your component supports it
            />
            )}
          </div>
        </div>
      </div>

      <OfficesModal
        isOpen={isOpen}
        onClose={closeOfficesModal}
        setCallApi={setCallApi}
      />
    </>
  );
};

export default Index;