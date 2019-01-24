import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Empty, Popconfirm, message } from 'antd';
import { removeTournamentFromBasket } from '../store/tournaments/actions';

const Basket = ({ savedTournamets, dispatch }) => {
  const confirmHandler = ({ title, id }) => {
    dispatch(removeTournamentFromBasket(id));
    message.success(`${title} is deleted.`);
  };

  let content = <Empty className="empty-content" description={<span>No Saved Tournaments</span>} />;

  if (savedTournamets.length) {
    content = savedTournamets.map(({ image, title, description, id }) => (
      <div className="tournament-item" key={id}>
        <div className="tournament-item-content">
          <img src={image} alt="img" />
          <div>
            <h5>{title}</h5>
            <span>{description.length > 80 ? `${description.substr(0, 80)}...` : description}</span>
          </div>
        </div>
        <Popconfirm
          placement="top"
          title={`Are you sure to delete this tournament "${title}"`}
          onConfirm={() => confirmHandler({ title, id })}
          okText="Yes"
          cancelText="No"
        >
          <Icon type="close-circle" theme="filled" />
        </Popconfirm>
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
