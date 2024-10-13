import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Data from "@/components/demo/Data";
import DetailTransaction from "@/components/demo/DetailTransaction";
import History from "@/components/demo/History";
import Content from "@/pages/content";
import GenerateQRCode from "@/pages/generate-qrcode";
import MainContent from "@/pages/main-content";

const _Routes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MainContent />} />
        <Route exact path="/shop" element={<Content />} />
        <Route
          exact
          path="/shop/detail-transaction"
          element={<DetailTransaction />}
        />
        <Route exact path="/data" element={<Data />} />
        <Route exact path="/history" element={<History />} />
        <Route exact path="/create-qr" element={<GenerateQRCode />} />
      </Routes>
    </Router>
  );
};

export default _Routes;
