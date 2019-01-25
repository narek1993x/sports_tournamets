import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Popconfirm } from 'antd';

const TournamentItem = ({ id, title, src, description, isChecked, isHaveDeleteButton, cutNumber = 80, onConfirm }) => (
  <div className="tournament-item">
    <div className="tournament-item-content">
      <img src={src} alt="img" />
      <div>
        <h5>{title}</h5>
        <span>{description.length > cutNumber ? `${description.substr(0, cutNumber)}...` : description}</span>
      </div>
    </div>
    {isHaveDeleteButton && (
      <Popconfirm
        placement="top"
        title={`Are you sure to delete this tournament "${title}"`}
        onConfirm={() => onConfirm({ title, id })}
        okText="Yes"
        cancelText="No"
      >
        <Icon type="close-circle" theme="filled" />
      </Popconfirm>
    )}
    {isChecked && <Icon type="check" />}
  </div>
);

TournamentItem.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  src: PropTypes.string,
  description: PropTypes.string,
  isChecked: PropTypes.bool,
  isHaveDeleteButton: PropTypes.bool,
  cutNumber: PropTypes.number,
  onConfirm: PropTypes.func
};

export default TournamentItem;
