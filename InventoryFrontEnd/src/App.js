import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import "./Mobile.css";
import Login from "./Login";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Product from "./components/Product";
import Bill from "./components/Bill";
import VisitBillPage from "./components/VisitPage";
import SupplierPage from "./components/Supplier";
import SupplierDuplicatePage from "./components/SupplierList";
import ItemsPage from "./components/SuppliedItemLIst";
import Type from "./components/Type";
import LowStock from "./components/Lowstock";
import StockOut from "./components/StockOut";
import Quotation from "./components/Quotation";
import Invoice from "./components/Invoice";
import Service from "./components/ServiceBill";
import ServiceBillView from "./components/ServiceBillView";

function Layout() {
  const location = useLocation();

  // Hide layout on login page
  const hideLayout = location.pathname === "/";

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // Update isMobile on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setIsOpen(false); // Close sidebar by default on mobile
      else setIsOpen(true); // Open by default on desktop
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const contentStyle = {
    marginLeft: hideLayout ? "0" : isMobile ? "0" : isOpen ? "220px" : "70px",
    padding: hideLayout ? "0" : isMobile ? "80px 10px 10px 10px" : "80px 20px 20px 20px",
    minHeight: "100vh",
    background: "#0f172a", // Solid dark background (no white)
    transition: "all 0.3s ease",
  };

  return (
    <>
      {!hideLayout && (
        <div className={`sidebar-container ${isMobile ? "mobile-mode" : ""}`}>
          <Sidebar isOpen={isOpen} isMobile={isMobile} />
          {isMobile && isOpen && (
            <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />
          )}
        </div>
      )}

      <div style={contentStyle} className="main-content">
        {!hideLayout && (
          <Header
            toggleSidebar={toggleSidebar}
            isOpen={isOpen}
            isMobile={isMobile}
          />
        )}

        <Routes>
          <Route path="/" element={<Login isMobile={isMobile} />} />
          <Route path="/dashboard" element={<Dashboard isMobile={isMobile} />} />
          <Route path="/product" element={<Product isMobile={isMobile} />} />
          <Route path="/bill" element={<Bill isMobile={isMobile} />} />
          <Route path="/billreport" element={<VisitBillPage isMobile={isMobile} />} />
          <Route path="/supplier" element={<SupplierPage isMobile={isMobile} />} />
          <Route path="/supplierList" element={<SupplierDuplicatePage isMobile={isMobile} />} />
          <Route path="/itemlist" element={<ItemsPage isMobile={isMobile} />} />
          <Route path="/type" element={<Type isMobile={isMobile} />} />
          <Route path="/lowstock" element={<LowStock isMobile={isMobile} />} />
          <Route path="/stockout" element={<StockOut isMobile={isMobile} />} />
          <Route path="/quotation" element={<Quotation isMobile={isMobile} />} />
          <Route path="/invoice" element={<Invoice isMobile={isMobile} />} />
          <Route path="/service" element={<Service isMobile={isMobile} />}/>
          <Route path="/serviceBillView" element={<ServiceBillView isMobile={isMobile} />}/>
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;