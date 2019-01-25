import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Empty, message } from 'antd';
import { removeTournamentFromBasket } from '../store/tournaments/actions';
import TournamentItem from './TournamentItem';

const Basket = ({ savedTournamets, dispatch }) => {
  const confirmHandler = ({ title, id }) => {
    dispatch(removeTournamentFromBasket(id));
    message.success(`${title} is deleted.`);
  };

  let content = <Empty className="empty-content" description={<span>No Saved Tournaments</span>} />;

  if (savedTournamets.length) {
    content = savedTournamets.map(({ image, title, description, id }) => (
      <TournamentItem
        key={id}
        id={id}
        title={title}
        src={image}
        description={description}
        onConfirm={confirmHandler}
        isHaveDeleteButton
      />
    ));
  }

  return <div className="basket">{content}</div>;
};

Basket.propTypes = {
  savedTournamets: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  savedTournamets: state.tournaments.savedTournamets
});

export default connect(mapStateToProps)(Basket);
