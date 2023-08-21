import styles from './styles.module.scss'

export function EmptyPlayer() {
  return (
    <div className={styles.emptyPlayer}>
      <strong>Selecione um podcast para ouvir</strong>
    </div>
  )
}
