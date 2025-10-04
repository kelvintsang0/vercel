import "./globals.css";
export const metadata = { title: "Kelvin Tsang — Data, AI & Ops" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
