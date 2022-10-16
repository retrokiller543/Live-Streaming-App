import React from 'react'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import styles from '../../styles/layout/header/index.module.css'

export const Header = () => {
  return (
    <section className={styles.main}>
      <article className={styles.sidebar}>
        <Sidebar />
      </article>
      <article className={styles.navbar}>
        <Navbar />
      </article>
    </section>
  )
}
