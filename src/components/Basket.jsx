import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Empty } from 'antd';
import { removeTournamentFromBasket } from '../store/tournaments/actions';

const Basket = ({ savedTournamets, dispatch }) => {
  const handleRemove = (tournamentId) => {
    dispatch(removeTournamentFromBasket(tournamentId));
  };

  let content = <Empty className="empty-content" />;

  if (savedTournamets.length) {
    content = savedTournamets.map(({ image, title, description, id }) => (
      <div className="tournament-item" key={id}>
        <div className="tournament-item-content">
          <img src={image} alt="img" />
          <div>
            <h5>{title}</h5>
            <span>{description.length > 60 ? `${description.substr(0, 60)}...` : description}</span>
          </div>
        </div>
        <Icon type="close-circle" theme="filled" onClick={() => handleRemove(id)} />
      </div>
    ));
  }

  return <div className="Basket">{content}</div>;
};

Basket.propTypes = {
  savedTournamets: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  savedTournamets: state.tournaments.savedTournamets
});

export default connect(mapStateToProps)(Basket);
