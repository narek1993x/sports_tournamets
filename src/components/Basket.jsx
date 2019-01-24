import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon, Modal, Empty } from 'antd';
import { removeTournamentFromBasket } from '../store/tournaments/actions';

const confirm = Modal.confirm;

const Basket = ({ savedTournamets, dispatch }) => {
  const showConfirm = ({ title, id }) => {
    confirm({
      title: 'Are you sure delete this tournament?',
      content: title,
      onOk() {
        dispatch(removeTournamentFromBasket(id));
      },
      onCancel() {}
    });
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
        <Icon type="close-circle" theme="filled" onClick={() => showConfirm({ title, id })} />
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
