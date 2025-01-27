import React from 'react';
import styles from './Main.module.scss';

interface MainProps {
  children?: React.ReactNode;
}

const Main: React.FC<MainProps> = ({ children }) => {
  return <div className={styles.Main}>{children}</div>;
};

export default Main;
