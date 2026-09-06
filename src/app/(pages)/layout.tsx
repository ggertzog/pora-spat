//components
import { Footer } from "@/core/components/common/Footer/Footer";
import { Header } from "@/core/components/common/Header/Header";

//styles
import css from "./layout.module.scss";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={css.layout}>
      <Header className={css.header} />
      <main className={css.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
