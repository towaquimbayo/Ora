import { Inter } from "next/font/google"

import '@/styles/globals.css'
import Nav from "@/components/Nav"
import Provider from "@/components/Provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
      <body className={inter.className}>
          <Provider>
              <main className='app'>
                  <Nav />
                  {children}
              </main>
          </Provider>
      </body>
  </html>
);

export default RootLayout;