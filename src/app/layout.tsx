import "./globals.css";

export const metadata = { title: "Kelvin Tsang — Data & AI Project Manager" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
