import React from 'react';
import Layout from '../components/Layout';
import AllDecks from '../components/AllDecks';
import Loading from '../components/loading';
import { useDeckList } from '../utils/useClient';
import { DecksViewProvider } from './allDecksView-context';

function AllDecksView(props) {
  const { data, isLoading, isFetching } = useDeckList();

  if (isLoading || isFetching) {
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
