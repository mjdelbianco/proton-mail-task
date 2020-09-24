import { useRouter } from 'next/router';

const CurrencySelector = ({ handleCurrencyChange }) => {
  const router = useRouter();

  return (
    <select
      value={router.query.currency}
      onChange={e => {
        router.push({ query: { currency: e.target.value } });
        handleCurrencyChange(e.target.value);
      }}
    >
      <option value="EUR">€ EUR</option>
      <option value="CHF">Fr. CHF</option>
      <option value="USD">$ USD</option>
    </select>
  );
};

export default CurrencySelector;
