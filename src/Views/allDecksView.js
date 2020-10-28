import React from 'react';
import Layout from 'components/Layout';
import AllDecks from '../components/AllDecks';
import Loading from '../components/loading';
import { useDeckList } from '../utils/client';
import { DecksViewProvider } from './allDecksView-context';

function AllDecksView() {
  const {
    data,
    isLoading,
    isFetching,
    isFetchedAfterMount,
    isError,
    isStale
  } = useDeckList();

  if (isLoading || isFetching) {
    return <Loading loader />;
  }

  if (isError) {
    return <h1>Something Went Wrong :(</h1>;
  }

  console.log({ isStale });
  return (
    <DecksViewProvider>
      <Layout>
        <AllDecks decks={data} />
      </Layout>
    </DecksViewProvider>
  );
}

export default AllDecksView;
