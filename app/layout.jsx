import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToasterProvider } from "@/lib/ToasterProvider";

const inter = Inter({ subsets: ["latin"] });

// Create a client
const queryClient = new QueryClient();

export const metadata = {
  title: "Alfridget Bulk SMS",
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
