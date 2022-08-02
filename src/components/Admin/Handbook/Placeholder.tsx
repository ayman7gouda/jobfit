import styles from './Placeholder.module.css';

export const Placeholder = (props: any) => {
  const left = props.depth * 24;
  return <div className={styles.root} style={{ left }}></div>;
};
