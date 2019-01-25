import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Select, Spin, Icon } from 'antd';
import { getTournamentsByTerm, addTournamentInBasket } from '../store/tournaments/actions';
import TournamentItem from './TournamentItem';

const Option = Select.Option;

class TournamentSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchLoading: false,
      isOpen: false,
      showValue: false,
      searchTerm: '',
      selectedTournaments: this.getSavedTournamets(props.savedTournamets)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.savedTournamets.length !== nextProps.savedTournamets.length) {
      this.setState({ selectedTournaments: this.getSavedTournamets(nextProps.savedTournamets) });
    }
  }

  getSavedTournamets = (tournamets) => {
    return tournamets.map((t) => t.id);
  };

  handleSelect = (id) => {
    const selectedTournaments = [...this.state.selectedTournaments];

    let newSelectedTournaments;
    if (selectedTournaments.includes(id)) {
      newSelectedTournaments = selectedTournaments.filter((t) => t !== id);
    } else {
      newSelectedTournaments = [...selectedTournaments, id];
    }
    this.props.dispatch(addTournamentInBasket(id));
    this.setState({ selectedTournaments: newSelectedTournaments, isOpen: true });
  };

  handleSearch = (value) => {
    this.setState({ searchLoading: true, searchTerm: value, showValue: true });

    if (this.asyncTimeOut) clearTimeout(this.asyncTimeOut);

    if (value.length > 2) {
      this.asyncTimeOut = setTimeout(() => {
        this.props.dispatch(getTournamentsByTerm(value)).then(() => this.setState({ searchLoading: false }));
      }, 1000);
    }
  };

  handleBlur = () => {
    this.setState({ isOpen: false });
  };

  handleClear = () => {
    this.setState({ searchTerm: '', isOpen: true });
  };

  render() {
    const { loading, searchOptions } = this.props;
    const { searchLoading, searchTerm, showValue, isOpen, selectedTournaments } = this.state;

    const loader = (loading || searchLoading) && !!searchTerm;

    const notFoundContent = loader ? <Spin /> : !searchOptions.length && searchTerm ? 'No Tournament Found' : 'Empty';
    const cutNumber = window.innerWidth < 999 ? 60 : 90;

    return (
      <Select
        showSearch
        showArrow={false}
        allowClear={!!searchTerm}
        {...(isOpen ? { open: isOpen } : {})}
        {...(showValue ? { value: searchTerm } : {})}
        className="tournament-selector"
        placeholder="Search a tournament"
        clearIcon={searchTerm && <Icon type="close-circle" theme="filled" onClick={this.handleClear} />}
        onSelect={this.handleSelect}
        onSearch={this.handleSearch}
        onBlur={this.handleBlur}
        filterOption={() => true}
        notFoundContent={notFoundContent}
      >
        {searchOptions.map(({ image, title, description, id }) => (
          <Option value={id} key={id}>
            <TournamentItem
              title={title}
              src={image}
              description={description}
              cutNumber={cutNumber}
              isChecked={selectedTournaments.includes(id)}
            />
          </Option>
        ))}
      </Select>
    );
  }
}

TournamentSelector.propTypes = {
  loading: PropTypes.bool,
  searchOptions: PropTypes.array,
  dispatch: PropTypes.func
};

const mapStateToProps = (state) => ({
  loading: state.tournaments.loading,
  searchOptions: state.tournaments.searchResults,
  savedTournamets: state.tournaments.savedTournamets
});

export default connect(mapStateToProps)(TournamentSelector);
