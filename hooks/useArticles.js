import { useEffect, useState } from 'react';
import springer from '../api/springer';
import api_keys from '../env/api_keys.json';

export default () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchedTerm, setSearchedTerm] = useState('');
  const [filterOpenAccess, setFilterOpenAccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchApi = async (searchTerm) => {
    setLoading(true);
    try {
      const response = await springer.get('/openaccess/json', {
        params: {
          api_key: api_keys.api_key,
          q: `keyword:${searchTerm}`,
          p: 20,
        },
      });

      setArticles(response.data.records);
      setSearchedTerm(searchTerm);
      setLoading(false);
    } catch (err) {
      setErrorMessage('Something went wrong');
      setLoading(false);
    }
  };

  return [
    searchApi,
    articles,
    errorMessage,
    searchedTerm,
    filterOpenAccess,
    setFilterOpenAccess,
    loading,
  ];
};
