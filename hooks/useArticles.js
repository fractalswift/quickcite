import { useEffect, useState } from 'react';
import springer from '../api/springer';
import api_keys from '../env/api_keys.json';

export default () => {
  const [articles, setArticles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchedTerm, setSearchedTerm] = useState('');
  const [filterOpenAccess, setFilterOpenAccess] = useState(false);

  const searchApi = async (searchTerm) => {
    try {
      const response = await springer.get('/metadata/json', {
        params: {
          api_key: api_keys.api_key,
          q: `keyword:${searchTerm}`,
        },
      });
      setArticles(response.data.records);
      setSearchedTerm(searchTerm);
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };

  return [
    searchApi,
    articles,
    errorMessage,
    searchedTerm,
    filterOpenAccess,
    setFilterOpenAccess,
  ];
};
