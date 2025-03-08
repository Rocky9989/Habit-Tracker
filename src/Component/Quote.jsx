import { useSelector } from 'react-redux';
import { habitSelector } from '../Redux/Reducer/habitReducer';

const Quote = () => {
  // Get the quote from Redux state
  const { quote } = useSelector(habitSelector);

  return (
    <div className="w-full lg:w-4/5 h-fit mt-4 mb-2 shadow-md rounded bg-indigo-400 text-white p-2">
      <h1 className="text-sm">Quote of the day:</h1>

      <div className="w-full text-center text-lg font-semibold">
        {quote?.quote || 'Loading quote...'}
      </div>

      <h1 className="float-right font-semibold text-black">
        by: {quote?.author || 'Unknown'}
      </h1>
    </div>
  );
};

export default Quote;
