import { connect } from 'react-redux';
import React from 'react';
import Layout from '../components/Layout';
import AllDecks from '../components/AllDecks';
import {
  setCurrentDeck,
  clearCard,
  deleteDeck,
  getCard
} from '../actions/actionCreator';
import Loading from '../components/loading';
import { useDeckList } from '../utils/useClient';

function AllDecksView(props) {
  const { user } = props;
  const { data, isLoading, isFetchedAfterMount } = useDeckList();
  // console.log(data);
  // useEffect(() => {
  //   clearCard();
  // });

  if (!user.isAuthenticated || isLoading || !isFetchedAfterMount) {
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
    // decks: state.decks,
    deck: state.deck,
    user: state.user
  };
}

export default connect(mapStateToProps, {
  setCurrentDeck,
  clearCard,
  deleteDeck,
  getCard
})(AllDecksView);
