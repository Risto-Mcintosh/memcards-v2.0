import React from 'react';
import Layout from 'components/Layout';
import AllDecks from '../components/AllDecks';
import Loading from '../components/loading';
import { useDeckList } from '../utils/client';

function AllDecksView() {
  const { data, isLoading, isFetching, isError } = useDeckList();

  if (isLoading || isFetching) {
    return <Loading loader />;
  }

  if (isError) {
    return <h1>Something Went Wrong :(</h1>;
  }

  return (
    <Layout>
      <AllDecks decks={data} />
    </Layout>
  );
}

export default AllDecksView;
