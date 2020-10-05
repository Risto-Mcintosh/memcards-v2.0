import { connect } from 'react-redux';
import React from 'react';
import Layout from '../components/Layout';
import AllDecks from '../components/AllDecks';
import { setCurrentDeck } from '../actions/actionCreator';
import Loading from '../components/loading';
import { useDeckList } from '../utils/useClient';

function AllDecksView(props) {
  const { user } = props;
  const { data, isLoading, isFetching } = useDeckList();

  if (!user.isAuthenticated || isLoading || isFetching) {
    return <Loading loader />;
  }

  return (
    <Layout>
      <AllDecks decks={data} {...props} />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    deck: state.deck,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  setCurrentDeck
})(AllDecksView);
