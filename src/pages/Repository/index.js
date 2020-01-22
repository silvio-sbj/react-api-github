import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles';

export default class Repository extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repository: {},
      issues: [],
      loading: true,
      filters: [
        {
          value: 'all',
          checked: false,
          title: 'All',
        },
        {
          value: 'open',
          checked: true,
          title: 'Open',
        },
        {
          value: 'closed',
          checked: false,
          title: 'Closed',
        },
      ],
      filterSelected: 'open',
      page: 1,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repo);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: 'open',
          per_page: 6,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  applyFilter = async () => {
    const repoName = this.state.repository.full_name;

    const { filterSelected, page } = this.state;

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filterSelected,
        per_page: 6,
        page,
      },
    });

    this.setState({ issues: issues.data });
  };

  handleFilterClick = async e => {
    const { filters } = this.state;
    const filterSelected = e.target.value;

    await filters.map(item => {
      if (item.value === filterSelected) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });

    await this.setState({ filters, filterSelected, page: 1 });

    this.applyFilter();
  };

  handlePage = async action => {
    const { page } = this.state;
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    });
    this.applyFilter();
  };

  render() {
    const { repository, issues, loading, page, filters } = this.state;

    if (loading) {
      return <Loading>Carregando...</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueFilter onChange={this.handleFilterClick}>
          {filters.map(f => (
            <div>
              <input
                type="radio"
                name="filter"
                value={f.value}
                checked={f.checked}
              />
              {f.title}
            </div>
          ))}
        </IssueFilter>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>

        <PageActions>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button
            type="button"
            disabled={issues < 1}
            onClick={() => this.handlePage('next')}
          >
            Próximo
          </button>
        </PageActions>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repo: PropTypes.string,
    }),
  }).isRequired,
};
