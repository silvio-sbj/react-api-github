import styled from 'styled-components';

export const Loading = styled.div`
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Owner = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;

  a {
    color: #7159c1;
    font-size: 14px;
    text-decoration: none;
  }

  img {
    width: 120px;
    border-radius: 50%;
    margin-top: 10px;
  }

  h1 {
    font-size: 24px;
    margin-top: 10px;
  }

  p {
    margin-top: 5px;
    font-size: 14px;
    color: #666;
    line-height: 1.4;
    text-align: center;
    max-width: 400px;
  }
`;

export const IssueList = styled.ul`
  padding-top: 10px;
  margin-top: 10px;
  list-style: none;

  li {
    display: flex;
    padding: 10px 10px;
    border: 1px solid #eee;
    border-radius: 4px;
  }

  & + li {
    margin-top: 100px;
  }

  img {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 2px solid #eee;
  }

  div {
    flex: 1;
    margin-left: 15px;

    strong {
      font-size: 14px;

      a {
        text-decoration: none;
        color: #333;

        &:hover {
          color: #7159c1;
        }
      }

      span {
        background: #b1f5b4;
        color: #333;
        border-radius: 2px;
        font-size: 12px;
        font-weight: 600;
        height: 20px;
        padding: 3px 4px;
        margin-left: 10px;
      }
    }

    p {
      margin-top: 5px;
      font-size: 14px;
      color: #999;
    }
  }
`;

export const IssueFilter = styled.div`
  font-size: 12px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 100px;
  margin-top: 20px;

  div {
    display: flex;
    flex-direction: row;

    input {
      margin-right: 5px;
    }
  }
`;

export const PageActions = styled.div`
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;

  button {
    transition: opacity 0.25s ease-out;
    border-radius: 4px;
    outline: 0;
    border: 0;
    padding: 8px;
    font-size: 12px;
    background: #cfc7ea;
    font-weight: bold;
    min-width: 150px;

    &:hover {
      background: #7159c1;
      color: #fff;
    }

    &:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  }

  span {
    font-size: 12px;
    font-weight: bold;
  }
`;
