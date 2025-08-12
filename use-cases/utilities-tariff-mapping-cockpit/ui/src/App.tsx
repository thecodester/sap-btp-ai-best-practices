import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ValidationProvider } from "@/context/ValidationContext";
import { MainLayout } from "@/components/MainLayout";
import Home from "@/routes/Home";
import Step1UploadPage from "@/routes/Step1Upload";
import Step2ConfigPage from "@/routes/Step2Config";

function App() {
  return (
    <BrowserRouter>
      <ValidationProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/validate/step1-upload" element={<Step1UploadPage />} />
            <Route path="/validate/step2-config" element={<Step2ConfigPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </MainLayout>
      </ValidationProvider>
    </BrowserRouter>
  );
}

export default App;
