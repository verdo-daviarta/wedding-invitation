import styles from '../../styles/invitation.module.css';
import { invitation, bankAccounts } from '../../data/wedding';
import { CopyButton } from '../../components/copy-button';
import { Gift } from 'lucide-react';

export function GiftSection() {
  return (
    <section
      aria-label="Wedding Gift"
      id="gift"
      tabIndex={-1}
      className={`${styles.section} ${styles.giftSection}`}
    >
      <h2 className={styles.giftTitle}>Wedding Gift</h2>

      <div className={styles.bankList}>
        {bankAccounts.map((account) => (
          <article key={account.bank}>
            <span className={styles.bankMark}>
              {/* Static SVG logos do not need a server image optimizer. */}
              {/* oxlint-disable-next-line nextjs/no-img-element */}
              <img
                className={styles.bankLogo}
                width={50}
                height={50}
                loading="lazy"
                decoding="async"
                src={account.logo}
                alt={`Bank ${account.bank}`}
              />
            </span>
            <div>
              <strong>A.N {account.holder}</strong>
              <span>{account.displayNumber}</span>
            </div>
            <CopyButton
              ariaLabel={`Salin nomor rekening ${account.owner}`}
              className={styles.copyButton}
              value={account.number}
            />
          </article>
        ))}
        <article className={styles.giftDelivery}>
          <span className={`${styles.bankMark} ${styles.deliveryMark}`}>
            <Gift aria-hidden="true" size={24} />
          </span>
          <div>
            <strong>Kirim Kado</strong>
            <span>
              Jln Dahlia 6, no 110,  RT 1 RW 15,  Perumnas Palur, Ngringo, Jaten, Karanganyar 57772
            </span>
          </div>
          <CopyButton
            ariaLabel="Salin alamat pengiriman kado"
            className={styles.copyButton}
            value={`${invitation.venue}, ${invitation.address}`}
          />
        </article>
      </div>
    </section>
  );
}
