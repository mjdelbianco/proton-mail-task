import styles from '../styles/Home.module.css';
import Plan from '../components/Plan';
import CurrencySelector from '../components/CurrencySelector';
import CycleSelector from '../components/CycleSelector';
import { useState } from 'react';

const Home = ({ plans }) => {
  const [billingCycle, setBillingCycle] = useState(12);

  const handleCycleChange = cycle => {
    setBillingCycle(cycle);
  };

  const [currency, setCurrency] = useState('EUR');

  const handleCurrencyChange = currency => {
    setCurrency(currency);
  };

  return (
    <div className={styles.main}>
      <h1>Plans & prices</h1>

      <div className={styles.selectors}>
        <CycleSelector handleCycleChange={handleCycleChange} currency={currency} />
        <CurrencySelector handleCurrencyChange={handleCurrencyChange} />
      </div>

      <div className={styles.container}>
        <Plan billingCycle={billingCycle} currency={currency} />
        {plans
          .filter(plan => ['plus', 'professional', 'visionary'].some(el => plan.Name === el))
          .map(plan => (
            <Plan plan={plan} key={plan.ID} billingCycle={billingCycle} currency={currency} />
          ))}
      </div>
    </div>
  );
};

export default Home;

export async function getServerSideProps({ query }) {
  const { currency } = query;
  console.log(currency);
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json;charset=utf-8');
  myHeaders.append('x-pm-appversion', 'Other');
  myHeaders.append('x-pm-apiversion', '3');
  myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default',
  };

  const res = await fetch(`https://api.protonmail.ch/payments/plans?Currency=${currency}`, myInit);

  const resJSON = await res.json();
  return {
    props: {
      plans: resJSON.Plans,
    },
  };
}
