import styles from '../styles/Home.module.css';

const Plan = ({ plan, billingCycle, currency }) => {
  const freePlan = {
    Name: 'Free',
    Id: new Date(),
    Description: 'The basics for private and secure communications',
    Currency: 'EUR',
    Users: 1,
    Storage: 500,
    Adresses: 1,
    Domains: 0,
  };

  const { Name, Pricing } = plan || freePlan;

  const planInfo = {
    Description:
      Name === 'plus'
        ? 'Full-featured mailbox with advanced protection'
        : Name === 'professional'
        ? 'ProtonMail for professionals and businesses'
        : Name === 'visionary' && 'ProtonMail for families and small businesses',
    Users: Name === 'plus' ? 1 : Name === 'professional' ? '1 - 5000' : Name === 'visionary' && 6,
    Storage: Name === 'plus' ? 5 : Name === 'professional' ? 5 : Name === 'visionary' && 20,
    Adresses: Name === 'plus' ? 5 : Name === 'professional' ? 5 : Name === 'visionary' && 20,
    Domains: Name === 'plus' ? 1 : Name === 'professional' ? 2 : Name === 'visionary' && 10,
    Features:
      Name === 'plus'
        ? 'Supports folders, labels, filters, auto-reply, IMAP/SMTP and more'
        : Name === 'professional'
        ? 'Catch all email, multiuser management, priority support and more'
        : Name === 'visionary' && 'Includes all features',
    Support: Name === 'visionary' && 'Priority support',
  };

  return (
    <div className={styles.card}>
      <div>
        <h6>{Name === 'plus' ? 'MOST POPULAR' : ''}</h6>
        <h4 className={Name === 'plus' && styles.mostPopular}>{Name.toUpperCase()}</h4>
        {Pricing ? (
          <>
            <p>
              {currency === 'EUR' ? '€' : currency === 'CHF' ? 'Fr.' : '$'}
              <span>{Math.round(((Pricing[1] / 12) * 100) / 100)}</span>/mo
            </p>
            <p>
              Billed as {currency === 'EUR' ? '€' : currency === 'CHF' ? 'Fr.' : '$'}
              {Pricing[billingCycle]} per year
            </p>
          </>
        ) : (
          <p>
            {currency === 'EUR' ? '€' : currency === 'CHF' ? 'Fr.' : '$'}
            <span>0</span>/mo
          </p>
        )}
      </div>
      <p className={styles.description}>{planInfo.Description || freePlan.Description}</p>

      <ul>
        <li>{planInfo.Users || freePlan.Users} user</li>
        <li>
          {planInfo.Storage
            ? `${planInfo.Storage} GB storage ${Name === 'professional' ? 'per user' : ''}`
            : `${freePlan.Storage} MB storage`}
        </li>
        <li>
          {planInfo.Adresses
            ? `${planInfo.Adresses} addresses ${Name === 'professional' ? 'per user' : ''}`
            : `${freePlan.Adresses} address`}
        </li>
        <li>
          {planInfo.Domains
            ? `Supports ${planInfo.Domains} ${planInfo.Domains !== 1 ? 'domains' : 'domain'}`
            : 'No domain support'}
        </li>
        {planInfo.Features && <li>{planInfo.Features}</li>}
        {Name === 'visionary' && <li>Priority support</li>}

        <li>{Name === 'visionary' ? 'Includes ProtonVPN' : 'ProtonVPN (optional)'}</li>
      </ul>

      <button className={styles.button}>Select</button>
    </div>
  );
};

export default Plan;
