import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './SearchResults.css';
import GeneralSummaryTable from './GeneralSummaryTable/GeneralSummaryTable';
import ArticleCards from './ArticleCards/ArticleCards';
import search_results_large_picture from '../../icons/search_results_large_picture.svg';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSuccessfulAuthorization } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [searchData, setSearchData] = useState(null);
  const [documentsData, setDocumentsData] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!isSuccessfulAuthorization) {
      navigate('/auth');
    }
  }, [isSuccessfulAuthorization, navigate]);

  const fetchData = useCallback(async () => {
    const searchParams = location.state?.searchParams;
    if (!searchParams) {
      console.error('Search parameters are missing.');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setIsError(false);

    try {
      const histogramResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch/histograms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(searchParams),
        credentials: 'omit',
      });
      if (!histogramResponse.ok) throw new Error(`HTTP error! status: ${histogramResponse.status}`);
      const histogramData = await histogramResponse.json();

      const publicationIdsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/objectsearch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(searchParams),
        credentials: 'omit',
      });
      if (!publicationIdsResponse.ok) throw new Error(`HTTP error! status: ${publicationIdsResponse.status}`);
      
      const publicationIdsData = await publicationIdsResponse.json();
      const publicationIds = publicationIdsData.items.map(item => item.encodedId);
      
      console.log("количество публикаций:", publicationIds.length);

      const documentsResponse = await fetch('https://gateway.scan-interfax.ru/api/v1/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify({ ids: publicationIds }),
        credentials: 'omit',
      });
      
      if (!documentsResponse.ok) throw new Error(`HTTP error! status: ${documentsResponse.status}`);
      
      const documentsData = await documentsResponse.json();

      setSearchData(histogramData);
      setDocumentsData(documentsData);
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error.message);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [location.state?.searchParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="search-results-content">
      
      {isLoading ? (
        <>
          <div className="search-results-title-block">
            <div className="search-results-title-text">
              <h1 className="h1-search-results-page">Ищем. Скоро будут результаты</h1>
              <p className="p-search-results-page-title-block">
                Поиск может занять некоторое время, просим сохранять терпение.
              </p>
            </div>
            <img
              className="search-results-large-picture"
              src={search_results_large_picture}
              alt="Search results picture"
            />
          </div>
          <GeneralSummaryTable searchData={searchData} isLoading={isLoading} isError={false} />
        </>
      ) : isError ? (
        <GeneralSummaryTable searchData={searchData} isLoading={false} isError={true} />
      ) : (
        <>
          <GeneralSummaryTable searchData={searchData} isLoading={false} isError={false} />
          <ArticleCards documentsData={documentsData} />
        </>
      )}
      
    </div>
  );
};

export default SearchResults;

