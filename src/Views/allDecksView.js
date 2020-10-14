import React from 'react';
import Layout from 'components/Layout';
import AllDecks from '../components/AllDecks';
import Loading from '../components/loading';
import { useDeckList } from '../utils/client';
import { DecksViewProvider } from './allDecksView-context';

function AllDecksView(props) {
  const { data, isLoading, isFetching, isFetchedAfterMount } = useDeckList();

  if (isLoading || isFetching || !isFetchedAfterMount) {
    return <Loading loader />;
  }

  return (
    <DecksViewProvider>
      <Layout>
        <AllDecks decks={data} {...props} />
      </Layout>
    </DecksViewProvider>
  );
}

export default AllDecksView;
