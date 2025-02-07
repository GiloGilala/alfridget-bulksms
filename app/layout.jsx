import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

// Create a client

export const metadata = {
  title: "Regel Technology",
  description: "SMS Service",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToasterProvider />
        {/* <QueryClientProvider client={queryClient}> */}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={["green", "light", "dark"]}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        {/* </QueryClientProvider> */}
      </body>
    </html>
  );
};

export default RootLayout;
