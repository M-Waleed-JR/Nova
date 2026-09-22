import "./globals.css";
import { QuickViewProvider } from "@/components/products/QuickViewContext";
import QuickViewModal from "@/components/products/QuickViewModal";
import Footer from "@/components/products/Footer";
export const metadata = {
  title: "Nova",
  description: "Next-generation electronics.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <QuickViewProvider>
          {children}
          <QuickViewModal />
        </QuickViewProvider>
        <Footer />
      </body>
    </html>
  );
}
