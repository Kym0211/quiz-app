import useSWR from 'swr';

// Import useSWR from swr package

// created function to handle API request
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Swr = () => {
  const {
    data: countries,
    error,
    isValidating,
  } = useSWR('https://opentdb.com/api.php?amount=30&category=9&type=multiple', fetcher);

  // Handles error and loading state
  if (error) return <div className='failed'>failed to load</div>;
  if (isValidating) return <div className="Loading">Loading...</div>;

  return (
    <div>
        <h1>Quiz App</h1>
        <ul>
            {countries?.results.map((country) => (
            <li key={country.question}>{country.question}</li>
            ))}
        </ul>
    </div>
  );
};

export default Swr;