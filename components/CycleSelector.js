const CycleSelector = ({ handleCycleChange }) => {
  return (
    <select defaultValue={12} onChange={e => handleCycleChange(e.target.value)}>
      <option value={1}>Monthly</option>
      <option value={12}>Annually</option>
      <option value={24}>2 years</option>
    </select>
  );
};

export default CycleSelector;
