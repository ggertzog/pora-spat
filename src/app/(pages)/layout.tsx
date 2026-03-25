import { Footer } from "@/core/components/layout/Footer/Footer"
import { Header } from "@/core/components/layout/Header/Header"
import styles from './layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )
}

export default Layout;