import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/global.scss'
import '../styles/syntax-coloring.scss'
import styles from '../styles/shared.module.scss'

const RootLayout = ({
  children,
}: {
  children: React.ReactNode,
}) => (
  <html lang="ja">
    <body>
      <div className={styles.container}>
        <Header />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    </body>
  </html>
)

export default RootLayout
