import Footer from "@/components/shared/footer/Footer";
import BottomNavbar from "@/components/shared/navbar/BottomNavbar";
import Navbar from "@/components/shared/navbar/Navbar";
import PageTransition from "@/components/ui/PageTransition";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PageTransition>
            <Navbar />
            <BottomNavbar />
            {children}
            <Footer />
        </PageTransition>
    );
}