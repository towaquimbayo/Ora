import { Inter } from "next/font/google";
import { Suspense } from "react";
import "@/styles/globals.css";
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ora",
  description: "Workflow supervised by AI",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body className={inter.className}>
      <Provider>
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <Nav />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
