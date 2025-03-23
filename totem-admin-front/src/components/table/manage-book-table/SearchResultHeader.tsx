import styled from 'styled-components';

const Component = styled.div`
  font-size: 18px;
  padding: 0 16px;
  margin-top: -10px;
  margin-bottom: 10px;
`;

type SearchResultHeaderProps = {
  // keyword: string;
  resultCount: number;
};

const SearchResultHeader = ({
  // keyword = '',
  resultCount = 0,
}: SearchResultHeaderProps) => {
  // return <Component>{`${resultCount} results for '${keyword}'`}</Component>;
  return <Component>{`${resultCount} results`}</Component>;
};
export default SearchResultHeader;
